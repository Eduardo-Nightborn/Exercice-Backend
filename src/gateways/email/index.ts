import * as SibApiV3Sdk from '@getbrevo/brevo';
import { Config } from '../../libs/config';
import { SendEmailInput } from '../../entities/email/send-email-input';
import { toSendSmtpEmail } from './mappers/send-email-input';
import Joi from 'joi';
import { UnknownError } from '../../entities/errors/unknown-error';
import { BadRequestError } from '../../entities/errors/bad-request-error';
import { ForbiddenError } from '../../entities/errors/forbidden-error';
import { UnauthorizedError } from '../../entities/errors/unauthorized-error';

export const initEmailGateway = (config: Config) => {
  const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
  apiInstance.setApiKey(
    SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey,
    config.brevo.apiKey,
  );

  // https://developers.brevo.com/reference/sendtransacemail
  const sendEmail = async (input: SendEmailInput): Promise<void> => {
    validateInput(input);

    const sendEmailInput = toSendSmtpEmail(input);

    if (config.brevo.sandbox) {
      sendEmailInput.headers = {
        'X-Sib-Sandbox': 'drop',
        ...sendEmailInput.headers,
      };
    }

    try {
      await apiInstance.sendTransacEmail(sendEmailInput);
    } catch (err: any) {
      const erroResponse: { message?: string; code?: string } | undefined =
        err.response?.body;
      switch (erroResponse?.code) {
        case 'invalid_parameter':
        case 'missing_parameter':
        case 'bad_request':
        case 'duplicate_parameter':
        case 'duplicate_request':
          throw new BadRequestError(erroResponse.message ?? 'Invalid input');
        case 'reseller_permission_denied':
        case 'permission_denied':
        case 'method_not_allowed':
        case 'account_under_validation':
          throw new ForbiddenError(
            erroResponse.message ?? 'Send email permission denied',
          );
        case 'unauthorized':
          throw new UnauthorizedError(
            erroResponse.message ?? 'Unauthorized to send email',
          );
        case 'out_of_range':
        case 'campaign_processing':
        case 'campaign_sent':
        case 'document_not_found':
        case 'not_enough_credits':
        case 'not_acceptable':
          throw new UnknownError(
            erroResponse?.message ?? 'Unable to send email',
          );
        default:
          throw new UnknownError('Unable to send email');
      }
    }
  };

  return { sendEmail };
};

function validateInput(input: SendEmailInput) {
  const emailRecipientSchema = Joi.object({
    email: Joi.string().email().required(),
    name: Joi.string().optional(),
  });

  const sendEmailBaseInputSchema = Joi.object({
    to: Joi.array().items(emailRecipientSchema).min(1).required(),
    cc: Joi.array().items(emailRecipientSchema).optional(),
    bcc: Joi.array().items(emailRecipientSchema).optional(),
    replyTo: emailRecipientSchema.optional(),
    headers: Joi.object().optional(),
    params: Joi.object().optional(),
  });

  const sendSimpleEmailInputSchema = sendEmailBaseInputSchema.keys({
    hasTemplate: Joi.boolean().valid(false).required(),
    subject: Joi.string().required(),
    content: Joi.string().required(),
    isHTML: Joi.boolean().optional(),
    sender: emailRecipientSchema.required(),
  });

  const sendEmailWithTemplateInputSchema = sendEmailBaseInputSchema.keys({
    hasTemplate: Joi.boolean().valid(true).required(),
    templateId: Joi.string().required(),
    subject: Joi.string().optional(),
    sender: emailRecipientSchema.optional(),
  });

  const schema = Joi.alternatives().try(
    sendSimpleEmailInputSchema,
    sendEmailWithTemplateInputSchema,
  );

  const { error } = schema.validate(input);
  if (error) {
    throw new BadRequestError(error.message);
  }
}

export type EmailGateway = ReturnType<typeof initEmailGateway>;

import { SendSmtpEmail } from '@getbrevo/brevo';
import { SendEmailInput } from '../../../entities/email/send-email-input';
import {
  toSendSmtpEmailBccInner,
  toSendSmtpEmailCcInner,
  toSendSmtpEmailReplyTo,
  toSendSmtpEmailSender,
  toSendSmtpEmailToInner,
} from './email-recipient';

export function toSendSmtpEmail(input: SendEmailInput): SendSmtpEmail {
  const body = new SendSmtpEmail();

  body.subject = input.subject;
  body.to = input.to.map(toSendSmtpEmailToInner);
  body.cc = input.cc?.map(toSendSmtpEmailCcInner);
  body.bcc = input.bcc?.map(toSendSmtpEmailBccInner);
  body.replyTo = input.replyTo
    ? toSendSmtpEmailReplyTo(input.replyTo)
    : undefined;
  body.headers = input.headers;
  body.params = input.params;

  if (input.hasTemplate) {
    body.templateId = Number(input.templateId);
    body.sender = input.sender
      ? toSendSmtpEmailSender(input.sender)
      : undefined;
  } else {
    body.sender = toSendSmtpEmailSender(input.sender);
    if (input.isHTML) {
      body.htmlContent = input.content;
    } else {
      body.textContent = input.content;
    }
  }

  return body;
}

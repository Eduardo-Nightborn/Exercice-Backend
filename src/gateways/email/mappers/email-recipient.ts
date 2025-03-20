import {
  SendSmtpEmailBccInner,
  SendSmtpEmailCcInner,
  SendSmtpEmailReplyTo,
  SendSmtpEmailSender,
  SendSmtpEmailToInner,
} from '@getbrevo/brevo';
import { EmailRecipientEntity } from '../../../entities/email/email-recipient';

export function toSendSmtpEmailSender(
  recipient: EmailRecipientEntity,
): SendSmtpEmailSender {
  return {
    email: recipient.email,
    name: recipient.name,
  };
}

export function toSendSmtpEmailToInner(
  recipient: EmailRecipientEntity,
): SendSmtpEmailToInner {
  return {
    email: recipient.email,
    name: recipient.name,
  };
}

export function toSendSmtpEmailCcInner(
  recipient: EmailRecipientEntity,
): SendSmtpEmailCcInner {
  return {
    email: recipient.email,
    name: recipient.name,
  };
}

export function toSendSmtpEmailBccInner(
  recipient: EmailRecipientEntity,
): SendSmtpEmailBccInner {
  return {
    email: recipient.email,
    name: recipient.name,
  };
}

export function toSendSmtpEmailReplyTo(
  recipient: EmailRecipientEntity,
): SendSmtpEmailReplyTo {
  return {
    email: recipient.email,
    name: recipient.name,
  };
}

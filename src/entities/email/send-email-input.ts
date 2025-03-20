import { EmailRecipientEntity } from './email-recipient';

export type SendEmailInput = SendEmailBaseInput &
  (SendSimpleEmailInput | SendEmailWithTemplateInput);

type SendEmailBaseInput = {
  to: EmailRecipientEntity[];
  cc?: EmailRecipientEntity[];
  bcc?: EmailRecipientEntity[];
  replyTo?: EmailRecipientEntity;
  // Key should have this format: X-This-Case-Only
  headers?: Record<string, string>;
  params?: Record<string, string>;
};

type SendSimpleEmailInput = {
  hasTemplate: false;
  subject: string;
  content: string;
  isHTML?: boolean;
  sender: EmailRecipientEntity;
};

type SendEmailWithTemplateInput = {
  hasTemplate: true;
  templateId: string;
  subject?: string;
  sender?: EmailRecipientEntity;
};

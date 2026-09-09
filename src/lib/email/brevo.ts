/**
 * Brevo (formerly Sendinblue) Transactional Email Client
 *
 * REST API Endpoint: POST https://api.brevo.com/v3/smtp/email
 * Header: api-key: {BREVO_API_KEY}
 */

const BREVO_API_URL = 'https://api.brevo.com/v3/smtp/email';

export interface BrevoAttachment {
  name: string;
  content?: string; // Base64 encoded string
  url?: string;
}

export interface BrevoSendOptions {
  to: string | { email: string; name?: string }[];
  subject: string;
  htmlContent: string;
  textContent?: string;
  senderName?: string;
  senderEmail?: string;
  replyTo?: { email: string; name?: string };
  attachment?: BrevoAttachment[];
}

export interface BrevoSendResult {
  success: boolean;
  messageId?: string;
  mocked?: boolean;
  error?: string;
  status?: number;
}

export function getBrevoConfig() {
  const apiKey = process.env.BREVO_API_KEY?.trim();
  const defaultSenderEmail = process.env.BREVO_SENDER_EMAIL?.trim() || 'noreply@pawvalid.online';
  const defaultSenderName = process.env.BREVO_SENDER_NAME?.trim() || 'PawValid.online';

  return {
    apiKey,
    defaultSenderEmail,
    defaultSenderName,
    isConfigured: Boolean(apiKey && apiKey.startsWith('xkeysib-')),
  };
}

/**
 * Sends a transactional email via Brevo REST API v3
 */
export async function sendTransactionalEmail(options: BrevoSendOptions): Promise<BrevoSendResult> {
  const { apiKey, defaultSenderEmail, defaultSenderName, isConfigured } = getBrevoConfig();

  const toList = Array.isArray(options.to)
    ? options.to.map((item) => (typeof item === 'string' ? { email: item } : item))
    : [{ email: options.to }];

  if (!isConfigured || !apiKey) {
    console.info(`[Brevo Mock] Sent "${options.subject}" to ${toList.map((t) => t.email).join(', ')}`);
    return {
      success: true,
      mocked: true,
      messageId: `mock-brevo-${Date.now()}`,
    };
  }

  const sender = {
    name: options.senderName || defaultSenderName,
    email: options.senderEmail || defaultSenderEmail,
  };

  const payload: Record<string, any> = {
    sender,
    to: toList,
    subject: options.subject,
    htmlContent: options.htmlContent,
  };

  if (options.textContent) {
    payload.textContent = options.textContent;
  }

  if (options.replyTo) {
    payload.replyTo = options.replyTo;
  }

  if (options.attachment && options.attachment.length > 0) {
    payload.attachment = options.attachment;
  }

  try {
    const res = await fetch(BREVO_API_URL, {
      method: 'POST',
      headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      const errorMsg = data?.message || data?.error || `Brevo HTTP error ${res.status}`;
      console.error('[Brevo Error]', errorMsg);
      return {
        success: false,
        status: res.status,
        error: errorMsg,
      };
    }

    return {
      success: true,
      messageId: data?.messageId,
      status: res.status,
    };
  } catch (err: any) {
    console.error('[Brevo Network Error]', err);
    return {
      success: false,
      status: 500,
      error: err.message || 'Network error communicating with Brevo',
    };
  }
}

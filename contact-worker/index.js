/**
 * Contact Form Handler - CF Worker
 * Handles contact form submissions, verifies Turnstile CAPTCHA, sends email via Resend
 */

const RESEND_FROM = 'raraprojects <noreply@raraprojects.com>';
const RESEND_TO = 'rara@raraprojects.com';

export default {
  async fetch(request, env) {
    if (request.method !== 'POST') {
      return json({ error: 'Method not allowed' }, 405);
    }

    try {
      const body = await request.json();
      const { name, phone, business, message, turnstileToken } = body;

      // Validate required fields
      if (!name?.trim() || !message?.trim()) {
        return json({ error: 'Name and message are required' }, 400);
      }

      // Verify Turnstile token
      const turnstileResult = await verifyTurnstile(turnstileToken, env.TURNSTILE_SECRET_KEY);
      if (!turnstileResult.success) {
        return json({ error: 'CAPTCHA verification failed' }, 400);
      }

      // Send email via Resend
      const emailResult = await sendEmail({
        name: name.trim(),
        phone: phone?.trim() || 'Not provided',
        business: business?.trim() || 'Not provided',
        message: message.trim(),
      }, env.RESEND_API_KEY);

      if (!emailResult.success) {
        return json({ error: 'Failed to send message' }, 500);
      }

      return json({ success: true, message: 'Message sent successfully!' });
    } catch (error) {
      console.error('Contact form error:', error);
      return json({ error: 'Internal server error' }, 500);
    }
  }
};

async function verifyTurnstile(token, secret) {
  try {
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        secret,
        response: token,
        remoteip: '127.0.0.1',
      }),
    });
    return await response.json();
  } catch (error) {
    console.error('Turnstile verification error:', error);
    return { success: false };
  }
}

async function sendEmail({ name, phone, business, message }, resendApiKey) {
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: RESEND_FROM,
        to: [RESEND_TO],
        subject: `New Contact: ${name}${business ? ` - ${business}` : ''}`,
        text: `
Name: ${name}
Phone: ${phone}
Business: ${business}
Message: ${message}
        `.trim(),
        html: `
<!DOCTYPE html>
<html>
<head <meta charset="utf-8">
<style>
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0A0A0A; color: #EBEBEB; padding: 40px; }
  .container { max-width: 600px; margin: 0 auto; }
  h2 { color: #F5F0E8; margin-bottom: 24px; }
  .field { margin-bottom: 16px; }
  .label { font-size: 12px; color: #888; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 4px; }
  .value { font-size: 16px; color: #EBEBEB; }
  .message-box { background: #111; border: 1px solid #1C1C1C; border-radius: 12px; padding: 20px; margin-top: 24px; }
  .message-text { white-space: pre-wrap; line-height: 1.6; }
</style>
</head>
<body>
  <div class="container">
    <h2>Yeni İletişim Formu</h2>
    <div class="field">
      <div class="label">İsim</div>
      <div class="value">${escapeHtml(name)}</div>
    </div>
    <div class="field">
      <div class="label">Telefon</div>
      <div class="value">${escapeHtml(phone)}</div>
    </div>
    <div class="field">
      <div class="label">İşletme</div>
      <div class="value">${escapeHtml(business)}</div>
    </div>
    <div class="message-box">
      <div class="label">Mesaj</div>
      <div class="message-text">${escapeHtml(message)}</div>
    </div>
  </div>
</body>
</html>
        `.trim(),
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Resend API error:', error);
      return { success: false };
    }

    return { success: true };
  } catch (error) {
    console.error('Email send error:', error);
    return { success: false };
  }
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

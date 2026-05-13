/**
 * Contact Form — CF Pages Function
 * POST /api/contact → sends email via Resend + Turnstile verification
 */

export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const body = await request.json();
    const { name, phone, business, message, turnstileToken } = body;

    if (!name?.trim() || !message?.trim()) {
      return json({ error: "Name and message are required" }, 400);
    }

    // Verify Turnstile
    const turnstileResult = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          secret: env.TURNSTILE_SECRET_KEY,
          response: turnstileToken || "",
          remoteip: request.headers.get("CF-Connecting-IP") || "127.0.0.1",
        }),
      }
    ).then((r) => r.json());

    if (!turnstileResult.success && turnstileToken) {
      return json({ error: "CAPTCHA verification failed" }, 400);
    }

    // Send via Resend
    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "raraprojects <noreply@raraprojects.com>",
        to: ["rara@raraprojects.com"],
        subject: `New Contact: ${name}${business ? ` — ${business}` : ""}`,
        text: [
          `Name: ${name}`,
          `Phone: ${phone || "Not provided"}`,
          `Business: ${business || "Not provided"}`,
          `Message: ${message}`,
        ].join("\n"),
        html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family:-apple-system,BlinkMacSystemFont,sans-serif;background:#0A0A0A;color:#EBEBEB;padding:40px">
  <div style="max-width:600px;margin:0 auto">
    <h2 style="color:#F5F0E8;margin-bottom:24px">Yeni İletişim Formu</h2>
    <div style="margin-bottom:16px">
      <div style="font-size:12px;color:#888;text-transform:uppercase;letter-spacing:.1em;margin-bottom:4px">İsim</div>
      <div style="font-size:16px;color:#EBEBEB">${escapeHtml(name)}</div>
    </div>
    <div style="margin-bottom:16px">
      <div style="font-size:12px;color:#888;text-transform:uppercase;letter-spacing:.1em;margin-bottom:4px">Telefon</div>
      <div style="font-size:16px;color:#EBEBEB">${escapeHtml(phone || "Belirtilmedi")}</div>
    </div>
    <div style="margin-bottom:16px">
      <div style="font-size:12px;color:#888;text-transform:uppercase;letter-spacing:.1em;margin-bottom:4px">İşletme</div>
      <div style="font-size:16px;color:#EBEBEB">${escapeHtml(business || "Belirtilmedi")}</div>
    </div>
    <div style="background:#111;border:1px solid #1C1C1C;border-radius:12px;padding:20px;margin-top:24px">
      <div style="font-size:12px;color:#888;text-transform:uppercase;letter-spacing:.1em;margin-bottom:8px">Mesaj</div>
      <div style="white-space:pre-wrap;line-height:1.6">${escapeHtml(message)}</div>
    </div>
  </div>
</body>
</html>`,
      }),
    });

    if (!resendRes.ok) {
      const err = await resendRes.text();
      console.error("Resend error:", err);
      return json({ error: "Failed to send message" }, 500);
    }

    return json({ success: true, message: "Message sent!" });
  } catch (error) {
    console.error("Contact error:", error);
    return json({ error: "Internal server error" }, 500);
  }
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function onRequest() {
  return json({ error: "Method not allowed" }, 405);
}

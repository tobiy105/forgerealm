const { sendBrevoEmail } = require("../utils/email");
const { asyncHandler, ApiError } = require("../utils/errors");

/**
 * POST /api/enquiry
 * Body: {
 *   name: string,
 *   email: string,
 *   phone?: string,
 *   description: string,
 *   product?: { slug: string, name: string },
 *   variant?: { colour?: string, size?: string, quantity?: number }
 * }
 *
 * Fires a formatted HTML email to the shop inbox via Brevo. No DB writes —
 * this is a pure notification. Rate limits live in the route file.
 */
const submitEnquiry = asyncHandler(async (req, res) => {
  const { name, email, phone, description, product, variant } = req.body ?? {};

  // Minimal validation. Real trust boundary is the email itself + Brevo.
  const cleanName = String(name ?? "")
    .trim()
    .slice(0, 120);
  const cleanEmail = String(email ?? "")
    .trim()
    .slice(0, 200)
    .toLowerCase();
  const cleanPhone = String(phone ?? "")
    .trim()
    .slice(0, 40);
  const cleanDesc = String(description ?? "")
    .trim()
    .slice(0, 4000);
  if (!cleanName) throw new ApiError(400, "Name is required");
  if (!/^\S+@\S+\.\S+$/.test(cleanEmail))
    throw new ApiError(400, "A valid email is required");
  if (cleanDesc.length < 10)
    throw new ApiError(400, "Please describe your enquiry (min 10 chars)");

  const productBlock = product?.slug
    ? `
      <tr><td colspan="2" style="padding-top:20px;"><strong style="color:#7dd3fc;">Referenced product</strong></td></tr>
      <tr><td style="width:130px;color:#94a3b8;padding:4px 0;">Name</td><td style="color:#e2e8f0;padding:4px 0;">${escapeHtml(product.name || product.slug)}</td></tr>
      <tr><td style="color:#94a3b8;padding:4px 0;">Slug</td><td style="color:#e2e8f0;padding:4px 0;font-family:monospace;">${escapeHtml(product.slug)}</td></tr>
    `
    : "";

  const variantBits = [];
  if (variant?.colour) variantBits.push(["Colour", variant.colour]);
  if (variant?.size) variantBits.push(["Size", variant.size]);
  if (variant?.quantity != null && variant.quantity !== "")
    variantBits.push(["Quantity", String(variant.quantity)]);
  const variantBlock = variantBits.length
    ? `
      <tr><td colspan="2" style="padding-top:20px;"><strong style="color:#7dd3fc;">Variant preferences</strong></td></tr>
      ${variantBits
        .map(
          ([k, v]) => `
        <tr><td style="width:130px;color:#94a3b8;padding:4px 0;">${escapeHtml(k)}</td><td style="color:#e2e8f0;padding:4px 0;">${escapeHtml(String(v))}</td></tr>`,
        )
        .join("")}
    `
    : "";

  const htmlContent = `
    <div style="margin:0;padding:0;background:#0b1220;font-family:'Trebuchet MS',Arial,sans-serif;color:#e2e8f0;">
      <div style="max-width:640px;margin:0 auto;padding:32px 24px;">
        <h1 style="font-size:20px;color:#f8fafc;margin:0 0 4px;">New custom-order enquiry</h1>
        <p style="color:#94a3b8;margin:0 0 24px;font-size:13px;">Submitted via forgerealm.co.uk/custom-order</p>

        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-size:14px;">
          <tr><td colspan="2"><strong style="color:#7dd3fc;">Customer</strong></td></tr>
          <tr><td style="width:130px;color:#94a3b8;padding:4px 0;">Name</td><td style="color:#e2e8f0;padding:4px 0;">${escapeHtml(cleanName)}</td></tr>
          <tr><td style="color:#94a3b8;padding:4px 0;">Email</td><td style="color:#e2e8f0;padding:4px 0;"><a href="mailto:${cleanEmail}" style="color:#93c5fd;">${escapeHtml(cleanEmail)}</a></td></tr>
          ${cleanPhone ? `<tr><td style="color:#94a3b8;padding:4px 0;">Phone</td><td style="color:#e2e8f0;padding:4px 0;">${escapeHtml(cleanPhone)}</td></tr>` : ""}
          ${productBlock}
          ${variantBlock}
          <tr><td colspan="2" style="padding-top:20px;"><strong style="color:#7dd3fc;">Description</strong></td></tr>
          <tr><td colspan="2" style="color:#e2e8f0;padding:8px 0 0;white-space:pre-wrap;line-height:1.6;">${escapeHtml(cleanDesc)}</td></tr>
        </table>

        <p style="color:#64748b;margin:32px 0 0;font-size:12px;border-top:1px solid rgba(148,163,184,0.15);padding-top:16px;">
          Reply directly to this email to reach the customer.
        </p>
      </div>
    </div>
  `;

  await sendBrevoEmail({
    to: process.env.BREVO_SENDER_EMAIL || "info@forgerealm.co.uk",
    toName: "ForgeRealm",
    subject: `Custom order enquiry — ${cleanName}`,
    htmlContent,
    // Set Reply-To to the customer via Brevo's `params` isn't supported by
    // our tiny wrapper; the email link above lets the shop hit them back
    // in one click.
  });

  res.json({ ok: true });
});

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

module.exports = { submitEnquiry };

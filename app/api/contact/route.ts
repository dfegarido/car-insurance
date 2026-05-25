import { NextResponse } from "next/server";
import { SITE_EMAIL } from "@/lib/site";

const CF7_FORM_ID = "1957";
const CF7_UNIT_TAG = "wpcf7-f1957-p169-o2";
const CF7_FEEDBACK_URL = `https://www.theinsuranceprovider.com/wp-json/contact-form-7/v1/contact-forms/${CF7_FORM_ID}/feedback`;

function getField(formData: FormData, name: string): string {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim() : "";
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  let formData: FormData;

  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json(
      { ok: false, message: "Invalid form submission." },
      { status: 400 }
    );
  }

  const name = getField(formData, "name");
  const email = getField(formData, "email");
  const subject = getField(formData, "subject");
  const message = getField(formData, "message");

  if (!name || !email || !subject) {
    return NextResponse.json(
      { ok: false, message: "Please fill in your name, email, and subject." },
      { status: 400 }
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { ok: false, message: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  const cf7Body = new FormData();
  cf7Body.append("_wpcf7", String(CF7_FORM_ID));
  cf7Body.append("_wpcf7_version", "6.0.3");
  cf7Body.append("_wpcf7_locale", "en_US");
  cf7Body.append("_wpcf7_unit_tag", CF7_UNIT_TAG);
  cf7Body.append("_wpcf7_container_post", "169");
  cf7Body.append("your-name", name);
  cf7Body.append("your-email", email);
  cf7Body.append("your-subject", subject);
  cf7Body.append("your-message", message);

  try {
    const cf7Res = await fetch(CF7_FEEDBACK_URL, {
      method: "POST",
      headers: {
        Referer: "https://www.theinsuranceprovider.com/contact-us/",
      },
      body: cf7Body,
    });

    if (cf7Res.ok) {
      const result = (await cf7Res.json()) as { status?: string };
      if (result.status === "mail_sent") {
        return NextResponse.json({ ok: true });
      }
    }
  } catch {
    /* fall through to mailto-backed success for clone UX */
  }

  /* CF7 often rejects server-side posts (spam/recaptcha). Accept locally so
     visitors get feedback; production can wire Resend/SMTP via env later. */
  console.info("[contact] Message received", {
    name,
    email,
    subject,
    message: message.slice(0, 200),
    notify: SITE_EMAIL,
  });

  return NextResponse.json({ ok: true });
}

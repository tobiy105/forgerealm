import { NextResponse } from "next/server";

function isValidEmail(email: string) {
  return /.+@.+\..+/.test(email);
}

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ message: "Invalid email" }, { status: 400 });
    }

    const apiKey = process.env.MAILCHIMP_API_KEY;
    const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;
    const dc = process.env.MAILCHIMP_SERVER_PREFIX; // e.g., us21

    if (!apiKey || !audienceId || !dc) {
      return NextResponse.json(
        { message: "Mailchimp env vars are not configured" },
        { status: 500 }
      );
    }

    const url = `https://${dc}.api.mailchimp.com/3.0/lists/${audienceId}/members`;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from(`anystring:${apiKey}`).toString("base64")}`,
      },
      body: JSON.stringify({
        email_address: email,
        status: "pending", // double opt-in; use "subscribed" for single opt-in
      }),
      // Opt out of Next.js fetch caching
      cache: "no-store",
    });

    const data = await res.json();

    if (res.status === 200 || res.status === 204) {
      return NextResponse.json({ ok: true });
    }

    // Already subscribed error from Mailchimp
    if (res.status === 400 && data?.title === "Member Exists") {
      return NextResponse.json({ ok: true, message: "Already subscribed" });
    }

    // Forward message if available
    return NextResponse.json(
      { message: data?.detail || data?.title || "Mailchimp error" },
      { status: 400 }
    );
  } catch (err) {
    return NextResponse.json({ message: "Unexpected error" }, { status: 500 });
  }
}


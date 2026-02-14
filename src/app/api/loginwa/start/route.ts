import { NextResponse } from "next/server";

const LOGINWA_BASE_URL = "https://api.loginwa.com/api/v1/auth";

function normalizePakPhone(phone: string) {
  const digits = phone.replace(/[^\d]/g, "");

  if (!digits) return "";
  if (digits.startsWith("0092") && digits.length === 14) return digits.slice(2);
  if (digits.startsWith("92") && digits.length === 12) return digits;
  if (digits.startsWith("0") && digits.length === 11) return `92${digits.slice(1)}`;

  return digits;
}

function isValidPakPhone(phone: string) {
  return /^923\d{9}$/.test(phone);
}

async function parseUpstreamBody(response: Response) {
  const raw = await response.text();
  let json: any = null;

  try {
    json = raw ? JSON.parse(raw) : null;
  } catch {
    json = null;
  }

  return { raw, json };
}

export async function POST(request: Request) {
  try {
    const { phone } = (await request.json()) as { phone?: string };
    const parsedPhone = normalizePakPhone(phone ?? "");
    const secretKey = process.env.LOGINWA_SECRET_API_KEY;

    if (!secretKey) {
      return NextResponse.json(
        { success: false, message: "Missing LOGINWA_SECRET_API_KEY" },
        { status: 500 }
      );
    }

    if (!parsedPhone) {
      return NextResponse.json(
        { success: false, message: "Phone number is required" },
        { status: 400 }
      );
    }

    if (!isValidPakPhone(parsedPhone)) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid phone format. Use Pakistani mobile format like 923001234567 or 03001234567",
        },
        { status: 400 }
      );
    }

    const response = await fetch(`${LOGINWA_BASE_URL}/start`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${secretKey}`,
        "X-Api-Key": secretKey,
      },
      body: JSON.stringify({ phone: parsedPhone }),
      cache: "no-store",
    });

    const { raw, json } = await parseUpstreamBody(response);

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          message:
            json?.message ||
            `LoginWA start failed with status ${response.status}`,
          details: json || raw?.slice(0, 300) || null,
          upstreamStatus: response.status,
        },
        { status: response.status }
      );
    }

    if (!json) {
      return NextResponse.json(
        {
          success: false,
          message: "LoginWA returned non-JSON response for start",
          details: raw?.slice(0, 300) || null,
          upstreamStatus: response.status,
        },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true, ...json });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Unexpected error while sending code",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

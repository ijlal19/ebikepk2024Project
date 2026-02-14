import { NextResponse } from "next/server";

const LOGINWA_BASE_URL = "https://api.loginwa.com/api/v1/auth";

function isValidOtpCode(code: string) {
  return /^\d{4,8}$/.test(code);
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
    const { session_id, otp_code } = (await request.json()) as {
      session_id?: string;
      otp_code?: string;
    };
    const secretKey = process.env.LOGINWA_SECRET_API_KEY;

    if (!secretKey) {
      return NextResponse.json(
        { success: false, message: "Missing LOGINWA_SECRET_API_KEY" },
        { status: 500 }
      );
    }

    if (!session_id || !otp_code) {
      return NextResponse.json(
        { success: false, message: "session_id and otp_code are required" },
        { status: 400 }
      );
    }

    if (!isValidOtpCode(otp_code.trim())) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid otp_code format. OTP must be 4 to 8 digits",
        },
        { status: 400 }
      );
    }

    const response = await fetch(`${LOGINWA_BASE_URL}/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${secretKey}`,
        "X-Api-Key": secretKey,
      },
      body: JSON.stringify({ session_id, otp_code: otp_code.trim() }),
      cache: "no-store",
    });

    const { raw, json } = await parseUpstreamBody(response);

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          message:
            json?.message ||
            `LoginWA verify failed with status ${response.status}`,
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
          message: "LoginWA returned non-JSON response for verify",
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
        message: "Unexpected error while verifying code",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

"use client";

import { useState } from "react";
import Link from "next/link";

type StartResponse = {
  success: boolean;
  message?: string;
  session_id?: string;
  expires_at?: string;
};

type VerifyResponse = {
  success: boolean;
  message?: string;
  status?: string;
  session_id?: string;
  phone?: string;
};

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

function isValidOtpCode(code: string) {
  return /^\d{4,8}$/.test(code);
}

export default function PhoneLoginPage() {
  const [phone, setPhone] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [step, setStep] = useState<"phone" | "otp" | "done">("phone");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [verifiedData, setVerifiedData] = useState<VerifyResponse | null>(null);

  const sendCode = async () => {
    const parsedPhone = normalizePakPhone(phone);

    if (!parsedPhone || !isValidPakPhone(parsedPhone)) {
      setError(
        "Please enter valid Pakistani number: 923001234567 or 03001234567."
      );
      return;
    }

    setLoading(true);
    setError("");
    setInfo("");

    try {
      const response = await fetch("/api/loginwa/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: parsedPhone }),
      });

      const data = (await response.json()) as StartResponse;

      if (!response.ok || !data?.session_id) {
        setError(data?.message || "Code send failed.");
        return;
      }

      setSessionId(data.session_id);
      setStep("otp");
      setInfo("Verification code sent. Please enter OTP.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Request failed.");
    } finally {
      setLoading(false);
    }
  };

  const verifyCode = async () => {
    if (!sessionId || !otpCode.trim()) {
      setError("Please enter OTP code.");
      return;
    }

    if (!isValidOtpCode(otpCode.trim())) {
      setError("OTP must be 4 to 8 digits.");
      return;
    }

    setLoading(true);
    setError("");
    setInfo("");

    try {
      const response = await fetch("/api/loginwa/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          session_id: sessionId,
          otp_code: otpCode.trim(),
        }),
      });

      const data = (await response.json()) as VerifyResponse;

      if (!response.ok) {
        setError(data?.message || "OTP verification failed.");
        return;
      }

      setVerifiedData(data);
      setStep("done");
      setInfo("Phone number verified successfully.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Request failed.");
    } finally {
      setLoading(false);
    }
  };

  const resetFlow = () => {
    setStep("phone");
    setPhone("");
    setOtpCode("");
    setSessionId("");
    setVerifiedData(null);
    setError("");
    setInfo("");
  };

  return (
    <div style={{ maxWidth: 420, margin: "40px auto", padding: "0 16px" }}>
      <h1 style={{ marginBottom: 8 }}>Phone Login</h1>
      <p style={{ marginTop: 0, color: "#555" }}>
        Enter your number, receive OTP on WhatsApp, then verify.
      </p>

      {step === "phone" && (
        <>
          <label htmlFor="phone" style={{ display: "block", marginBottom: 6 }}>
            Phone number
          </label>
          <input
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="923001234567 or 03001234567"
            style={{
              width: "100%",
              height: 40,
              padding: "0 12px",
              border: "1px solid #ccc",
              borderRadius: 6,
              marginBottom: 12,
            }}
          />
          <button
            onClick={sendCode}
            disabled={loading}
            style={{
              width: "100%",
              height: 40,
              border: 0,
              borderRadius: 6,
              background: "#0066cc",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            {loading ? "Sending..." : "Send Code"}
          </button>
        </>
      )}

      {step === "otp" && (
        <>
          <label htmlFor="otp" style={{ display: "block", marginBottom: 6 }}>
            Enter OTP
          </label>
          <input
            id="otp"
            value={otpCode}
            onChange={(e) => setOtpCode(e.target.value)}
            placeholder="123456"
            style={{
              width: "100%",
              height: 40,
              padding: "0 12px",
              border: "1px solid #ccc",
              borderRadius: 6,
              marginBottom: 12,
            }}
          />
          <button
            onClick={verifyCode}
            disabled={loading}
            style={{
              width: "100%",
              height: 40,
              border: 0,
              borderRadius: 6,
              background: "#198754",
              color: "#fff",
              cursor: "pointer",
              marginBottom: 10,
            }}
          >
            {loading ? "Verifying..." : "Verify Code"}
          </button>
          <button
            onClick={resetFlow}
            disabled={loading}
            style={{
              width: "100%",
              height: 40,
              border: "1px solid #aaa",
              borderRadius: 6,
              background: "#fff",
              cursor: "pointer",
            }}
          >
            Change Number
          </button>
        </>
      )}

      {step === "done" && (
        <div
          style={{
            border: "1px solid #d8e7d9",
            borderRadius: 8,
            padding: 12,
            background: "#f6fff7",
          }}
        >
          <strong>Verification successful</strong>
          <p style={{ marginBottom: 6 }}>
            Status: {verifiedData?.status || "verified"}
          </p>
          <p style={{ marginTop: 0, marginBottom: 12 }}>
            Phone: {verifiedData?.phone || normalizePakPhone(phone)}
          </p>
          <button
            onClick={resetFlow}
            style={{
              width: "100%",
              height: 40,
              border: "1px solid #aaa",
              borderRadius: 6,
              background: "#fff",
              cursor: "pointer",
            }}
          >
            Verify Another Number
          </button>
        </div>
      )}

      {error ? <p style={{ color: "#c0392b", marginTop: 12 }}>{error}</p> : null}
      {info ? <p style={{ color: "#2c3e50", marginTop: 12 }}>{info}</p> : null}

      <div style={{ marginTop: 16 }}>
        <Link href="/">Back to home</Link>
      </div>
    </div>
  );
}

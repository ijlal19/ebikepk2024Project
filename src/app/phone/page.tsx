"use client";

import { useEffect, useRef, useState } from "react";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
} from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function PhoneAuthPage() {
  const [phone, setPhone] = useState(""); // must be E.164, e.g. +923001234567
  const [code, setCode] = useState("");
  const [confirmation, setConfirmation] = useState<ConfirmationResult | null>(
    null
  );
  const [status, setStatus] = useState<string>("");
  const recaptchaRef = useRef<RecaptchaVerifier | null>(null);

  useEffect(() => {
    // Initialize reCAPTCHA verifier once on mount
    if (!recaptchaRef.current) {
      recaptchaRef.current = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible", // or "normal"
          callback: () => {
            // reCAPTCHA solved
          },
        }
      );
    }
    return () => {
      // cleanup (optional)
      recaptchaRef.current?.clear();
      recaptchaRef.current = null;
    };
  }, []);

  const sendOtp = async () => {
    try {
      setStatus("Sending OTP...");
      if (!recaptchaRef.current) throw new Error("reCAPTCHA not ready");

      const result = await signInWithPhoneNumber(
        auth,
        phone,
        recaptchaRef.current
      );
      setConfirmation(result);
      setStatus("OTP sent. Check your SMS.");
    } catch (err: any) {
      setStatus(err?.message || "Failed to send OTP");
      console.error(err);
    }
  };

  const verifyOtp = async () => {
    try {
      if (!confirmation) throw new Error("Please request OTP first");
      setStatus("Verifying...");
      const cred = await confirmation.confirm(code);

      const user = cred.user;
      const idToken = await user.getIdToken(); // useful for server verification
      setStatus(`✅ Verified. UID: ${user.uid}`);

      console.log("Firebase ID Token:", idToken);
    } catch (err: any) {
      setStatus(err?.message || "Failed to verify OTP");
      console.error(err);
    }
  };

  return (
    <div style={{ maxWidth: 420, margin: "40px auto", padding: 16 }}>
      <h1>Firebase SMS Verification</h1>

      <label>Phone (E.164 format)</label>
      <input
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="+923001234567"
        style={{ width: "100%", padding: 10, marginTop: 6 }}
      />

      <button
        onClick={sendOtp}
        style={{ width: "100%", padding: 12, marginTop: 12 }}
      >
        Send OTP
      </button>

      <label style={{ display: "block", marginTop: 18 }}>OTP Code</label>
      <input
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="123456"
        style={{ width: "100%", padding: 10, marginTop: 6 }}
      />

      <button
        onClick={verifyOtp}
        style={{ width: "100%", padding: 12, marginTop: 12 }}
      >
        Verify OTP
      </button>

      <p style={{ marginTop: 16 }}>{status}</p>

      {/* reCAPTCHA container MUST exist */}
      <div id="recaptcha-container" />
    </div>
  );
}

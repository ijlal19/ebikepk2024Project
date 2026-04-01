"use client";

import { useEffect, useRef } from "react";

const ADSENSE_SCRIPT_ID = "google-adsense-script";
const ADSENSE_SCRIPT_SRC = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5167970563180610";

const AdSense = ({ client, slot, style, adStyle, format = "auto", responsive = true }) => {
  const adRef = useRef(null);

  useEffect(() => {
    let retryTimeoutId = null;
    let scriptLoadHandler = null;

    const initializeAd = () => {
      try {
        if (!adRef.current) return;
        if (adRef.current.getAttribute("data-adsbygoogle-status")) return;
        if (!window.adsbygoogle || typeof window.adsbygoogle.push !== "function") {
          retryTimeoutId = window.setTimeout(initializeAd, 300);
          return;
        }

        window.adsbygoogle.push({});
      } catch (e) {
        console.error("Adsense error: ", e);
      }
    };

    const existingScript =
      document.getElementById(ADSENSE_SCRIPT_ID) ||
      document.getElementById("google-adsense");

    if (!existingScript) {
      const script = document.createElement("script");
      script.id = ADSENSE_SCRIPT_ID;
      script.async = true;
      script.src = ADSENSE_SCRIPT_SRC;
      script.crossOrigin = "anonymous";
      scriptLoadHandler = () => initializeAd();
      script.addEventListener("load", scriptLoadHandler);
      document.head.appendChild(script);
    } else {
      scriptLoadHandler = () => initializeAd();
      existingScript.addEventListener("load", scriptLoadHandler);
    }

    initializeAd();

    return () => {
      if (retryTimeoutId) {
        window.clearTimeout(retryTimeoutId);
      }

      const scriptEl = document.getElementById(ADSENSE_SCRIPT_ID);
      if (scriptEl && scriptLoadHandler) {
        scriptEl.removeEventListener("load", scriptLoadHandler);
      }
    };
  }, []);

  return (
    <div>
        <div style={{ textAlign: "center", margin: "20px 0", ...style }}>
          <ins
            ref={adRef}
            className="adsbygoogle"
            style={{ display: 'block', ...adStyle }}
            data-ad-client={client}
            data-ad-slot={slot}
            {...(format ? { "data-ad-format": format } : {})}
            data-full-width-responsive={responsive ? "true" : "false"}
          ></ins>
        </div>
    </div>
  );
};

export default AdSense;

"use client";

import { useEffect, useRef } from "react";

const AdSense = ({ client, slot, style, format = "auto" }) => {
  const adRef = useRef(null);

  useEffect(() => {
    const initializeAd = () => {
      try {
        if (!adRef.current) return;
        if (adRef.current.getAttribute("data-adsbygoogle-status")) return;
        if (!window.adsbygoogle || !Array.isArray(window.adsbygoogle)) return;

        window.adsbygoogle.push({});
      } catch (e) {
        console.error("Adsense error: ", e);
      }
    };

    const timeoutId = window.setTimeout(initializeAd, 150);

    return () => window.clearTimeout(timeoutId);
  }, []);

  return (
    <div>
        <div style={{ textAlign: "center", margin: "20px 0", ...style }}>
          <ins
            ref={adRef}
            className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client={client}
            data-ad-slot={slot}
            data-ad-format={format}
            data-full-width-responsive="true"
          ></ins>
        </div>
    </div>
  );
};

export default AdSense;

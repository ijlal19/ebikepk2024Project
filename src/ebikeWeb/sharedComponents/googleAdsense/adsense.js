"use client";

import { useEffect } from "react";

const AdSense = ({ client, slot, style, format = "auto" }) => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("Adsense error: ", e);
    }
  }, []);

  return (
    <div>
        <div style={{ textAlign: "center", margin: "20px 0", ...style }}>
          <ins
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

import { useEffect } from "react";

const AdSense = ({ client, slot, style, format = "auto" }) => {
  useEffect(() => {
    const initAd = () => {
      if (window.adsbygoogle && typeof window.adsbygoogle.push === "function") {
        try {
          delete window.adsbygoogle;
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {
          console.error("Adsense error: ", e);
        }
      }
    };
  
    initAd();
  
  }, []);

  return (
    <div style={{ textAlign: "center", margin: "20px 0" }}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={client} // Replace with your AdSense publisher ID
        data-ad-slot={slot} // Replace with your AdSense ad slot ID
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};

export default AdSense;

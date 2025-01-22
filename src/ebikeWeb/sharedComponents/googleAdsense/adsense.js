import { useEffect } from "react";

const AdSense = ({ client, slot, style, format = "auto" }) => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("AdSense error:", e);
    }
  }, []);

  return (
    <div style={{ textAlign: "center", margin: "20px 0" }}>
      <ins
        className="adsbygoogle"
        style={style || { display: "block" }}
        data-ad-client={client} // Replace with your AdSense publisher ID
        data-ad-slot={slot} // Replace with your AdSense ad slot ID
        data-ad-format={format}
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};

export default AdSense;

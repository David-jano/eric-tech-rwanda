"use client";

import { useEffect } from "react";

// Extend Window interface to include Tawk_API
declare global {
  interface Window {
    Tawk_API: any;
  }
}

export default function Chatbot() {
  useEffect(() => {
    // Define custom positioning BEFORE Tawk script loads
    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_API.customStyle = {
      visibility: {
        desktop: {
          position: "br", // bottom-right
          xOffset: 20, // pixels from right
          yOffset: 100, // pixels from bottom (increase to move UP)
        },
        mobile: {
          position: "br",
          xOffset: 10,
          yOffset: 100, // Higher value = more above the button
        },
      },
    };

    // Prevent duplicate script
    if (document.getElementById("tawk-script")) return;

    const script = document.createElement("script");
    script.id = "tawk-script";
    script.src = "https://embed.tawk.to/69fa78b0eb897e1c397a7f2c/1jnt6etbu";
    script.async = true;
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");

    document.body.appendChild(script);
  }, []);

  return null;
}

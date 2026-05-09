// app/layout.tsx
import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import BackToTopButton from "./components/BackToTopButton";

export const metadata: Metadata = {
  title: "ERIC TECH Rwanda",
  description: "Buying and selling new and used electronic devices",
  icons: {
    icon: "/images/Logo1.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,100;14..32,200;14..32,300;14..32,400;14..32,500;14..32,600;14..32,700;14..32,800;14..32,900&display=swap"
          rel="stylesheet"
        />
        <style>
          {`
            body {
              font-family: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif;
            }
          `}
        </style>
      </head>
      <body>
        <Header />
        {children}
        <BackToTopButton />
        <Footer />
        <Script id="favicon-generator" strategy="afterInteractive">
          {`
    function generateFavicon() {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        // Draw white rounded square background
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.roundRect(0, 0, 64, 64, 12);
        ctx.fill();
        
        // Draw border (optional)
        ctx.strokeStyle = '#E5E7EB';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.roundRect(0, 0, 64, 64, 12);
        ctx.stroke();
        
        // Load and draw your actual logo
        const img = new Image();
        img.crossOrigin = 'Anonymous';
        img.onload = function() {
          // Calculate dimensions to preserve aspect ratio
          const maxSize = 44; // Maximum size for the logo (reduced from 48)
          let logoWidth = img.width;
          let logoHeight = img.height;
          
          // Calculate scaling factor to fit within maxSize while preserving aspect ratio
          if (logoWidth > logoHeight) {
            // Wide logo
            const ratio = maxSize / logoWidth;
            logoWidth = maxSize;
            logoHeight = logoHeight * ratio;
          } else {
            // Tall logo (or square)
            const ratio = maxSize / logoHeight;
            logoHeight = maxSize;
            logoWidth = logoWidth * ratio;
          }
          
          // Calculate position to center the logo
          const x = (64 - logoWidth) / 2;
          const y = (64 - logoHeight) / 2;
          
          // Draw the logo with proper aspect ratio
          ctx.drawImage(img, x, y, logoWidth, logoHeight);
          
          // Replace favicon
          const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
          link.rel = 'icon';
          link.href = canvas.toDataURL('image/png');
          document.head.appendChild(link);
        };
        
        img.onerror = function() {
          console.error('Could not load logo, showing fallback');
          // Draw fallback text
          ctx.fillStyle = '#4B73FF';
          ctx.font = 'bold 32px Arial';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('E', 32, 32);
          
          const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
          link.rel = 'icon';
          link.href = canvas.toDataURL('image/png');
          document.head.appendChild(link);
        };
        
        img.src = '/images/Logo1.png?' + Date.now(); // Add timestamp to prevent cache
      }
    }
    
    // Helper function for rounded rectangles
    if (!CanvasRenderingContext2D.prototype.roundRect) {
      CanvasRenderingContext2D.prototype.roundRect = function(x, y, w, h, r) {
        if (w < 2 * r) r = w / 2;
        if (h < 2 * r) r = h / 2;
        this.moveTo(x+r, y);
        this.lineTo(x+w-r, y);
        this.quadraticCurveTo(x+w, y, x+w, y+r);
        this.lineTo(x+w, y+h-r);
        this.quadraticCurveTo(x+w, y+h, x+w-r, y+h);
        this.lineTo(x+r, y+h);
        this.quadraticCurveTo(x, y+h, x, y+h-r);
        this.lineTo(x, y+r);
        this.quadraticCurveTo(x, y, x+r, y);
        return this;
      };
    }
    
    // Run when page loads
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', generateFavicon);
    } else {
      generateFavicon();
    }
  `}
        </Script>
      </body>
    </html>
  );
}

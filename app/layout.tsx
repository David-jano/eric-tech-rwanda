import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import BackToTopButton from "./components/BackToTopButton";

export const metadata: Metadata = {
  title: "ERIC TECH Rwanda",
  description: "Buying and selling electronic devices",
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
        {/* Tailwind CSS CDN - Temporary fix */}
        <script src="https://cdn.tailwindcss.com"></script>
        {/* Inter Font */}
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
      </body>
    </html>
  );
}

import React from "react";
import { ArrowRight, Sparkles, Truck, Shield, ShoppingBag } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative h-170 w-full overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white">
      {/* Subtle background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl" />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative container mx-auto px-6 md:px-8 lg:px-12 py-20 md:py-28 lg:py-36">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left side: Text Content */}
          <div className="flex-1 text-center lg:text-left z-10">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm px-4 py-1.5 mb-6 border border-white/20">
              <span className="text-sm font-medium text-indigo-200">
                Trusted Electronics Marketplace
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-6xl font-bold leading-tight tracking-tight mb-6">
              Buy & Sell{" "}
              <span className="bg-gradient-to-r from-indigo-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent">
                New & Used
              </span>
              <br />
              Electronic Devices
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-lg text-slate-300 max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
              Discover premium smartphones, laptops, tablets, and accessories.
              Top-quality products at competitive prices with exceptional
              service.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="http://localhost:3000/ServicesSection"
                className="group relative inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-bg-green-700 backdrop-blur-sm border border-white/20 text-white font-semibold hover:bg-white/20 transition-all duration-300 hover:scale-[1.02]"
              >
                <span>Our services</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </a>

              <a
                href="https://wa.me/250788833355"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-green-500 backdrop-blur-sm border border-white/20 text-white font-semibold hover:bg-white/20 transition-all duration-300 hover:scale-[1.02]"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12.032 2.002c-5.514 0-9.99 4.476-9.99 9.99 0 1.752.453 3.466 1.318 4.981L2 21.999l5.137-1.337c1.467.813 3.118 1.24 4.818 1.24 5.514 0 9.99-4.476 9.99-9.99 0-5.514-4.476-9.99-9.99-9.99zm0 18.33c-1.496 0-2.96-.402-4.23-1.16l-.303-.18-3.032.79.808-2.944-.197-.31c-.849-1.324-1.297-2.839-1.297-4.394 0-4.623 3.762-8.385 8.386-8.385 2.238 0 4.342.872 5.924 2.454 1.582 1.582 2.454 3.686 2.454 5.924 0 4.623-3.762 8.385-8.385 8.385zm4.589-6.276c-.252-.126-1.49-.735-1.72-.819-.23-.084-.398-.126-.565.126-.167.252-.647.819-.793.987-.146.168-.292.189-.544.063-.252-.126-1.064-.392-2.027-1.25-.75-.668-1.256-1.493-1.403-1.746-.147-.252-.016-.388.11-.513.113-.113.252-.292.378-.438.126-.146.168-.252.252-.42.084-.168.042-.315-.021-.441-.063-.126-.565-1.36-.774-1.862-.204-.488-.412-.422-.565-.43-.146-.008-.314-.008-.482-.008-.168 0-.44.063-.67.315-.23.252-.88.86-.88 2.098 0 1.238.902 2.435 1.028 2.603.126.168 1.776 2.712 4.302 3.803.6.26 1.07.415 1.436.532.603.19 1.152.163 1.586.099.484-.073 1.49-.61 1.7-1.198.21-.588.21-1.092.147-1.198-.063-.105-.23-.168-.482-.294z" />
                </svg>
                <span>WhatsApp Us</span>
              </a>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center gap-6 justify-center lg:justify-start mt-10 pt-4 border-t border-white/10">
              <div className="flex items-center gap-2 text-slate-300 text-sm">
                <Truck className="w-4 h-4 text-indigo-400" />
                <span>Free Shipping</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300 text-sm">
                <Shield className="w-4 h-4 text-indigo-400" />
                <span>30-Day Warranty</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300 text-sm">
                <ShoppingBag className="w-4 h-4 text-indigo-400" />
                <span>Secure Checkout</span>
              </div>
            </div>
          </div>

          {/* Right side: Standalone Device Image - No Container */}
          <div className="flex-1 relative flex justify-center lg:justify-end z-10">
            <div className="relative w-full max-w-sm lg:max-w-md">
              {/* Device Image - Pure PNG, No Container, No Background */}
              <img
                src="/images/watch.png"
                alt="Electronic Device"
                className="w-full h-auto object-contain transform transition-all duration-500 hover:scale-105 drop-shadow-2xl"
                style={{
                  filter: "drop-shadow(0 30px 40px rgba(0,0,0,0.4))",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

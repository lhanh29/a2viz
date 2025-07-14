// src/components/HeroLayout.js
import '../index.css'; // ✅ Fixed path
import React from "react";
import logo from "../assets/a2logo.png";

const HeroLayout = ({ children }) => {
  return (
    <div className="bg-black min-h-screen text-white">
      {/* Header */}
      <header className="fixed top-0 z-50 w-full bg-black bg-opacity-80 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6">
          <img src={logo} alt="Logo" className="h-8" />
          <nav className="space-x-6">
            <a href="/" className="hover:text-gray-400 font-semibold">HOME</a>
            <a href="#airendering" className="hover:text-gray-400 font-semibold">A.I RENDERING</a>
            <a href="#aianimation" className="hover:text-gray-400 font-semibold">A.I ANIMATION</a>
            <a href="#pricing" className="hover:text-gray-400 font-semibold">PRICING</a>
            <a href="#aboutus" className="hover:text-gray-400 font-semibold">ABOUT US</a>
            <a href="#contact" className="hover:text-gray-400 font-semibold">CONTACT</a>
          </nav>
        </div>
      </header>

      {/* Hero Video */}
      <section className="relative h-screen text-center">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          src="https://a2viz-assets.s3.amazonaws.com/background-video.mp4"
          autoPlay
          loop
          muted
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-30"></div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="max-w-3xl px-6">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-5 leading-snug">
              Let A.I <span className="block">transform Your ideas into reality!</span>
            </h1>
            <p className="text-lg mb-6">
              A powerful assistant for architects and interior designers to streamline creativity and productivity.
            </p>
            <button
              className="bg-white text-black px-6 py-3 rounded-full font-semibold shadow-md hover:bg-gray-100"
              onClick={() => (window.location.href = "/login")}
            >
              Get Started
            </button>
          </div>
        </div>
      </section>

      {/* Dynamic Content */}
      <main className="bg-black text-white py-12 px-6 max-w-5xl mx-auto">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-black py-6 text-center text-gray-400 text-sm">
        <p>
          &copy; 2024 A2 Visualization | {" "}
          <a href="/terms-of-use" className="hover:text-white">TERMS OF USE</a> |
          <a href="/privacy-policy" className=" hover:text-white"> PRIVACY POLICY</a> | 
        </p>
      </footer>
    </div>
  );
};

export default HeroLayout;

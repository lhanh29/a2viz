import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";
import logo from "./assets/a2logo.png";
import Image1 from "./assets/1.jpg";
import Image2 from "./assets/2.jpg";
import Image3 from "./assets/3.jpg";

import LoginPage from "./components/LoginPage";
import Dashboard from "./components/Dashboard";

// Simulated Auth Check
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("user"));

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(!!localStorage.getItem("user"));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? <Dashboard /> : <Navigate to="/login" />
          }
        />
      </Routes>
    </Router>
  );
}

// FrontPage Component
function FrontPage() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-black min-h-screen text-white">
      {/* Navigation */}
      <header
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${
          isScrolled ? "bg-black bg-opacity-80 shadow-md" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6">
          <img src={logo} alt="Logo" className="h-8" />
          <nav className="space-x-6">
            <a href="#airendering" className="hover:text-gray-400 font-semibold">
              A.I RENDERING
            </a>
            <a href="#aianimation" className="hover:text-gray-400 font-semibold">
              A.I ANIMATION
            </a>
            <a href="#pricing" className="hover:text-gray-400 font-semibold">
              PRICING
            </a>
            <a href="#aboutus" className="hover:text-gray-400 font-semibold">
              ABOUT US
            </a>
            <a href="#contact" className="hover:text-gray-400 font-semibold">
              CONTACT
            </a>
          </nav>
        </div>
      </header>
      {/* Hero Section */}
      <section className="relative h-screen text-center">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          src="https://a2viz-assets.s3.amazonaws.com/background-video.mp4"
          autoPlay
          loop
          muted
        ></video>
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="max-w-3xl px-6">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-5 leading-snug">
              Let A.I{" "}
              <span className="block">transform Your ideas into reality!</span>
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
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-30"></div>
      </section>
      {/* Customer Stories Section */}
      <section className="py-16 bg-black text-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl font-bold text-center mb-12">
            How the world's top creatives <br /> are using A2 AI creativity.
          </h2>
          <button className="bg-transparent border border-white text-white px-6 py-3 rounded-full font-medium hover:bg-white hover:text-black transition-all mb-8 mx-auto block">
            More Customer Stories
          </button>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <a href="#" target="_blank" rel="noopener noreferrer">
                <img src={Image1} alt="Customer Story 1" className="rounded-lg mb-4 w-full h-[300px] object-cover" />
              </a>
              <h4 className="text-lg font-semibold mb-2">Architecture Firms</h4>
              <p>Generating new worlds for Madonna's Celebration Tour.</p>
            </div>
            <div className="text-center">
              <a href="#" target="_blank" rel="noopener noreferrer">
                <img src={Image2} alt="Customer Story 2" className="rounded-lg mb-4 w-full h-[300px] object-cover" />
              </a>
              <h4 className="text-lg font-semibold mb-2">Design and Build</h4>
              <p>Distorting reality with Dan Streit and his unique integration.</p>
            </div>
            <div className="text-center">
              <a href="#" target="_blank" rel="noopener noreferrer">
                <img src={Image3} alt="Customer Story 3" className="rounded-lg mb-4 w-full h-[300px] object-cover" />
              </a>
              <h4 className="text-lg font-semibold mb-2">Investors</h4>
              <p>How A2 Visualization is reimagining the commercial production process.</p>
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-black py-6 text-center text-gray-400">
        <p>&copy; 2024 A2 Visualization. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

// App Component with Routing
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? <Dashboard /> : <Navigate to="/login" />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

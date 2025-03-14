import React, { useState } from "react";
import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ArrowUpCircle,
  Copy,
} from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const [statusMessage, setStatusMessage] = useState("");

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setStatusMessage(`Copied: ${text}`);
    setTimeout(() => setStatusMessage(""), 3000); // Clear message after 3 seconds
  };

  return (
    <footer className="bg-gray-900 text-gray-300 relative">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white mb-6">
              KhalidEstates Co.
            </h3>
            <p className="text-sm">
              Your trusted partner in finding the perfect property. We make your
              dream home a reality.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://www.facebook.com/profile.php?id=61569514566170" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-white transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="https://www.instagram.com/kqmrealestate" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-white transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://x.com/khalidqmy" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-white transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="https://www.linkedin.com/in/khalid-yosouf-8a69a1209" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-white transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#home"
                  className="hover:text-white transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="#properties"
                  className="hover:text-white transition-colors"
                >
                  Properties
                </Link>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="hover:text-white transition-colors"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="hover:text-white transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div id="footer">
            <h4 className="text-lg font-semibold text-white mb-6">
              Contact Us
            </h4>
            <div className="space-y-4">
              <div
                className="flex items-center space-x-3 cursor-pointer"
                onClick={() => copyToClipboard("Sobha Saphire, Business Bay")}
              >
                <MapPin className="w-5 h-5 text-amber-400" />
                <span>Sobha Saphire, Business Bay</span>
                <Copy className="w-4 h-4 text-gray-500" />
              </div>
              <div
                className="flex items-center space-x-3 cursor-pointer"
                onClick={() => copyToClipboard("+971525906261")}
              >
                <Phone className="w-5 h-5 text-amber-400" />
                <span>+971525906261</span>
                <Copy className="w-4 h-4 text-gray-500" />
              </div>
              <div
                className="flex items-center space-x-3 cursor-pointer"
                onClick={() => copyToClipboard("khalidqari1230@gmail.com")}
              >
                <Mail className="w-5 h-5 text-amber-400" />
                <span>khalidqari1230@gmail.com</span>
                <Copy className="w-4 h-4 text-gray-500" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm">
              © {new Date().getFullYear()} KhalidEstates Co. All rights
              reserved.
            </div>
            {/* <div className="flex space-x-6 text-sm">
              <a href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Cookies Policy
              </a>
            </div> */}
          </div>
        </div>

        {/* Scroll to Top Button */}
        <button
          onClick={scrollToTop}
          className="absolute right-8 -top-6 bg-amber-600 p-2 rounded-full hover:bg-amber-700 transition-colors"
        >
          <ArrowUpCircle className="w-6 h-6" />
        </button>
      </div>

      {/* Status Message */}
      {statusMessage && (
        <div className="absolute bottom-8 right-8 bg-amber-600 text-white px-4 py-2 rounded shadow-lg">
          {statusMessage}
        </div>
      )}
    </footer>
  );
}
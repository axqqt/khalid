/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Hero() {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoElement, setVideoElement] = useState(null);

  useEffect(() => {
    // Reset video loaded state when component mounts
    setVideoLoaded(false);
  }, []);

  const handleVideoLoad = () => {
    if (videoElement && videoElement.readyState >= 3) {
      setVideoLoaded(true);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center" id="home">
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {/* Loading Image */}
        <div 
          className={`absolute inset-0 transition-opacity duration-700 ${
            videoLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          <Image
            src="/hero.jpg"
            alt="Dubai Real Estate"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-amber-600/40"></div>
        </div>

        {/* Video Background */}
        <div 
          className={`absolute inset-0 transition-opacity duration-700 ${
            videoLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <video
            ref={el => setVideoElement(el)}
            onCanPlay={handleVideoLoad}
            onLoadedData={handleVideoLoad}
            style={{
              width: "100%",
              height: "105%",
              position: "relative",
            }}
            className="absolute inset-0 object-cover w-full h-full"
            autoPlay
            loop
            muted
            playsInline
            poster="/hero.jpg"
          >
            <source
              src="khalidmain.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-amber-600/40"></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Your Trusted Dubai Real Estate Expert
          </h1>
          <p className="text-xl text-white mb-8 max-w-3xl mx-auto">
            I specialize in helping you buy, sell, or invest in Dubai's vibrant
            property market—residential, commercial, secondary, or off-plan.
            With personalized service, expert guidance, and a passion for
            delivering results, I'll make your real estate journey seamless and
            successful. Let's find your perfect property or the right buyer
            today!
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link
              href="#contact"
              className="bg-white text-amber-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all shadow-lg"
            >
              Sell Your Property
            </Link>
            <Link
              href="#about"
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-amber-600 transition-all"
            >
              Learn More About KhalidEstates
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
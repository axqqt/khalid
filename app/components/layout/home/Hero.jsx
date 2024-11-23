/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center" id="home">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video
          style={{
            objectFit: "none",
            width: "100%",
            height: "105%",
            position: "relative",
          }}
          className="absolute inset-0 object-cover w-full h-full"
          autoPlay
          loop
          muted
          playsInline
          poster="/video-poster.jpg" // Add a poster image for better loading experience
        >
          <source
            src="khalidmain.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        {/* Overlay to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-amber-600/40 z-10"></div>
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

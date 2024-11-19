import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative min-h-screen pt-16 pb-16 flex items-center bg-gradient-to-r from-blue-600 to-blue-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Welcome to Veloxify – Your Trusted Partner in Dubai Real Estate
          </h1>
          <p className="text-xl text-white mb-8 max-w-3xl mx-auto">
            At Veloxify, we specialize in working with property owners who are looking to sell their real estate. 
            Our current focus is on curating a premium portfolio of properties, ensuring seamless transactions 
            for sellers and offering unmatched opportunities for future buyers and investors. 
            As we grow, we aim to expand into projects where you can purchase properties directly from us.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link 
              href="#contact"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all shadow-lg"
            >
              Sell Your Property
            </Link>
            <Link
              href="#about"
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all"
            >
              Learn More About Veloxify
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

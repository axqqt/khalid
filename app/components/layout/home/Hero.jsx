import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative min-h-screen pt-16 pb-16 flex items-center bg-gradient-to-r from-blue-600 to-blue-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Welcome to Veloxify – Your Trusted Dubai Real Estate Expert
          </h1>
          <p className="text-xl text-white mb-8 max-w-3xl mx-auto">
            At Veloxify, we are currently focused on partnering with property owners who are interested in selling. 
            Our mission is to build an exclusive inventory of quality properties for future buyers and investors. 
            If you’re considering selling, we would be honored to assist you every step of the way.
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

/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";
import Image from "next/image";

export default function About() {
    return (
      <section className="py-20 bg-gray-100" id="about">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-amber-800 mb-4">
              About KhalidEstates
            </h2>
            <div className="flex flex-col items-center mb-8">
              <div className="relative w-32 h-32 mb-4">
                <Image
                  src="/khalid.png"
                  alt="Khalid Yousoof"
                  fill
                  className="rounded-full object-cover border-4 border-amber-800"
                  priority
                />
              </div>
              <h3 className="text-2xl font-semibold text-amber-800">Khalid Yousoof</h3>
              <b className="text-gray-1000 italic">Real Estate Professional</b>
            </div>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              At KhalidEstates, we're more than just a real estate agency. Led by Khalid Yousoof, we're a dedicated team of experts focused on helping property owners and investors navigate the dynamic Dubai real estate market. Our commitment to excellence and a personalized approach sets us apart in a highly competitive industry.
            </p>
          </div>
  
          <div className="grid md:grid-cols-3 gap-10">
            <div className="bg-white shadow-lg rounded-lg p-8">
              <h3 className="text-2xl font-semibold text-amber-800 mb-4">
                Expert Guidance
              </h3>
              <p className="text-gray-600">
                With years of experience in Dubai's real estate market, our team provides reliable insights and tailored strategies to maximize your property's potential. We work closely with sellers to ensure a smooth, stress-free process.
              </p>
            </div>
  
            <div className="bg-white shadow-lg rounded-lg p-8">
              <h3 className="text-2xl font-semibold text-amber-800 mb-4">
                Strategic Market Reach
              </h3>
              <p className="text-gray-600">
                We leverage our extensive network and modern marketing techniques to give your property the visibility it deserves. Our strategies connect sellers with serious, qualified buyers locally and internationally.
              </p>
            </div>
  
            <div className="bg-white shadow-lg rounded-lg p-8">
              <h3 className="text-2xl font-semibold text-amber-800 mb-4">
                Client-Centered Approach
              </h3>
              <p className="text-gray-600">
                At KhalidEstates, our clients always come first. We tailor our services to meet your unique needs, ensuring transparency, integrity, and outstanding customer service at every step of your journey with us.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-4">
              Whether you're selling a residential property, commercial space, or luxury villa, KhalidEstates is here to help you achieve your goals. Our team of dedicated professionals is ready to provide unparalleled support and expertise.
            </p>
            <Link
              href="#contact"
              className="inline-block bg-amber-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-amber-700 transition-all"
            >
              Contact Us Today
            </Link>
          </div>
        </div>
      </section>
    )
}
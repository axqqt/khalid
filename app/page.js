"use client"

import FeaturedProperties from "./components/home/FeaturedProperties";
import Footer from "./components/home/Footer";
import Services from "./components/home/Services";
import Contact from "./components/layout/home/Contact";
import Hero from "./components/layout/home/Hero";


export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedProperties/>
      <Services />
      <Contact/>
      <Footer/>
    </>
  );
}
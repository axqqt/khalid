"use client";

import { useState } from "react";
import FeaturedProperties from "./components/home/FeaturedProperties";
import Footer from "./components/home/Footer";
import Services from "./components/home/Services";
import About from "./components/layout/home/About";
import Contact from "./components/layout/home/Contact";
import Hero from "./components/layout/home/Hero";
import Navbar from "./components/layout/Navbar";

export default function Home() {

  const [propertiesArray,setPropertiesArray] = useState([])

  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <FeaturedProperties properties={propertiesArray} />
      <Contact />
      <About />
      <Footer />
    </>
  );
}

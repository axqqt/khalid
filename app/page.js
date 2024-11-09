"use client"

import Services from "./components/home/Services";
import Contact from "./components/layout/home/Contact";
import Hero from "./components/layout/home/Hero";


export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Contact/>
    </>
  );
}
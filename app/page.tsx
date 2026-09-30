import Loader from "@/components/layout/Loader";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/hero/Hero";
import About from "@/components/sections/About";
import Releases from "@/components/sections/Releases";
import Deployments from "@/components/sections/Deployments";
import Systems from "@/components/sections/Systems";
import Changelog from "@/components/sections/Changelog";
import Manifest from "@/components/sections/Manifest";
import Contact from "@/components/sections/Contact";
import Marquee from "@/components/ui/Marquee";
import CustomCursor from "@/components/ui/CustomCursor";

export default function Home() {
  return (
    <>
      <a href="#about" className="skip-link t-micro">
        Skip to content
      </a>
      <SmoothScroll />
      <Loader />
      <Navbar />

      <main>
        <Hero />
        <About />
        <Releases />
        <Deployments />
        <Systems />
        <Changelog />
        <Manifest />
        <Marquee />
        <Contact />
      </main>

      <Footer />
      <CustomCursor />
    </>
  );
}

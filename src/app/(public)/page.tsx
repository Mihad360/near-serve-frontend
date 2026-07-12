import { Footer } from "@/components/footer";
import FinalCTA from "@/components/home/FinalCTA";
import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/home/HowItWorks";
import LiveActivity from "@/components/home/LiveActivity";
import Testimonials from "@/components/home/Testimonials";
import TrustFeatures from "@/components/home/TrustFeatures";
import Navbar from "@/components/navbar";

export default function PublicHomePage() {
  return (
    <div>
      <Navbar />
      <Hero />
      <HowItWorks />
      <LiveActivity />
      <TrustFeatures />
      <Testimonials />
      <FinalCTA />
      <Footer/>
    </div>
  );
}

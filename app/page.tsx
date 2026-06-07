import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { HeroSection } from "@/components/sections/HeroSection";

// Lazy load all below-the-fold sections to reduce initial JS bundle
const WhyChooseUs = dynamic(() => import("@/components/sections/WhyChooseUs").then(m => ({ default: m.WhyChooseUs })));
const StatsSection = dynamic(() => import("@/components/sections/StatsSection").then(m => ({ default: m.StatsSection })));
const CoursesSection = dynamic(() => import("@/components/sections/CoursesSection").then(m => ({ default: m.CoursesSection })));
const TopRankers = dynamic(() => import("@/components/sections/TopRankers").then(m => ({ default: m.TopRankers })));
const FacultySection = dynamic(() => import("@/components/sections/FacultySection").then(m => ({ default: m.FacultySection })));
const Testimonials = dynamic(() => import("@/components/sections/Testimonials").then(m => ({ default: m.Testimonials })));
const UpcomingBatches = dynamic(() => import("@/components/sections/UpcomingBatches").then(m => ({ default: m.UpcomingBatches })));
const FAQSection = dynamic(() => import("@/components/sections/FAQSection").then(m => ({ default: m.FAQSection })));
const ContactCTA = dynamic(() => import("@/components/sections/ContactCTA").then(m => ({ default: m.ContactCTA })));
const BackToTop = dynamic(() => import("@/components/ui/BackToTop").then(m => ({ default: m.BackToTop })));

export const metadata: Metadata = {
  title: "Study With Sutirtha - Shape Your Future With Excellence",
  description:
    "Join Study With Sutirtha — West Bengal's premier coaching institute for JEE, NEET, WBJEE, and Board Exams. Expert IIT & AIIMS faculty, proven results, personalized mentorship.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <WhyChooseUs />
      <StatsSection />
      <CoursesSection />
      <TopRankers />
      <FacultySection />
      <Testimonials />
      <UpcomingBatches />
      <FAQSection />
      <ContactCTA />
      <BackToTop />
    </>
  );
}

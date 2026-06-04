import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/HeroSection";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { StatsSection } from "@/components/sections/StatsSection";
import { CoursesSection } from "@/components/sections/CoursesSection";
import { TopRankers } from "@/components/sections/TopRankers";
import { FacultySection } from "@/components/sections/FacultySection";
import { Testimonials } from "@/components/sections/Testimonials";
import { UpcomingBatches } from "@/components/sections/UpcomingBatches";
import { FAQSection } from "@/components/sections/FAQSection";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { BackToTop } from "@/components/ui/BackToTop";

export const metadata: Metadata = {
  title: "Xaurum Academy - Shape Your Future With Excellence",
  description:
    "Join Xaurum Academy — West Bengal's premier coaching institute for JEE, NEET, WBJEE, and Board Exams. Expert IIT & AIIMS faculty, proven results, personalized mentorship.",
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

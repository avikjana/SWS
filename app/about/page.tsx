import type { Metadata } from "next";
import { ScrollReveal, StaggerContainer, staggerItem } from "@/components/animations/ScrollReveal";
import { Target, Eye, Award, GraduationCap, MapPin, Phone, Users } from "lucide-react";
import { BackToTop } from "@/components/ui/BackToTop";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Study With Sutirtha's 15-year journey of educational excellence. Discover our mission, vision, infrastructure, and dedicated faculty team.",
};

const milestones = [
  { year: "2009", title: "Founded", desc: "Study With Sutirtha started under mentor Sutirtha Basumallick to focus on deep conceptual education." },
  { year: "2015", title: "Personal Tuition Expansion", desc: "Introduced offline Home Personal Tuition option for customized student progress." },
  { year: "2021", title: "Online Programs", desc: "Launched online classrooms and exams to reach students digitally." },
];

const infrastructure = [
  { icon: "🏛️", title: "Interactive Coaching Space", desc: "Spacious and focused classroom environment designed for active learning." },
  { icon: "🖥️", title: "Google Classroom Notes", desc: "All advanced notes accessible digitally via Google Classroom groups." },
  { icon: "📚", title: "Mathematics & Science Resources", desc: "Curated books, sample papers, and customized practice worksheets." },
  { icon: "🎯", title: "Regular Testing Facilities", desc: "Chapter-wise and full syllabus tests conducted regularly in online/offline modes." },
];

export default function AboutPage() {
  return (
    <>
      <main className="pt-20 bg-[var(--bg-primary)]">
        {/* Hero */}
        <section className="section-padding relative overflow-hidden border-b-2 border-black">
          <div className="absolute inset-0 bg-grid opacity-30" />

          <div className="container-xl relative text-center">
            <ScrollReveal>
              <div className="section-tag mx-auto mb-4">
                <GraduationCap className="w-3.5 h-3.5" />
                Our Story
              </div>
              <h1 className="text-5xl md:text-6xl font-extrabold font-display text-black mb-6">
                About{" "}
                <span className="bg-[#00F0FF] px-3 py-1 border-2 border-black inline-block transform -rotate-1 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                  Study With Sutirtha
                </span>
              </h1>
              <p className="text-lg md:text-xl text-[var(--text-secondary)] font-medium max-w-3xl mx-auto leading-relaxed mt-4">
                For over 15 years, Study With Sutirtha has been the cornerstone of academic excellence.
                Founded in 2009 with a simple mission — <strong className="text-black font-extrabold">make high-quality Mathematics &amp; Science coaching accessible to every child</strong> —
                we specialize in teaching Class 5 to Class 10 WBBSE sections with dedicated online and offline services.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="section-padding bg-[#E6F5EC] border-b-2 border-black relative overflow-hidden">
          <div className="absolute inset-0 bg-dots opacity-20" />
          <div className="container-xl relative grid md:grid-cols-2 gap-8">
            <ScrollReveal direction="left" className="card-premium p-8 border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <div className="w-14 h-14 rounded-2xl bg-[#00F0FF] border-2 border-black flex items-center justify-center mb-6 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <Target className="w-7 h-7 text-black" />
              </div>
              <h2 className="text-2xl font-extrabold font-display text-black mb-4">Our Mission</h2>
              <p className="text-[var(--text-secondary)] font-medium leading-relaxed">
                To provide exceptional coaching that empowers every student to achieve their academic dreams through innovative teaching methods, personalized mentoring, and a supportive learning environment.
                We believe every student has the potential to excel — our job is to unlock it.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="right" className="card-premium p-8 border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <div className="w-14 h-14 rounded-2xl bg-[#D2FF00] border-2 border-black flex items-center justify-center mb-6 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <Eye className="w-7 h-7 text-black" />
              </div>
              <h2 className="text-2xl font-extrabold font-display text-black mb-4">Our Vision</h2>
              <p className="text-[var(--text-secondary)] font-medium leading-relaxed">
                To become India&apos;s most trusted coaching institution by creating the next generation of doctors, engineers, scientists, and leaders.
                We envision a future where every Study With Sutirtha student not only achieves excellent results but also develops as a well-rounded individual.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Timeline */}
        <section className="section-padding bg-[var(--bg-primary)] border-b-2 border-black relative">
          <div className="container-xl">
            <ScrollReveal className="text-center mb-12">
              <div className="section-tag mx-auto">
                <Award className="w-3.5 h-3.5" />
                Our Journey
              </div>
              <h2 className="text-4xl font-extrabold font-display text-black mt-4">
                15 Years of <span className="bg-[#D2FF00] px-2 py-0.5 border-2 border-black inline-block transform rotate-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">Excellence</span>
              </h2>
            </ScrollReveal>

            <div className="relative max-w-3xl mx-auto mt-16">
              {/* Center line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-black -translate-x-1/2" />

              <div className="space-y-12">
                {milestones.map((m, i) => (
                  <ScrollReveal key={m.year} delay={i * 0.1} direction={i % 2 === 0 ? "left" : "right"}>
                    <div className={`flex items-center gap-8 ${i % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}>
                      <div className={`flex-1 ${i % 2 === 0 ? "text-right" : "text-left"}`}>
                        <div className="card-premium p-5 border-2 border-black bg-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] inline-block w-full">
                          <div className="text-xl font-black font-display text-blue-600">{m.year}</div>
                          <h3 className="font-extrabold text-black mt-1">{m.title}</h3>
                          <p className="text-sm text-[var(--text-secondary)] font-medium mt-1">{m.desc}</p>
                        </div>
                      </div>
                      <div className="w-6 h-6 rounded-full bg-[#00F0FF] border-2 border-black flex-shrink-0 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] relative z-10" />
                      <div className="flex-1" />
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Infrastructure */}
        <section className="section-padding bg-[var(--bg-secondary)] border-b-2 border-black">
          <div className="container-xl">
            <ScrollReveal className="text-center mb-12">
              <div className="section-tag mx-auto">🏛️ Infrastructure</div>
              <h2 className="text-4xl font-extrabold font-display text-black mt-4">
                State-of-the-Art <span className="bg-[#FF007A] text-white px-2 py-0.5 border-2 border-black inline-block transform -rotate-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">Facilities</span>
              </h2>
            </ScrollReveal>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.08}>
              {infrastructure.map((item) => (
                <div key={item.title} className="card-premium p-6 border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300 inline-block">{item.icon}</div>
                  <h3 className="font-extrabold font-display text-black mb-2">{item.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)] font-medium">{item.desc}</p>
                </div>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Location */}
        <section className="section-padding bg-[var(--bg-primary)]">
          <div className="container-xl">
            <ScrollReveal className="text-center mb-12">
              <div className="section-tag mx-auto">
                <MapPin className="w-3.5 h-3.5" />
                Find Us
              </div>
              <h2 className="text-4xl font-extrabold font-display text-black mt-4">
                Visit Our <span className="bg-[#00F0FF] px-2 py-0.5 border-2 border-black inline-block transform rotate-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">Campus</span>
              </h2>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <ScrollReveal direction="left">
                <div className="card-premium p-8 border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-4">
                  <h3 className="text-xl font-extrabold font-display text-black">Study With Sutirtha</h3>
                  <div className="flex items-start gap-3 text-[var(--text-secondary)]">
                    <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <p className="font-semibold text-black">Choutaramore, Gopinagar,<br />Hooghly, West Bengal - 712402</p>
                  </div>
                  <div className="flex items-center gap-3 text-[var(--text-secondary)]">
                    <Phone className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <a href="tel:+919064077914" className="hover:text-blue-600 font-bold transition-colors">+91 90640 77914</a>
                  </div>
                  <div className="flex items-center gap-3 text-[var(--text-secondary)]">
                    <Users className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <span className="font-semibold text-black">Mentor: SUTIRTHA BASUMALLICK</span>
                  </div>
                  <a href="/contact" className="btn-primary w-full justify-center mt-4" id="about-contact-cta">
                    Contact Us Now
                  </a>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="right">
                <div className="rounded-2xl overflow-hidden border-2 border-black h-80 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center">
                  <div className="text-center text-[var(--text-muted)] p-6">
                    <MapPin className="w-16 h-16 mx-auto mb-4 text-blue-600" />
                    <p className="font-extrabold text-black">Choutaramore, Gopinagar, Hooghly</p>
                    <p className="text-sm mt-1">Visit us for offline classes or call to arrange home tuition</p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>
      </main>

      <BackToTop />
    </>
  );
}

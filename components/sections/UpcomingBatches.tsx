"use client";
import { motion } from "framer-motion";
import { Calendar, Clock, Users, MapPin, Zap } from "lucide-react";
import { ScrollReveal, StaggerContainer, staggerItem } from "@/components/animations/ScrollReveal";

const batches = [
  {
    id: "b1",
    course: "JEE Main + Advanced",
    startDate: "July 1, 2025",
    time: "7:00 AM – 9:30 AM",
    seats: 30,
    availableSeats: 8,
    mode: "Offline",
    instructor: "Dr. Rajesh Kumar",
    fee: "₹75,000/yr",
    urgency: "high",
  },
  {
    id: "b2",
    course: "NEET Preparation",
    startDate: "July 5, 2025",
    time: "2:00 PM – 4:30 PM",
    seats: 25,
    availableSeats: 12,
    mode: "Offline",
    instructor: "Dr. Priya Das",
    fee: "₹70,000/yr",
    urgency: "medium",
  },
  {
    id: "b3",
    course: "WBJEE Preparation",
    startDate: "July 10, 2025",
    time: "5:00 PM – 7:30 PM",
    seats: 30,
    availableSeats: 15,
    mode: "Offline",
    instructor: "Prof. Sunita Sharma",
    fee: "₹45,000/yr",
    urgency: "low",
  },
  {
    id: "b4",
    course: "Class 11-12 Science",
    startDate: "June 25, 2025",
    time: "9:00 AM – 11:30 AM",
    seats: 35,
    availableSeats: 5,
    mode: "Offline",
    instructor: "Dr. Amit Ghosh",
    fee: "₹55,000/yr",
    urgency: "high",
  },
];

const urgencyConfig = {
  high: { text: "Almost Full!", bg: "bg-rose-50", border: "border-rose-200", color: "text-rose-600", barColor: "bg-rose-500" },
  medium: { text: "Filling Up", bg: "bg-amber-50", border: "border-amber-200", color: "text-amber-600", barColor: "bg-amber-500" },
  low: { text: "Seats Available", bg: "bg-emerald-50", border: "border-emerald-200", color: "text-emerald-600", barColor: "bg-emerald-500" },
};

export function UpcomingBatches() {
  return (
    <section id="upcoming-batches" className="section-padding bg-[var(--bg-secondary)] relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-20" />

      <div className="container-xl relative">
        <ScrollReveal className="text-center mb-12">
          <div className="section-tag mx-auto">
            <Calendar className="w-3.5 h-3.5" />
            Upcoming Batches
          </div>
          <h2 className="text-4xl md:text-5xl font-bold font-display text-[var(--text-primary)] mt-4">
            Join the Next{" "}
            <span className="text-gradient-blue">Batch</span>
          </h2>
          <p className="mt-4 text-lg text-[var(--text-secondary)] max-w-xl mx-auto">
            Seats fill up fast. Secure your spot now before the next batch starts.
          </p>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-5" staggerDelay={0.1}>
          {batches.map((batch) => {
            const fillPercent = Math.round(((batch.seats - batch.availableSeats) / batch.seats) * 100);
            const urgency = urgencyConfig[batch.urgency as keyof typeof urgencyConfig];

            return (
              <motion.div
                key={batch.id}
                variants={staggerItem}
                className="card-premium p-6 border border-[var(--border-card)] hover:border-blue-500/30 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold font-display text-[var(--text-primary)] text-lg">{batch.course}</h3>
                    <p className="text-sm text-[var(--text-muted)] mt-0.5">by {batch.instructor}</p>
                  </div>
                  <span className={`badge ${urgency.bg} ${urgency.border} ${urgency.color} text-xs font-semibold`}>
                    <Zap className="w-3 h-3" />
                    {urgency.text}
                  </span>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    <span>{batch.startDate}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                    <Clock className="w-4 h-4 text-purple-600" />
                    <span>{batch.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                    <MapPin className="w-4 h-4 text-emerald-600" />
                    <span>{batch.mode}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                    <Users className="w-4 h-4 text-amber-600" />
                    <span>{batch.availableSeats} seats left</span>
                  </div>
                </div>

                {/* Seat Fill Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-[var(--text-muted)] mb-1.5 font-medium">
                    <span>Batch Fill</span>
                    <span>{fillPercent}% filled</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${urgency.barColor} rounded-full transition-all duration-1000`}
                      style={{ width: `${fillPercent}%` }}
                    />
                  </div>
                </div>

                {/* Fees & CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-[var(--border)]">
                  <div>
                    <p className="text-xs text-[var(--text-muted)]">Fee</p>
                    <p className="font-bold font-display text-gradient-blue">{batch.fee}</p>
                  </div>
                  <a
                    href="/contact"
                    className="btn-primary text-sm py-2.5 px-5"
                    id={`batch-enroll-${batch.id}`}
                  >
                    Reserve Seat
                  </a>
                </div>
              </motion.div>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}

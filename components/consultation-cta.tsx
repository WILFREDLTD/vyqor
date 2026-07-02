import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CalendarDays } from "lucide-react";

/**
 * Simple button component for scheduling consultation
 */
export function ScheduleConsultationButton() {
  return (
    <Link href="/schedule-consultation">
      <Button className="bg-gradient-to-r from-[#34156e] to-[#340cac] hover:from-[#2a1158] hover:to-[#2a0a8a] gap-2">
        <CalendarDays className="h-4 w-4" />
        Schedule a Consultation
      </Button>
    </Link>
  );
}

/**
 * Full-width CTA section component
 */
export function ScheduleConsultationCTA() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#34156e] to-[#340cac] rounded-lg">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Ready to Get Started?
        </h2>
        <p className="text-white/80 text-lg mb-8">
          Book a free consultation with our expert team to discuss your project needs and goals.
        </p>
        <Link href="/schedule-consultation">
          <Button className="bg-white text-[#34156e] hover:bg-gray-100">
            <CalendarDays className="h-4 w-4 mr-2" />
            Schedule Your Consultation Now
          </Button>
        </Link>
      </div>
    </section>
  );
}

import { ScheduleConsultationForm } from "@/components/ScheduleConsultation";

export const metadata = {
  title: "Schedule a Consultation | vico softwares",
  description: "Book a consultation with our expert team.",
};

export default function ScheduleConsultationPage() {
  return (
    <main className="">
      <ScheduleConsultationForm />
    </main>
  );
}

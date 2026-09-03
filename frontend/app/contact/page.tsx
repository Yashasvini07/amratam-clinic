import PageHero from "@/components/ui/PageHero";
import { pageMetadata } from "@/lib/site";
import ClinicDetails from "@/components/contact/ClinicDetails";
import AppointmentForm from "@/components/contact/AppointmentForm";

export default function ContactPage() {
  return (
    <>
      <main className="bg-[#FDFBF8]">
        <PageHero {...pageMetadata.contact} />

        <section className="mx-auto max-w-7xl px-6 py-24">
            <div className="grid gap-20 lg:grid-cols-[0.9fr_1.1fr]">
            <ClinicDetails />
            <AppointmentForm />
            </div>
        </section>
      </main>
    </>
  );
}
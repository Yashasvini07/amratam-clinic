import Button from "@/components/ui/Button";
import Section from "@/components/ui/Section";

export default function NewsletterCTA() {
  return (
    <Section background="dark">

      <div className="mx-auto max-w-3xl text-center">

        <p className="mt-8 text-lg leading-9 text-gray-300">Newsletter Coming Soon..</p>

        <p className="uppercase tracking-[0.3em] text-sm text-[#D08F59]">
          Stay Connected
        </p>

        <h2 className="mt-6 font-serif text-5xl text-white">
          Continue your wellness journey
        </h2>

        <p className="mt-8 text-lg leading-9 text-gray-300">
          Follow our latest articles, educational videos and holistic health
          insights as we continue sharing evidence-informed natural healthcare.
        </p>

        <div className="mt-10">
          <Button
            text="Explore More Resources"
            showArrow
          />
        </div>

      </div>

    </Section>
  );
}
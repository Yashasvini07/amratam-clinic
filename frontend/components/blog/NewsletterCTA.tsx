import Button from "@/components/ui/Button";
import Section from "@/components/ui/Section";

export default function NewsletterCTA() {
  return (
    <Section background="dark">

      <div className="mx-auto max-w-3xl text-center">

        <p className="mt-6 text-base leading-7 text-gray-300 sm:mt-8 sm:text-lg sm:leading-9">Newsletter Coming Soon..</p>

        <p className="uppercase tracking-[0.25em] text-xs text-[#D08F59] sm:tracking-[0.3em] sm:text-sm">
          Stay Connected
        </p>

        <h2 className="mt-6 font-serif text-3xl text-white sm:text-4xl md:text-5xl">
          Continue your wellness journey
        </h2>

        <p className="mt-6 text-base leading-7 text-gray-300 sm:mt-8 sm:text-lg sm:leading-9">
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
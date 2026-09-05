import Container from "@/components/ui/Container";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  align?: "left" | "center";
};

export default function PageHero({
  eyebrow,
  title,
  align = "center",
}: PageHeroProps) {
  return (
    <section className="bg-[#264B43] py-10 sm:py-14 md:py-16 lg:py-20">
      <Container>
        <div
          className={`max-w-4xl ${
            align === "center"
              ? "mx-auto text-center"
              : "text-left"
          }`}
        >
          <p className="mb-4 uppercase tracking-[0.3em] text-xs text-[#D08F59] sm:mb-6 sm:tracking-[0.35em] sm:text-sm">
            {eyebrow}
          </p>

          <h1 className="font-serif text-3xl leading-tight text-white sm:text-5xl md:text-6xl">
            {title}
          </h1>
        </div>
      </Container>
    </section>
  );
}
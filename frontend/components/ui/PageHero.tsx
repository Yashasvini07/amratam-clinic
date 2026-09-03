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
    <section className="bg-[#264B43] py-24">
      <Container>
        <div
          className={`max-w-4xl ${
            align === "center"
              ? "mx-auto text-center"
              : "text-left"
          }`}
        >
          <p className="mb-6 uppercase tracking-[0.35em] text-sm text-[#D08F59]">
            {eyebrow}
          </p>

          <h1 className="font-serif text-5xl leading-tight text-white md:text-6xl">
            {title}
          </h1>
        </div>
      </Container>
    </section>
  );
}
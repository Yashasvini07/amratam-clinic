import Button from "@/components/ui/Button";
import Container from "../ui/Container";
import Link from "next/link";

export default function Hero () {
    return (
        <section className="relative h-[560px] bg-cover bg-center sm:h-[620px] md:h-[700px]" style={{ backgroundImage: "url('/images/hero.avif')" }}>
            <div className="absolute inset-0 bg-black/60" />
            <Container className="relative z-10 h-full flex items-start pt-20 text-white sm:pt-28 md:pt-32">
                <div className="max-w-lg flex flex-col gap-5 sm:gap-8">
                <p className="text-xs uppercase tracking-[0.25em] text-[#D08F59] sm:text-sm sm:tracking-[0.35em]">
                    HOLISTIC • NATURAL • EVIDENCE-BASED
                </p>

                <h1 className="max-w-3xl text-3xl leading-tight text-white font-serif sm:text-5xl md:text-6xl md:leading-[1.15]">
                    Healing rooted in
                    <br />
                    <span className="text-[#D8A06B]">nature&apos;s wisdom</span>
                </h1>

                <p className="max-w-xl text-base leading-7 text-gray-200 sm:text-lg sm:leading-8">
                    Specialising in Electrohomeopathy and Bachflower, we offer personalised care that treats the whole person — body, mind, and vital energy.
                </p>

                <div className="mt-6 flex flex-col gap-4 sm:mt-10 sm:flex-row sm:gap-6">
                    <Link href="/contact">
                        <Button
                        text="Book a Consultation"
                        showArrow
                        />
                    </Link>

                    <Link href="/services">
                        <Button
                        text="Explore Services"
                        variant="outline"
                        showArrow
                        />
                    </Link>
                    </div>
                </div>
            </Container>
        </section>
    );
};
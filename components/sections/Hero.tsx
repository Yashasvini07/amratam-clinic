import Button from "@/components/ui/Button";
import Container from "../ui/Container";
import Link from "next/link";

export default function Hero () {
    return (
        <section className="relative h-[700px] bg-cover bg-center" style={{ backgroundImage: "url('/images/hero.avif')" }}>
            <div className="absolute inset-0 bg-black/60" />
            <Container className="relative z-10 h-full flex items-start pt-32 text-white">
                <div className="max-w-lg flex flex-col gap-8">
                <p className="text-sm uppercase tracking-[0.35em] text-[#D08F59]">
                    HOLISTIC • NATURAL • EVIDENCE-BASED
                </p>

                <h1 className="max-w-3xl text-6xl leading-[1.15] text-white font-serif leading-tight">
                    Healing rooted in
                    <br />
                    <span className="text-[#D8A06B]">nature&apos;s wisdom</span>
                </h1>

                <p className="max-w-xl text-lg leading-8 text-gray-200">
                    Specialising in Electrohomeopathy and Bachflower, we offer personalised care that treats the whole person — body, mind, and vital energy.
                </p>
                
                <div className="mt-10 flex gap-6">
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
import Button from "../ui/Button";
import { Heart } from "lucide-react";
import Section from "../ui/Section";
import Link from "next/link";

export default function CTA() { 
    return (
        <Section background="dark">
            <div className="flex flex-col items-center text-center">
                <Heart
                    size={32}
                    className="mb-6 text-[#D08F59] sm:mb-8"
                />

                <h2 className="max-w-3xl font-serif text-3xl text-white leading-tight sm:text-4xl md:text-5xl">
                    Begin your journey to lasting wellness
                </h2>

                <p className="mt-4 max-w-2xl text-base leading-7 text-gray-300 sm:mt-6 sm:text-lg sm:leading-8">
                    Schedule a consultation today and discover what natural healing can do for you.
                </p>

                <div className="mt-10">
                    <Link href = "/contact">
                    <Button
                        text="Book a Consultation"
                        showArrow
                    />
                    </Link>
                </div>
            </div>
        </Section>
    );
}
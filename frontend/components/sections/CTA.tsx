import Button from "../ui/Button";
import { Heart } from "lucide-react";
import Section from "../ui/Section";
import Link from "next/link";

export default function CTA() { 
    return (
        <Section background="dark">
            <div className="flex flex-col items-center text-center">
                <Heart
                    size={36}
                    className="mb-8 text-[#D08F59]"
                />

                <h2 className="max-w-3xl font-serif text-5xl text-white leading-tight">
                    Begin your journey to lasting wellness
                </h2>

                <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-300">
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
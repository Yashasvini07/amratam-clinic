import Container from "@/components/ui/Container";

type SectionProps = {
    children: React.ReactNode;
    className?: string;
    containerClassName?: string;
    background?: "light" | "dark" | "white";
    /**
     * Removes top padding — used when this Section sits directly below a
     * PageHero, whose own bottom padding already provides the gap.
     * Implemented as a separate pt-0 class string (never combined with the
     * py-* below) so there's no same-property class conflict for Tailwind
     * to resolve unpredictably.
     */
    noTopPadding?: boolean;
};

const backgrounds = {
    light: "bg-[#FDFBF8]",
    dark: "bg-[#264B43]",
    white: "bg-white",
};

const topPadding = "pt-8 md:pt-12 lg:pt-16";
const bottomPadding = "pb-12 md:pb-20 lg:pb-24";

export default function Section({
    children,
    className = "",
    containerClassName = "",
    background = "light",
    noTopPadding = false,
}: SectionProps) {
    return (
        <section
            className={`${backgrounds[background]} ${noTopPadding ? "pt-0" : topPadding} ${bottomPadding} ${className}`}
        >
            <Container className={containerClassName}>
                {children}
            </Container>
        </section>
    );
}

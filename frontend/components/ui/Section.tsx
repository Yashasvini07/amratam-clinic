import Container from "@/components/ui/Container";

type SectionProps = {
    children: React.ReactNode;
    className?: string;
    containerClassName?: string;
    background?: "light" | "dark" | "white";
    /**
     * Cancels this Section's own top padding — used when whatever precedes
     * it already provides adequate spacing (e.g. a PageHero's own bottom
     * padding, or another element's bottom padding), so the two don't stack.
     * Implemented as a separate pt-0 class string (never combined with the
     * py-* below) so there's no same-property class conflict for Tailwind
     * to resolve unpredictably.
     */
    noTopPadding?: boolean;
    /**
     * Cancels this Section's own bottom padding — used when this Section
     * wraps a component that renders its own Section (with its own bottom
     * padding) as its root, so nesting doesn't double the trailing space.
     */
    noBottomPadding?: boolean;
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
    noBottomPadding = false,
}: SectionProps) {
    return (
        <section
            className={`${backgrounds[background]} ${noTopPadding ? "pt-0" : topPadding} ${noBottomPadding ? "pb-0" : bottomPadding} ${className}`}
        >
            <Container className={containerClassName}>
                {children}
            </Container>
        </section>
    );
}

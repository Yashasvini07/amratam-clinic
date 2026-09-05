import Container from "@/components/ui/Container";

type SectionProps = {
    children: React.ReactNode;
    className?: string;
    containerClassName?: string;
    background?: "light" | "dark" | "white";
};

const backgrounds = {
    light: "bg-[#FDFBF8]",
    dark: "bg-[#264B43]",
    white: "bg-white",
};

export default function Section({
    children,
    className = "",
    containerClassName = "",
    background = "light",
}: SectionProps) {
    return (
        <section
            className={`${backgrounds[background]} py-12 md:py-20 lg:py-24 ${className}`}
        >
            <Container className={containerClassName}>
                {children}
            </Container>
        </section>
    );
}
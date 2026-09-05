type SectionHeaderProps = {
    eyebrow: string;
    title: string;
    description?: string;
    centered?: boolean;
};

export default function SectionHeader({ eyebrow, title, description, centered = true}: SectionHeaderProps) {
    const alignment = centered ? "text-center mx-auto" : "text-left";

    return (
        <div className={`${alignment} mb-8 max-w-3xl sm:mb-12`}>
            <p className="mb-2 text-xs uppercase tracking-[0.25em] text-[#D08F59] sm:tracking-[0.3em] sm:text-sm">
                {eyebrow}
            </p>

            <h2 className="font-serif text-3xl leading-tight text-[#264B43] sm:text-4xl md:text-5xl">
                {title}
            </h2>

            {description && (
                <p className="mt-4 text-base leading-7 text-gray-600 sm:mt-6 sm:text-lg sm:leading-8">
                    {description}
                </p>
            )}
        </div>
    );
}
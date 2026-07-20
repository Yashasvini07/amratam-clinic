type SectionHeaderProps = {
    eyebrow: string;
    title: string;
    description?: string;
    centered?: boolean;
};

export default function SectionHeader({ eyebrow, title, description, centered = true}: SectionHeaderProps) {
    const alignment = centered ? "text-center mx-auto" : "text-left";

    return (
        <div className={`${alignment} mb-12 max-w-3xl`}>
            <p className="mb-2 text-sm uppercase tracking-[0.3em] text-[#D08F59]">
                {eyebrow}
            </p>

            <h2 className="font-serif text-5xl leading-tight text-[#264B43]">
                {title}
            </h2>

            {description && (
                <p className="mt-6 text-lg leading-8 text-gray-600">
                    {description}
                </p>
            )}
        </div>
    );
}
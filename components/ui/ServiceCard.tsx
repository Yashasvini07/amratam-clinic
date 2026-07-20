import Image from "next/image";

type ServiceCardProps = {
    category: string;
    title: string;
    description: string;
    image: string;
};

export default function ServiceCard({ category, title, description, image }: ServiceCardProps) {
    return (
        <div className="
            bg-white 
            rounded-lg 
            shadow-md 
            overflow-hidden 
            shadow-md
            transition-all
            duration-300
            hover:-translate-y-2
            hover:shadow-xl">
            <Image
                src={image}
                alt={title}
                width={600}
                height={400}
                className="w-full h-64 object-cover"
            />

            <div className="p-6">
                <p className="text-[#D8A06B] uppercase tracking-[0.3em] text-sm">
                {category}
                </p>

                <h3 className="text-xl font-semibold text-[#D08F59] mt-2">
                {title}
                </h3>

                <p className="mt-4 text-gray-700">{description}</p>
            </div>
        </div>
    );
}
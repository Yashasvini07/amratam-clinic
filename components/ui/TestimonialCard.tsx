import { Star } from "lucide-react";

type TestimonialCardProps = {
    name: string;
    condition: string;
    quote: string;
    rating: number;
};

export default function TestimonialCard({ name, condition, quote, rating }: TestimonialCardProps) {
    return (
        <div className="bg-white rounded-lg border border-gray-200 p-6 hover:border-[#D08F59] transition-colors duration-300">
            <div className="flex gap-1 items-center mb-4">
            {Array.from({ length: rating }).map((_, i) => (
                        <Star
                            key={i}
                            size={16}
                            fill="#D08F59"
                            color="#D08F59"
                        />
                    ))}
            </div>
            <p className="text-gray-700 mb-4">&ldquo;{quote}&rdquo;</p>
            <hr className="my-7 border-gray-200" />
            <div className="flex flex-col items-center">
                <div className="ml-4">
                    <p className="text-gray-900 font-semibold">{name}</p>
                    <p className="text-gray-600 text-sm">{condition}</p>
                </div>
            </div>
        </div>
    );
}

import { ArrowRight } from "lucide-react";

type ButtonProps = {
    text: string;
    variant?: "primary" | "outline" | "secondary";
    showArrow?: boolean;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
    onClick?: () => void;
};

export default function Button({ text, variant = "primary", showArrow = false, type = "button", disabled = false, onClick }: ButtonProps) {
    const baseStyles = "inline-flex items-center gap-2 px-8 py-4 rounded-md font-medium transition-all duration-300";

    const variants = {
        primary: "bg-[#D08F59] text-white hover:bg-[#B97C4A] hover:scale-105 active:scale-95",
        outline: "border border-white text-white hover:bg-white hover:text-black",
        secondary: "border border-[#264B43] text-[#264B43] hover:bg-[#264B43] hover:text-white",
    };

    return (
        <button
            type={type}
            disabled={disabled}
            onClick={onClick}
            className={` group ${baseStyles} ${variants[variant]} ${disabled ? "opacity-60 cursor-not-allowed hover:scale-100 active:scale-100" : ""}`}
        >
            <span> {text}</span>
            {
                showArrow &&
                <ArrowRight
                    size={20}
                    className={`transition-transform duration-300 ${
                        showArrow ? "group-hover:translate-x-1" : ""
                    }`}
                />
            }
        </button>
    );
}
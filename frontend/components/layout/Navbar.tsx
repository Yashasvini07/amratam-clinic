"use client";

import { useEffect, useState } from "react";
import Button from "../ui/Button";
import Container from "../ui/Container";
import Link from "next/link";
import { navigation } from "@/lib/navigation";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export default function Navbar() {

  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [lastPathname, setLastPathname] = useState(pathname);

  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setIsOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-[#FDFBF8]">
        <Container className="flex h-20 items-center justify-between md:h-24">
            <Link href="/" className="flex items-center gap-3" onClick={() => setIsOpen(false)}>
                <Image
                    src="/images/logo.png"
                    alt="Amratam Clinic Logo"
                    width={120}
                    height={120}
                    className="h-auto w-14 md:w-[120px]"
                />
                <div>
                    <h1 className="font-[family:var(--font-cormorant)] text-base text-gray-900 sm:text-lg md:text-xl">Dr. Abhilasha Chourasiya</h1>
                    <p className="text-xs text-gray-500 md:text-sm">MD-Electrohomeopathy</p>
                </div>
            </Link>

            <div className="hidden items-center space-x-6 text-gray-700 md:flex">
                {navigation.map((item) => {
                    const isActive =
                        item.href === "/"
                            ? pathname === "/"
                            : pathname.startsWith(item.href);
                    return (
                        <Link
                        key={item.label}
                        href={item.href}
                        className={`transition-colors duration-200 ${
                            isActive
                                ? "text-[#D08F59] font-medium"
                                : "text-gray-700 hover:text-[#D08F59]"
                        }`}
                    >
                        {item.label}
                    </Link>
                    );
                })}
            </div>

            <div className="hidden md:block">
                <Link href="/contact">
                    <Button
                    text="Book a Consultation"
                    />
                </Link>
            </div>

            <button
                type="button"
                onClick={() => setIsOpen(true)}
                aria-label="Open menu"
                className="p-2 text-gray-700 md:hidden"
            >
                <Menu size={28} />
            </button>
        </Container>

        <div
            className={`fixed inset-0 z-50 bg-black/40 transition-opacity duration-300 md:hidden ${
                isOpen ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
            onClick={() => setIsOpen(false)}
        />

        <div
            className={`fixed inset-y-0 right-0 z-50 flex w-72 max-w-[85vw] flex-col bg-[#FDFBF8] shadow-xl transition-transform duration-300 md:hidden ${
                isOpen ? "translate-x-0" : "translate-x-full"
            }`}
        >
            <div className="flex items-center justify-between border-b border-gray-200 p-6">
                <span className="font-[family:var(--font-cormorant)] text-lg text-gray-900">Menu</span>
                <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    aria-label="Close menu"
                    className="p-1 text-gray-700"
                >
                    <X size={24} />
                </button>
            </div>

            <div className="flex flex-1 flex-col gap-6 p-6">
                {navigation.map((item) => {
                    const isActive =
                        item.href === "/"
                            ? pathname === "/"
                            : pathname.startsWith(item.href);
                    return (
                        <Link
                            key={item.label}
                            href={item.href}
                            className={`text-lg transition-colors duration-200 ${
                                isActive
                                    ? "text-[#D08F59] font-medium"
                                    : "text-gray-700 hover:text-[#D08F59]"
                            }`}
                        >
                            {item.label}
                        </Link>
                    );
                })}

                <Link href="/contact" className="mt-4">
                    <Button text="Book a Consultation" />
                </Link>
            </div>
        </div>
    </nav>
  );
}

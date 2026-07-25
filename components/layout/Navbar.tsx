"use client";

import Button from "../ui/Button";
import Container from "../ui/Container";
import Link from "next/link";
import { navigation } from "@/lib/navigation";
import Image from "next/image";
import { usePathname } from "next/navigation";


export default function Navbar() {

  const pathname = usePathname();
  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-[#FDFBF8]/95 backdrop-blur-md">
        <Container className="flex h-24 items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
                <Image
                    src="/images/logo.png"
                    alt="Amratam Clinic Logo"
                    width={120}
                    height={120}
                /> 
                <div>
                    <h1 className="font-[family:var(--font-cormorant)] text-2xl text-xl text-gray-900">Dr. Abhilasha Chourasiya</h1>
                    <p className="text-sm text-gray-500">MD-Electrohomeopathy</p>
                </div>
            </Link>
            <div className=" flex items-center space-x-6 text-gray-700">
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
            <div>
                <Link href="/contact">
                    <Button
                    text="Book a Consultation"
                    />
                </Link>
            </div>
        </Container>
    </nav>
  );
}
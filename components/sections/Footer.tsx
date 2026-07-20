import Container from "@/components/ui/Container";
import Link from "next/link";
import Image from "next/image";
import { navigation } from "@/lib/navigation";
import { services } from "@/lib/ServiceCard";

export default function Footer() {
  return (
    <section className="bg-[#264B43] pt-16 pb-12"> 
        <Container className="grid grid-cols-1 md:grid-cols-4 gap-16 items-start text-white">
            {/* Column 1 */}
            <div className="space-y-3"> 
                <Image
                    src="/images/logo.png"
                    alt="Amratam Clinic Logo"
                    width={120}
                    height={120}
                /> 
                <div>
                    <h3 className="text-xl font-bold text-gray-100">Dr. Abhilasha Chourasiya</h3>
                    <p className="text-sm text-gray-300">MD-Electrohomeopathy</p>
                    <p className="text-sm text-gray-300">Holistic healing through Electrohomeopathy and Naturopathy.</p>
                </div>

            </div>

            {/* Column 2 */}
            <div className="space-y-3">
                <h3 className="uppercase tracking-[0.3em] text-sm text-[#D08F59] mb-6">Navigation</h3>
                {navigation.map((item) => (
                <Link 
                    key={item.label} 
                    href={item.href}
                    className="block mb-3 text-gray-300 hover:text-[#D08F59] transition-colors"
                >
                    {item.label}
                </Link>
                ))}
            </div>

            {/* Column 3 */}
            <div className="space-y-3">
                <h3 className="uppercase tracking-[0.3em] text-sm text-[#D08F59] mb-6">Services</h3>
                {services.map((service) => (
                <Link key={service.title} href={service.href} className="block mb-3 text-gray-300 hover:text-[#D08F59] transition-colors">
                    {service.title}
                </Link>
                ))}
            </div>

            {/* Column 4 */}
            <div className="space-y-2">
                <h3 className="uppercase tracking-[0.3em] text-sm text-[#D08F59] mb-6">CONTACT</h3>
                <p className="text-lg text-gray-300 leading-8">
                    <span>123 Main Street, City, State, ZIP</span>
                </p>
                <p className="text-lg text-gray-300 leading-8">
                    <a href="tel:+919876543210" className="hover:underline">
                        +91 98765 43210
                    </a>
                </p>
                
                <p className="text-lg text-gray-300 leading-8">
                    <a href="mailto:info@amratamclinic.com" className="hover:underline">
                        info@amratamclinic.com
                    </a>
                </p>

                <p className="text-gray-300">Mon–Fri 9am – 6pm</p>
                <p className="text-gray-300">Sat 9am – 1pm</p>
            </div>
        </Container>
    </section>
  );
}
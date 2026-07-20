import Container from "@/components/ui/Container";
import Image from "next/image";
import Button from "../ui/Button";

export default function AboutDoctor() {
  return (
    <section className="bg-[#FDFBF8] py-24">
    <Container className="flex gap-20 items-center">

        <div className="flex-1 max-w-xl">
            <p className="text-[#D8A06B] uppercase tracking-[0.3em] text-sm">
                    MEET THE DOCTOR
                </p>
            <h2 className="text-4xl font-bold text-[#D08F59] mb-6">Dr. Abhilasha Chourasiya</h2>
            <p className="text-gray-700 mb-4">
                Dr. Abhilasha Chourasiya is a highly skilled and compassionate practitioner of Electrohomeopathy and Naturopathy, dedicated to providing holistic care to her patients. With over 15 years of experience in the field, she has helped countless individuals achieve optimal health and well-being through natural and evidence-based therapies.
            </p>
            <p className="text-gray-700 mb-4">
                Her approach to healing is rooted in the belief that the body has an innate ability to heal itself when provided with the right support. She combines traditional knowledge with modern scientific research to create personalized treatment plans that address the unique needs of each patient.
            </p>
            <p className="text-gray-700">
                Dr. Chourasiya is committed to empowering her patients with the knowledge and tools they need to take control of their health and live vibrant, fulfilling lives.
            </p>
            <Button
                text="Learn More"
                variant="secondary"
                showArrow
            />
        </div>

        <div className="flex-1">
            <Image
                src="/images/doctor.png"
                alt="Dr. Abhilasha Chourasiya"
                width={500}
                height={650}
                className="object-cover rounded-lg object-cover shadow-lg"
            />
        </div>
    </Container>
    </section>
  );
}
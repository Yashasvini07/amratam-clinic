import Container from "../ui/Container";
import ServiceCard from "../ui/ServiceCard";
import { services } from "@/lib/services";

export default function Services() {
    return (
        <section className="bg-[#FDFBF8] py-24">
            <Container className="gap-20 items-center">
                <div className="flex flex-col gap-8">
                    <p className="text-[#D8A06B] uppercase tracking-[0.3em] text-sm">
                        OUR SERVICES
                    </p>

                    <h1 className="text-5xl text-gray-700 font-serif leading-tight">
                        Two disciplines, one purpose
                        <br />
                    </h1>

                    <p className="text-lg text-gray-600 leading-8  mb-4">
                        Each treatment path is tailore to address the underlying causes of your health concerns, rather than just alleviating symptoms. We create a comprehensive approach to healing that supports your body&apos;s natural ability to restore balance and vitality.
                    </p>
                </div>

                <div className="flex grid grid-cols-2 gap-8">
                    {services.map(service => (

                    <ServiceCard

                        key={service.slug}

                        slug={service.slug}

                        category={service.category}

                        title={service.title}

                        description={service.shortDescription}

                        image={service.heroImage}

                    />

                    ))}
                </div>
            </Container>
        </section>  
    );
    }
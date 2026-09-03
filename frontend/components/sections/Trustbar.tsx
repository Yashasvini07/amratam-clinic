import Container from "@/components/ui/Container";

const trustItems = [
    {
        title: "15+",
        description: "Years of Experience in Electrohomeopathy and Bachflower, providing expert care to our patients.",
    },
    {
        title: "500+",
        description: "Patients Treated, with a focus on holistic healing and personalised care.",
    },
    {
        title: "Natural",
        description: "100 percent naturally derived from flowers and medicinal plants",
    },
    {
        title: "Evidence-Based",
        description: "Approach, combining traditional knowledge with modern scientific research for effective and safe care.",
    }
];

export default function TrustBar() {
    return (
        <section className="bg-[#FDFBF8] py-6 bg-[#FAF6F1]">
            <Container className="flex flex-col md:flex-row items-center justify-between gap-4">
                {trustItems.map((item) => (
                    <div key={item.title} className="flex-1 text-center md:text-left">
                        <h3 className="text-2xl font-bold text-[#D08F59]">{item.title}</h3>
                        <p className="text-gray-700">{item.description}</p>
                    </div>
                ))}
            </Container>
        </section>
    );
}
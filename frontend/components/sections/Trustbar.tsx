import Container from "@/components/ui/Container";

const trustItems = [
    {
        title: "15+",
        description: "Years of Experience in Electro Homeopathy, Bachflower and Naturopathy, providing expert care to our patients.",
    },
    {
        title: "500+",
        description: "Patients Treated, with a focus on holistic healing and personalised care.",
    },
    {
        title: "Natural",
        description: "100 percent naturally derived medicine from flowers and medicinal plants",
    },
    {
        title: "Science Based",
        description: "Approach, combining traditional knowledge with modern scientific research for effective and safe care.",
    },
    {
        title: "No Side Effects",
        description: "Natural and gentle remedies, carefully selected to support your wellbeing without unwanted side effects.",
    }
];

export default function TrustBar() {
    return (
        <section className="bg-[#FDFBF8] py-8 bg-[#FAF6F1] md:py-6">
            <Container className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6 md:gap-4">
                {trustItems.map((item) => (
                    <div key={item.title} className="flex-1 text-center md:text-left">
                        <h3 className="text-xl font-bold text-[#D08F59] whitespace-nowrap sm:text-2xl">{item.title}</h3>
                        <p className="text-sm text-gray-700 sm:text-base">{item.description}</p>
                    </div>
                ))}
            </Container>
        </section>
    );
}
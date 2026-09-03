import { notFound } from "next/navigation";
import ServiceTabs from "@/components/services/ServiceTabs";
import ServiceOverview from "@/components/services/ServiceOverview";
import { services } from "@/lib/services";
import PageHero from "@/components/ui/PageHero";
import { pageMetadata } from "@/lib/site";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;

  const service = services.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  return (
    <>
      <main className="bg-[#FDFBF8]">
        <PageHero {...pageMetadata.services} />

        <ServiceTabs />
        <ServiceOverview
          title={service.title}
          subtitle={service.subtitle}
          content={service.content}
          image={service.heroImage}
        />
      </main>
    </>
  );
}
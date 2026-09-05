import PageHero from "@/components/ui/PageHero";
import Section from "@/components/ui/Section"
import { pageMetadata } from "@/lib/site";
import ServiceTabs from "@/components/services/ServiceTabs";
import ServiceOverview from "@/components/services/ServiceOverview";

import { services } from "@/lib/services";

export default function ServicesPage() {
  const service = services[0];

  return (
    <>
      <main className="bg-[#FDFBF8]">
        <PageHero {...pageMetadata.services} />

        <Section background="light" noTopPadding>
          <ServiceTabs />

          <ServiceOverview
          title={service.title}
          subtitle={service.subtitle}
          content={service.content}
          image={service.heroImage}
        />
        </Section>  
      </main>
    </>
  );
}
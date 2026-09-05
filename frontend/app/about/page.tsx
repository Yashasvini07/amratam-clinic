import AboutTabs from "@/components/sections/AboutTabs";
import PageHero from "@/components/ui/PageHero";
import Section from "@/components/ui/Section";
import { pageMetadata } from "@/lib/site";

export default function AboutPage() {
  return (
    <>
      <PageHero {...pageMetadata.about} />
      <Section background="light" noTopPadding>
        <AboutTabs />
      </Section>
      
    </>
  );
}
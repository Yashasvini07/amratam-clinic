import { ReactNode } from "react";

export type Service = {
  slug: string;
  tab: string;
  title: string;
  subtitle: string;
  category: string; 
  heroImage: string;
  shortDescription: string; 
  content: ReactNode;
  benefits: string[];
  process: {
    step: string;
    description: string;
  }[];
conditions: string[];
faqs: {
    question: string;
    answer: string;
  }[];
};



export const services: Service[] = [
  {
    slug: "electrohomeopathy",

    tab: "Electrohomeopathy",

    title: "Electrohomeopathy",

    subtitle: "Plant-based healing through gentle bioenergetic remedies.",

    category: "HOLISTIC MEDICINE",

    heroImage: "/images/services/electrohomeopathy.jpg",

    shortDescription: "A holistic approach to healing that uses natural remedies and therapies to support the body&rsquo;s innate healing abilities.",

    content: (
  <>
    <p>
      <strong>Electrohomeopathy</strong> is a complementary system of healthcare
      developed in the 19th century by <strong>Count Cesare Mattei
      (1809–1896)</strong> of Italy. It is founded on the philosophy that the
      body possesses an inherent ability to maintain and restore health when
      its natural balance is supported.
    </p>

    <p className="mt-6">
      Unlike conventional medicine, which often focuses on diagnosing and
      treating specific diseases, <strong>Electrohomeopathy takes a holistic
      approach</strong>, considering the individual as a whole—physically,
      mentally, and constitutionally. The aim is to support the body&rsquo;s overall
      functioning rather than focusing solely on isolated symptoms.
    </p>

    <p className="mt-6">
      The remedies used in Electrohomeopathy are prepared from carefully
      selected medicinal plants using specialised extraction methods. These
      botanical formulations are intended to support the body&rsquo;s natural
      physiological balance and overall wellbeing.
    </p>

    <p className="mt-6">
      In today&rsquo;s era of standardised diagnosis and generic treatment
      approaches, we believe in <strong>personalised patient care</strong>.
      Every individual is unique, and no two patients are exactly alike. Even
      when two people present with similar symptoms, they may receive different
      electrohomeopathic formulations based on their overall constitution,
      lifestyle, and health profile.
    </p>
  </>
),
    benefits: [
      "Gentle plant-derived remedies",
      "Personalised treatment plans",
      "Supports natural healing processes",
    ],

    process: [
      {
        step: "Consultation",
        description:
          "A detailed discussion of your health history, lifestyle and concerns.",
      },
      {
        step: "Assessment",
        description:
          "Evaluation of the body&rsquo;s constitution and underlying imbalances.",
      },
      {
        step: "Treatment",
        description:
          "Personalised electrohomeopathic remedies with ongoing follow-up.",
      },
    ],

    conditions: [
      "Digestive disorders",
      "Hormonal imbalance",
      "Joint pain",
      "Skin conditions",
      "Allergies",
      "Fatigue",
      "Stress",
      "Migraine",
    ],

    faqs: [
      {
        question: "Is Electrohomeopathy safe?",
        answer:
          "Yes. Treatments use plant-derived remedies and are prescribed according to the individual&rsquo;s health condition.",
      },
      {
        question: "How many sessions will I need?",
        answer:
          "The duration varies depending on your condition and treatment goals. During your consultation, your practitioner will outline an expected treatment plan.",
      },
    ],
  },

  {
    slug: "bachflower",

    tab: "Bachflower",

    title: "Bachflower",

    subtitle: "Supporting wellness through nutrition, lifestyle and nature.",

    category: "PLANT-BASED REMEDIES",

    heroImage: "/images/services/bachflower.png",

    shortDescription: "A natural and evidence-based approach to healthcare that focuses on prevention, wellness, and the body&apos;s ability to heal itself.",

    content: (
  <>
    <p>
      <strong>Bach Flower Remedies</strong> are a gentle system of natural
      healing developed by <strong>Dr. Edward Bach</strong> in the 1930s. The
      system is based on the belief that emotional wellbeing plays an important
      role in overall health, and that restoring emotional balance can support
      a person&rsquo;s sense of wellbeing.
    </p>

    <p className="mt-6">
      Dr. Bach identified a collection of wild flowers whose essences are used
      to support a wide range of emotional states. The remedies are prepared
      using traditional methods and are intended to help individuals navigate
      emotions such as fear, worry, stress, uncertainty, sadness, frustration,
      and lack of confidence.
    </p>

    <p className="mt-6">
      Bach Flower Therapy focuses on the <strong>individual rather than the
      illness</strong>. Instead of treating physical symptoms directly, it aims
      to encourage emotional harmony by replacing negative emotional patterns
      with more positive and balanced states of mind.
    </p>

    <p className="mt-6">
      At Amratam Clinic, Bach Flower Remedies are prescribed as part of a
      <strong> personalised treatment plan</strong>. They may be recommended
      alongside other complementary therapies based on each patient&rsquo;s emotional
      wellbeing, lifestyle, and overall health goals.
    </p>

    <p className="mt-6">
      Bach Flower Remedies are gentle, easy to administer, and are commonly
      used by people of all ages, including children and pregnant women.
      Individual suitability and recommendations are always discussed during a
      consultation.
    </p>
  </>
),

    benefits: [
      "Evidence-informed natural therapies",
      "Nutrition & lifestyle guidance",
      "Whole-person care",
    ],

    process: [
      {
        step: "Consultation",
        description:
          "Understanding your medical history, habits and health goals.",
      },
      {
        step: "Assessment",
        description:
          "Identifying nutritional and lifestyle factors contributing to illness.",
      },
      {
        step: "Treatment",
        description:
          "Tailored dietary guidance, natural remedies and wellness planning.",
      },
    ],

    conditions: [
      "Weight management",
      "Stress",
      "Sleep disorders",
      "Digestive issues",
      "Lifestyle diseases",
      "Women&rsquo;s health",
      "Immunity",
      "General wellness",
    ],

    faqs: [
      {
        question: "Does Bachflower replace conventional medicine?",
        answer:
          "No. Bachflower complements conventional healthcare and focuses on prevention, lifestyle and supporting overall wellbeing.",
      },
      {
        question: "Will I receive a personalised treatment plan?",
        answer:
          "Yes. Every consultation results in recommendations tailored specifically to your health goals and medical history.",
      },
    ],
  },
];
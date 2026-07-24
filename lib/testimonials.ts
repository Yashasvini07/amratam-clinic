export type Testimonial = {
  name: string;
  condition: string;
  treatment: string;
  duration: string;
  quote: string;
  rating: number;
  featured?: boolean;
};

export const testimonials: Testimonial[] = [
  {
    name: "Anita Sharma",
    condition: "Chronic Migraines",
    treatment: "Electrohomeopathy",
    duration: "4 months",
    rating: 5,
    featured: true,
    quote:
      "After years of relying on pain medication, I finally found lasting relief through Dr. Abhilasha's holistic approach. The treatment plan was gentle, personalised and truly life-changing.",
  },
  {
    name: "Rajesh Verma",
    condition: "Digestive Disorders",
    treatment: "Bachflower",
    duration: "3 months",
    rating: 5,
    quote:
      "The focus on nutrition and lifestyle made a remarkable difference. I feel healthier and more energetic than I have in years.",
  },
  {
    name: "Priya Singh",
    condition: "Stress & Anxiety",
    treatment: "Bachflower",
    duration: "2 months",
    rating: 5,
    quote:
      "Every consultation felt personal. I appreciated how much time was spent understanding my concerns instead of simply treating symptoms.",
  },
  {
    name: "Mohit Patel",
    condition: "Joint Pain",
    treatment: "Electrohomeopathy",
    duration: "5 months",
    rating: 5,
    quote:
      "The gradual improvement surprised me. The treatment was gentle and the guidance on lifestyle changes made all the difference.",
  },
  {
    name: "Sneha Kapoor",
    condition: "Hormonal Imbalance",
    treatment: "Electrohomeopathy",
    duration: "6 months",
    rating: 5,
    quote:
      "I finally feel like my health is back on track. The holistic approach helped me understand my body in a completely different way.",
  },
  {
    name: "Vikas Mehta",
    condition: "Chronic Fatigue",
    treatment: "Bachflower",
    duration: "4 months",
    rating: 5,
    quote:
      "The combination of natural remedies and lifestyle guidance restored my energy levels. I couldn't be happier with the care I received.",
  },
];
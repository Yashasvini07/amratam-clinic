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
    treatment: "Electro Homeopathy",
    duration: "4 months",
    rating: 5,
    featured: true,
    quote:
      "After years of relying on pain medication, I finally found lasting relief through Dr. Abhilasha's holistic approach. The treatment plan was gentle, personalised and truly life-changing.",
  },
  {
    name: "श्रीमती विजया",
    condition: "Joint Pain",
    treatment: "Electro Homeopathy",
    duration: "6 months",
    rating: 5,
    quote:
      "मुझे पैरों की नसों की समस्या के कारण चलने-फिरने में बहुत तकलीफ़ होती थी। कई वर्षों से यह परेशानी बनी हुई थी। डॉ. अभिलाषा से परामर्श लेने के बाद उनकी दवाइयों और जीवनशैली संबंधी सलाह से मुझे धीरे-धीरे काफ़ी राहत मिली। अब मैं पहले की तुलना में अधिक आराम से चल-फिर पाती हूँ।",
  },
  {
    name: "Sahiti Soni",
    condition: "Thyroid Imbalance & Blood Pressure",
    treatment: "Electro Homeopathy",
    duration: "2 months",
    rating: 5,
    quote:
      "I had been struggling with thyroid imbalance and fluctuating blood pressure for a long time. Despite trying different treatments, I was looking for a more holistic approach. Dr. Abhilasha Chourasiya’s consultation was detailed, and her personalized Electro Homeopathy treatment plan helped me experience gradual and lasting improvement.",
  },
  {
    name: "Sarthak Pagar",
    condition: "Digestive Disorders",
    treatment: "Electro Homeopathy",
    duration: "3 months",
    rating: 5,
    quote:
      "I was suffering from a painful fissure that affected my daily routine. After consulting Dr. Abhilasha Chourasiya, I followed her prescribed treatment and lifestyle guidance consistently. Over the next few months, my symptoms improved significantly, and I was able to return to my routine",
  },
  {
    name: "मुस्कान जायसवाल",
    condition: "PCOS/PCOD",
    treatment: "Electro Homeopathy",
    duration: "2 months",
    rating: 5,
    quote:
      "मैं पिछले छह सालों से PCOS/PCOD की समस्या से परेशान थी। कई तरह के इलाज करवाने के बाद भी मुझे संतोषजनक राहत नहीं मिल रही थी। सबसे अच्छी बात यह है कि डॉक्टर बहुत ही विनम्र, संवेदनशील और धैर्यपूर्वक हर बात सुनती हैं। हर मुलाकात में उन्होंने मुझे भरोसा दिया और मेरी हर शंका का विस्तार से उत्तर दिया।",
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
    treatment: "Electro Homeopathy",
    duration: "5 months",
    rating: 5,
    quote:
      "The gradual improvement surprised me. The treatment was gentle and the guidance on lifestyle changes made all the difference.",
  },
  {
    name: "Sneha Kapoor",
    condition: "Hormonal Imbalance",
    treatment: "Electro Homeopathy",
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
import type { Psychologist } from "../types/psychologist";

export const psychologists: Psychologist[] = [
  {
    id: "1",
    name: "Dr. Sarah Davis",
    avatar_url: "https://via.placeholder.com/96x96.png?text=SD",
    experience: "12 years",
    reviews: [
      {
        reviewer: "Michael Brown",
        rating: 4.5,
        comment: "Very attentive and supportive specialist.",
      },
      {
        reviewer: "Linda Johnson",
        rating: 5,
        comment: "Helped me better understand my emotions.",
      },
    ],
    price_per_hour: 120,
    rating: 4.8,
    license: "Licensed Psychologist",
    specialization: "Depression and Mood Disorders",
    initial_consultation: "Free 45-minute initial consultation",
    about:
      "Experienced psychologist specializing in emotional wellbeing, anxiety and mood support.",
  },
  {
    id: "2",
    name: "Dr. Emily Carter",
    avatar_url: "https://via.placeholder.com/96x96.png?text=EC",
    experience: "9 years",
    reviews: [
      {
        reviewer: "Anna White",
        rating: 4.7,
        comment: "Warm and professional communication.",
      },
    ],
    price_per_hour: 90,
    rating: 4.7,
    license: "Certified Clinical Psychologist",
    specialization: "Family Relationships",
    initial_consultation: "First session discount available",
    about:
      "Focuses on family communication, conflict resolution and emotional resilience.",
  },
  {
    id: "3",
    name: "Dr. Olivia Moore",
    avatar_url: "https://via.placeholder.com/96x96.png?text=OM",
    experience: "7 years",
    reviews: [
      {
        reviewer: "Sophia Green",
        rating: 4.9,
        comment: "I felt understood from the very first session.",
      },
    ],
    price_per_hour: 110,
    rating: 4.9,
    license: "Licensed Therapist",
    specialization: "Stress and Burnout",
    initial_consultation: "Online introduction meeting",
    about:
      "Helps clients work through chronic stress, emotional fatigue and burnout prevention.",
  },
  {
    id: "4",
    name: "Dr. Daniel Lee",
    avatar_url: "https://via.placeholder.com/96x96.png?text=DL",
    experience: "15 years",
    reviews: [
      {
        reviewer: "Chris Adams",
        rating: 4.6,
        comment: "Structured approach and clear recommendations.",
      },
    ],
    price_per_hour: 140,
    rating: 4.6,
    license: "Senior Counseling Psychologist",
    specialization: "Anxiety and Panic Attacks",
    initial_consultation: "Free short intro call",
    about:
      "Specializes in anxiety management, coping strategies and long-term emotional support.",
  },
];
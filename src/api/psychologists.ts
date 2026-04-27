import { psychologists } from "../data/psychologists";
import type { Psychologist } from "../types/psychologist";

const DATABASE_URL = import.meta.env.VITE_FIREBASE_DATABASE_URL;

function ensureDatabaseUrl(): string {
  if (!DATABASE_URL) {
    throw new Error("VITE_FIREBASE_DATABASE_URL is missing");
  }

  return DATABASE_URL;
}

type FirebasePsychologistsRecord = Record<string, Omit<Psychologist, "id">>;

export async function seedPsychologistsToFirebase(): Promise<void> {
  const databaseUrl = ensureDatabaseUrl();

  const psychologistsForUpload = psychologists.reduce<
    Record<string, Omit<Psychologist, "id">>
  >((accumulator, psychologist) => {
    const { id, ...psychologistWithoutId } = psychologist;
    accumulator[id] = psychologistWithoutId;
    return accumulator;
  }, {});

  const response = await fetch(`${databaseUrl}/psychologists.json`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(psychologistsForUpload),
  });

  if (!response.ok) {
    throw new Error("Failed to seed psychologists to Firebase");
  }
}

export async function fetchPsychologistsFromFirebase(): Promise<Psychologist[]> {
  const databaseUrl = ensureDatabaseUrl();

  const response = await fetch(`${databaseUrl}/psychologists.json`);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch psychologists from Firebase. Status: ${response.status}`
    );
  }

  const data: FirebasePsychologistsRecord | null = await response.json();

  if (!data) {
    return [];
  }

  return Object.entries(data).map(([id, psychologistData]) => ({
    id,
    ...psychologistData,
  }));
}
import type { Metadata } from 'next';
import { FamilyLandingPage } from "@/components/landing/family-landing-page";

export const metadata: Metadata = {
  title: 'Pathnook | AI Learning and Growth System for Families',
  description:
    'Pathnook helps families turn recent learning evidence into diagnosis, evidence review, and a 7-day action plan.',
  alternates: {
    canonical: '/'
  }
};

export default function HomePage() {
  return <FamilyLandingPage />;
}

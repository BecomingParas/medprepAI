import type { Metadata } from 'next';
import {
  FeatureHighlights,
  FaqSection,
  HomeHeroSection,
  LandingCtaSection,
  LearningPathSection,
  SampleQuestionSection,
  SourceTrustSection,
  SubjectSection,
} from '@/features/landing';

export const metadata: Metadata = {
  title: 'Home',
  description:
    'Prepare for Nepal’s MECEE-BL with visual lessons, practice questions and an AI study tutor.',
};

export default function HomePage() {
  return (
    <div className="landing-page min-h-screen">
      <main id="main-content">
        <HomeHeroSection />
        <FeatureHighlights />
        <SubjectSection />
        <SampleQuestionSection />
        <LearningPathSection />
        <SourceTrustSection />
        <FaqSection />
        <LandingCtaSection />
      </main>
    </div>
  );
}

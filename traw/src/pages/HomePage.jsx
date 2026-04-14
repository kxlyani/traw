import HeroSection from '../sections/HeroSection';
import DestinationSection from '../sections/DestinationSection';
import {
  FeatureSection,
  MapSection,
  ExperienceSection,
  CommunitySection,
  NewsletterSection,
} from '../sections/OtherSections';

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <DestinationSection />
      <FeatureSection />
      <MapSection />
      <ExperienceSection />
      <CommunitySection />
      <NewsletterSection />
    </main>
  );
}

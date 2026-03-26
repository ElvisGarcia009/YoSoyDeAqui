import HeroSection from '../components/HeroSection';
import DiversidadSection from '../components/DiversidadSection';
import ConfusionSection from '../components/ConfusionSection';

export default function Home() {
  return (
    <main>
      <HeroSection />
      {/* Yellow accent bar */}
      <div className="h-6 bg-yellow" />
      <DiversidadSection />
      <ConfusionSection />
    </main>
  );
}

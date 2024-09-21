'use client';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import WaitlistForm from './components/WaitlistForm';
import Footer from './components/Footer';

export default function PageClient() {
  
  return (
    <main>
      <Header />
      <HeroSection />
      <FeaturesSection />
      <WaitlistForm />
      <Footer />
    </main>
  );
}

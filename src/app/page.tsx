import {
  ContactSection,
  FloatingCvButton,
  Footer,
  HeroSection,
  LearningSection,
  ProjectsSection,
} from "@/features/portfolio";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      {/* <AboutSection />
      <SkillsSection />
      <ExperienceSection /> */}
      <ProjectsSection />
      <LearningSection />
      <ContactSection />
      <Footer />
      <FloatingCvButton />
    </>
  );
}

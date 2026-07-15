import {
  AboutSection,
  ContactSection,
  ExperienceSection,
  FloatingCvButton,
  Footer,
  HeroSection,
  LearningSection,
  ProjectsSection,
  SkillsSection,
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

import {
  ContactSection,
  ExperienceSection,
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
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <LearningSection />
      <ContactSection />
      <Footer />
    </>
  );
}

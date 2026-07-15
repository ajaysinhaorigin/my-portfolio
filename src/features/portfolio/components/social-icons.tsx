import { Github, Instagram, Linkedin, Mail } from "lucide-react";
import type { SocialLink } from "@/features/portfolio/portfolio.data";
import { cn } from "@/shared/utils";

const iconMap = {
  linkedin: Linkedin,
  github: Github,
  instagram: Instagram,
  email: Mail,
} as const;

type SocialIconsProps = {
  links: SocialLink[];
  className?: string;
  iconClassName?: string;
};

export default function SocialIcons({
  links,
  className,
  iconClassName,
}: SocialIconsProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {links.map((link) => {
        const Icon = iconMap[link.name as keyof typeof iconMap] ?? Mail;

        return (
          <a
            key={link.name}
            href={link.href}
            target={link.name === "email" ? undefined : "_blank"}
            rel={link.name === "email" ? undefined : "noopener noreferrer"}
            aria-label={link.label}
            className={cn(
              "inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/80 text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:text-accent",
              iconClassName,
            )}
          >
            <Icon className="h-4 w-4" />
          </a>
        );
      })}
    </div>
  );
}

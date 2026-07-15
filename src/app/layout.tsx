import type { Metadata } from "next";
import { Geist_Mono, Outfit } from "next/font/google";
import { Navbar } from "@/shared/components";
import { ThemeProvider } from "@/shared/providers";
import { siteConfig } from "@/features/portfolio/portfolio.data";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} · ${siteConfig.role}`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.tagline,
  keywords: [
    "Ajay Sinha",
    "Fullstack Software Engineer",
    "Next.js",
    "NestJS",
    "React Native",
    "Fintech",
    "Portfolio",
  ],
  authors: [{ name: siteConfig.name, url: "https://ajaysinhaorigin.netlify.app" }],
  openGraph: {
    title: `${siteConfig.name} · ${siteConfig.role}`,
    description: siteConfig.tagline,
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} · ${siteConfig.role}`,
    description: siteConfig.tagline,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${outfit.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="flex-1">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}

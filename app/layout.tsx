import type { Metadata } from "next";
import PageTransition from "./components/PageTransition";
import { SiteHeader } from "./site-chrome";
import "./globals.css";
import "./photo-enhancements.css";
import "./high-quality-photos.css";
import "./site-polish.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.montessori-playschool.com"),
  title: {
    default: "Montessori Playschool | Carmichael, California",
    template: "%s | Montessori Playschool",
  },
  description:
    "Montessori-inspired infant, preschool, and school-age care from birth through 9th grade in Carmichael, California.",
  openGraph: {
    title: "Montessori Playschool | Carmichael, California",
    description:
      "A welcoming Montessori-inspired community for infants, preschoolers, and school-age children through 9th grade.",
    siteName: "Montessori Playschool",
    images: [
      {
        url: "/images/photos/selected/home-hero.webp",
        width: 1400,
        height: 1156,
        alt: "An educator engaging with two young children in a bright Montessori Playschool classroom",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/images/montessori-playschool-logo.png",
    shortcut: "/images/montessori-playschool-logo.png",
    apple: "/images/montessori-playschool-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}

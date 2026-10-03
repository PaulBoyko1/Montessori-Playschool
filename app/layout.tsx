import type { Metadata } from "next";
import PageTransition from "./components/PageTransition";
import { SiteHeader } from "./site-chrome";
import "./globals.css";
import "./photos.css";
import "./responsive.css";

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
        url: "/images/photos/selected/community.webp",
        width: 1500,
        height: 1060,
        alt: "Two children and a caring adult smiling together at Montessori Playschool",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "/images/montessori-playschool-symbol-transparent.svg",
    shortcut: "/images/montessori-playschool-symbol-transparent.svg",
    apple: "/images/montessori-playschool-symbol-transparent.svg",
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

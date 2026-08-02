import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.montessori-playschool.com"),
  title: {
    default: "Montessori Playschool | Carmichael, California",
    template: "%s | Montessori Playschool",
  },
  description:
    "Montessori-inspired infant, toddler, preschool, and school-age care for children ages 6 weeks to 13 years in Carmichael, California.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Montessori Playschool | Carmichael, California",
    description:
      "A welcoming Montessori-inspired community for children ages 6 weeks to 13 years.",
    url: "/",
    siteName: "Montessori Playschool",
    images: [
      {
        url: "/images/montessori-playschool-logo.png",
        width: 1536,
        height: 1024,
        alt: "Montessori Playschool logo",
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
      <body>{children}</body>
    </html>
  );
}

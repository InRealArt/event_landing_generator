import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Monique Laville - Contemporary French Artist | Impressionistic Landscapes",
  description: "Discover the beautiful impressionistic landscapes of Monique Laville, a contemporary French artist specializing in oil paintings of Provence's natural beauty.",
  keywords: "Monique Laville, French artist, impressionistic paintings, Provence landscapes, contemporary art, oil paintings, French countryside",
  authors: [{ name: "Monique Laville" }],
  openGraph: {
    title: "Monique Laville - Contemporary French Artist",
    description: "Discover the beautiful impressionistic landscapes of Monique Laville, a contemporary French artist specializing in oil paintings of Provence's natural beauty.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Monique Laville - Contemporary French Artist",
    description: "Discover the beautiful impressionistic landscapes of Monique Laville, a contemporary French artist specializing in oil paintings of Provence's natural beauty.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-backgroundColor text-textColor">
        {children}
      </body>
    </html>
  );
}
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Basement",
  description: "Private home studio barbershop.",

  openGraph: {
    title: "The Basement",
    description: "Private home studio barbershop.",
    url: "https://thebasementbarbershop.ca",
    siteName: "The Basement",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "The Basement",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "The Basement",
    description: "Private home studio barbershop.",
    images: ["/og-image.png"],
  },

  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
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
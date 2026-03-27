import type { Metadata } from 'next';
import { EB_Garamond, Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { LAB_NAME, LAB_DESCRIPTION, LAB_INSTITUTION } from '@/lib/data';

const garamond = EB_Garamond({
  subsets: ['latin'],
  variable: '--font-garamond',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: `${LAB_NAME} | ${LAB_INSTITUTION}`,
  description: LAB_DESCRIPTION,
  authors: [{ name: LAB_NAME }],
  keywords: [
    'research',
    'materials science',
    'nanotechnology',
    'polymers',
    'academic',
    'laboratory',
  ],
  openGraph: {
    title: LAB_NAME,
    description: LAB_DESCRIPTION,
    type: 'website',
    url: 'https://amslab.edu',
    images: [
      {
        url: 'https://amslab.edu/og-image.jpg',
        width: 1200,
        height: 630,
        alt: LAB_NAME,
      },
    ],
  },
  viewport: 'width=device-width, initial-scale=1.0',
  themeColor: '#0f172a',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${garamond.variable} ${inter.variable}`}>
      <body className="bg-white text-slate-900 font-sans antialiased">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

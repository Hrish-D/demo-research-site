import type { Metadata } from 'next';
import { EB_Garamond, Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ThemeProvider } from '@/components/ThemeProvider';
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
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${garamond.variable} ${inter.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'], weight: ['300', '400', '500', '600'] });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://minordevsstudios.vercel.app';

export const metadata: Metadata = {
  title: 'Minor Devs Studios — Premium App Development',
  description: 'Building meaningful and minimal apps for the next generation.',
  keywords: ['app development', 'mobile apps', 'minimal design', 'productivity apps', 'Minor Devs Studios'],
  authors: [{ name: 'Minor Devs Studios' }],
  creator: 'Minor Devs Studios',
  publisher: 'Minor Devs Studios',
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'Minor Devs Studios — Premium App Development',
    description: 'Building meaningful and minimal apps for the next generation.',
    siteName: 'Minor Devs Studios',
    images: [
      {
        url: '/icon.png',
        width: 32,
        height: 32,
        alt: 'Minor Devs Studios',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'Minor Devs Studios — Premium App Development',
    description: 'Building meaningful and minimal apps for the next generation.',
    images: ['/icon.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-7SHWG8FLE0"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-7SHWG8FLE0');
            `,
          }}
        />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={`${inter.className} bg-black text-white antialiased`}>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}


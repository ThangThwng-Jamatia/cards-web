import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Toaster } from '@/components/ui/sonner';
import { SpeedInsights } from '@vercel/speed-insights/next';

const inter = Inter({ subsets: ['latin'], weight: ['300', '400', '500', '600'] });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://minordevstudios.com';

export const metadata: Metadata = {
  title: {
    default: 'Minor Dev Studios - Solo Development Workspace',
    template: '%s | Minor Dev Studios',
  },
  description: 'Building meaningful and minimal apps for the next generation.',
  keywords: ['app development', 'mobile apps', 'minimal design', 'productivity apps', 'Minor Dev Studios'],
  authors: [{ name: 'Minor Dev Studios' }],
  creator: 'Minor Dev Studios',
  publisher: 'Minor Dev Studios',
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: '/',
  },
  applicationName: 'Minor Dev Studios',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    title: 'Minor Dev Studios - Solo Development Workspace',
    description: 'Building meaningful and minimal apps for the next generation.',
    siteName: 'Minor Dev Studios',
    images: [
      {
        url: `${siteUrl}/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: 'Minor Dev Studios Logo',
      },
      {
        url: `${siteUrl}/web-app-manifest-512x512.png`,
        width: 512,
        height: 512,
        alt: 'Minor Dev Studios Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Minor Dev Studios - Solo Development Workspace',
    description: 'Building meaningful and minimal apps for the next generation.',
    creator: '@minordevstudios',
    images: [`${siteUrl}/twitter-image.png`],
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
  manifest: '/site.webmanifest',
  verification: {
    google: 'your-google-verification-code',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32 48x48', type: 'image/x-icon' },
      { url: '/favicon.ico', sizes: 'any', type: 'image/x-icon' },
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    shortcut: [{ url: '/favicon.ico', type: 'image/x-icon' }],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'icon',
        url: '/web-app-manifest-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        rel: 'icon',
        url: '/web-app-manifest-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        rel: 'mask-icon',
        url: '/icon.svg',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Minor Dev Studios',
    alternateName: 'Minor Dev',
    url: siteUrl,
    logo: {
      '@type': 'ImageObject',
      url: `${siteUrl}/web-app-manifest-512x512.png`,
      width: 512,
      height: 512,
    },
    image: {
      '@type': 'ImageObject',
      url: `${siteUrl}/opengraph-image.png`,
      width: 1200,
      height: 630,
    },
    description: 'Building meaningful and minimal apps for the next generation.',
    foundingDate: '2024',
    sameAs: [
      'https://twitter.com/minordevstudios',
      // Add more social media URLs here
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      availableLanguage: ['English'],
    },
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Minor Dev Studios',
    url: siteUrl,
    description: 'Building meaningful and minimal apps for the next generation.',
    publisher: {
      '@type': 'Organization',
      name: 'Minor Dev Studios',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/web-app-manifest-512x512.png`,
      },
    },
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <link rel="canonical" href={siteUrl} />
      </head>
      <body className={`${inter.className} bg-black text-white antialiased`}>
        {/* Google Tag Manager */}
        <Script
          id="google-tag-manager"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-NLD8HVTW');`,
          }}
        />
        {/* End Google Tag Manager */}
        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-7SHWG8FLE0"
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-7SHWG8FLE0');
            `,
          }}
        />
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NLD8HVTW"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <Toaster />
        <SpeedInsights />
      </body>
    </html>
  );
}


import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Toaster } from '@/components/ui/sonner';
import { SpeedInsights } from '@vercel/speed-insights/next';

const inter = Inter({ subsets: ['latin'], weight: ['300', '400', '500', '600'] });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://minordevsstudios.vercel.app';

export const metadata: Metadata = {
  title: 'Minor Dev Studios - Solo Development Workspace',
  description: 'Building meaningful and minimal apps for the next generation.',
  keywords: ['app development', 'mobile apps', 'minimal design', 'productivity apps', 'Minor Dev Studios'],
  authors: [{ name: 'Minor Dev Studios' }],
  creator: 'Minor Dev Studios',
  publisher: 'Minor Dev Studios',
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    title: 'Minor Dev Studios - Solo Development Workspace',
    description: 'Building meaningful and minimal apps for the next generation.',
    siteName: 'Minor Dev Studios',
    images: [
      {
        url: `${siteUrl}/web-app-manifest-512x512.png`,
        width: 512,
        height: 512,
        alt: 'Minor Dev Studios Logo',
      },
      {
        url: `${siteUrl}/web-app-manifest-192x192.png`,
        width: 192,
        height: 192,
        alt: 'Minor Dev Studios Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Minor Dev Studios - Solo Development Workspace',
    description: 'Building meaningful and minimal apps for the next generation.',
    images: [`${siteUrl}/web-app-manifest-512x512.png`],
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
      { url: '/favicon.ico', sizes: '48x48', type: 'image/x-icon' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    shortcut: [{ url: '/favicon.ico' }],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/favicon.svg',
      },
    ],
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
      <body className={`${inter.className} bg-black text-white antialiased`}>
        {/* Google Tag Manager */}
        <script
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


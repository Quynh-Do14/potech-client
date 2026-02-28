import type { Metadata } from "next";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import RecoilProvider from "./ClientProviders";
import { configImageURL } from "@/infrastructure/helper/helper";
import { Work_Sans } from 'next/font/google';
import "@/assets/styles/common/tiny-editor-common.css"
import Script from "next/script";

const workSans = Work_Sans({
  subsets: ['latin', 'vietnamese'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-work-sans',
  fallback: ['system-ui', 'Arial', 'sans-serif'],
  preload: true, // Thêm preload để tối ưu hiển thị font
});

// Tách riêng các biến quan trọng
const siteURL = process.env.NEXT_PUBLIC_PUBLIC_URL || '';
const companyName = "Công ty TNHH Thương Mại XNK Nội Thất Ô Tô Quang Minh";
const brandName = "Potech";
const mainTitle = "Màn hình ô tô & Android Box Potech Chính Hãng - Bảo Hành 10 Năm";
const mainDescription = "Màn hình ô tô & Android Box Potech chính hãng thuộc hệ sinh thái Quang Minh. Phần cứng độc quyền, tích hợp AI thông minh, bảo hành lên đến 10 năm. Nâng cấp giải trí và an toàn cho xe hơi.";

const keywords = [
  "Potech Việt Nam",
  "potechvietnam",
  "màn hình android box Potech",
  "android box Potech",
  "màn hình ô tô Potech",
  "android box ô tô",
  "android box Potech",
  "màn hình giải trí ô tô",
  "đầu android ô tô",
  "màn hình cảm ứng ô tô",
  "android box thông minh",
  "giải pháp giải trí ô tô",
  "nâng cấp hệ thống giải trí xe hơi",
  "Potech chính hãng",
  "phụ kiện ô tô Potech",
  "hệ sinh thái Quang Minh",
  "thương hiệu phụ kiện ô tô",
];

export const metadata: Metadata = {
  title: mainTitle,
  description: mainDescription,
  keywords: keywords.join(", "),
  authors: [{ name: "Công ty TNHH Thương Mại XNK Nội Thất Ô Tô Quang Minh" }],
  openGraph: {
    type: "website",
    url: process.env.NEXT_PUBLIC_PUBLIC_URL,
    title: mainTitle,
    description: mainDescription,
    images: [
      {
        url: configImageURL('/uploads/potech-logo.jpg'),
        width: 1200,
        height: 630,
        alt: "Potech Việt Nam",
      },
    ],
    siteName: "Potech Việt Nam",
  },
  twitter: {
    card: "summary_large_image",
    title: mainTitle,
    description: mainDescription,
    images: [configImageURL('/uploads/potech-logo.jpg')],
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
  alternates: {
    canonical: process.env.NEXT_PUBLIC_PUBLIC_URL,
    languages: {
      'vi': process.env.NEXT_PUBLIC_PUBLIC_URL,
      // 'en': `${process.env.NEXT_PUBLIC_PUBLIC_URL}/en`, // Nếu có trang tiếng Anh
    },
  },
  // verification: {
  //   google: process.env.GOOGLE_SITE_VERIFICATION, // Thêm vào biến môi trường nếu có
  // },
};

// Schema cho Local Business (quan trọng cho doanh nghiệp địa phương)
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "AutomotiveBusiness",
  "@id": `${siteURL}/#localbusiness`,
  "name": "Công ty TNHH Thương Mại XNK Nội Thất Ô Tô Quang Minh",
  "image": configImageURL('/uploads/potech-logo.jpg'),
  "description": "Chuyên cung cấp và lắp đặt Màn hình ô tô & Android Box Potech chính hãng",
  "url": siteURL,
  "hasMap": `https://maps.app.goo.gl/GNH8zFY4UT5svvrq8`,
  "telephone": "+84-1900988910",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Số 12 Ngõ 44 Tư Đình – Tổ 5 – Phường Long Biên – Thành phố Hà Nội",
    "addressLocality": "Hà Nội",
    "addressRegion": "Hà Nội",
    "postalCode": "100000",
    "addressCountry": "VN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "21.028622",
    "longitude": "105.88525"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "08:00",
      "closes": "18:00"
    }
  ],
  "priceRange": "$$",
  "serviceType": "Màn hình ô tô & Android Box",
  "areaServed": {
    "@type": "City",
    "name": "Hà Nội"
  },
  "sameAs": [
    "https://www.facebook.com/potech.vietnam",
  ]
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteURL}/#organization`,
  "name": "Công ty TNHH Thương Mại XNK Nội Thất Ô Tô Quang Minh",
  "url": siteURL,
  "logo": configImageURL('/uploads/potech-logo.jpg'),
  "description": "GPKD số 0107801299 do Sở KH và ĐT TP Hà Nội cấp ngày 12/04/2017. Chuyên nhập khẩu và phân phối Màn hình ô tô & Android Box Potech Chính Hãng.",
  "sameAs": [
    "https://www.facebook.com/potech.vietnam",
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "19008113",
    "contactType": "customer service",
    "availableLanguage": ["Vietnamese"],
    "areaServed": "VN"
  }
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteURL}/#website`,
  "url": siteURL,
  "name": mainTitle,
  "description": mainDescription,
  "potentialAction": {
    "@type": "SearchAction",
    "target": `${siteURL}/tim-kiem?search={search_term_string}`,
    "query-input": "required name=search_term_string"
  }
};

// Schema cho Product/Service
const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "@id": `${siteURL}/#product`,
  "name": mainTitle,
  "description": mainDescription,
  "image": configImageURL('/uploads/potech-logo.jpg'),
  "brand": {
    "@type": "Brand",
    "name": brandName
  },
  "category": "Phụ kiện ô tô",
  "offers": {
    "@type": "AggregateOffer",
    "priceCurrency": "VND",
    "lowPrice": "1500000",
    "highPrice": "10000000",
    "offerCount": "5"
  }
};
const GA_TRACKING_ID = 'G-DYKHV4SM43';
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={workSans.variable}>
      <head>
        {/* Meta Charset và Viewport */}
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />

        {/* Theme Color - Responsive */}
        <meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)" />
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />

        {/* Favicon - Đầy đủ các kích thước */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* Preconnect và Preload */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" />

        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link rel="dns-prefetch" href="https://cdnjs.cloudflare.com" />

        {/* Sitemap */}
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />

        {/* RSS Feed (nếu có) */}
        {/* <link rel="alternate" type="application/rss+xml" href="/feed.xml" /> */}


        {/* <!-- Trong layout hoặc head của Next.js --> */}
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <meta name="googlebot-news" content="index, follow" />

        {/* <!-- Chặn AI training từ OpenAI, Anthropic, etc. --> */}
        <meta name="robots" content="noai, noimageai" />
        <meta name="ai" content="noindex, nofollow, noarchive" />

        {/* <!-- Hoặc cụ thể hơn --> */}
        <meta name="google-extended" content="notranslate" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              organizationSchema,
              websiteSchema,
              localBusinessSchema,
              productSchema
            ])
          }}
        />

        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_TRACKING_ID}');
        `}
        </Script>

        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
        {/* Geo Meta Tags */}
        <meta name="geo.region" content="VN-HN" />
        <meta name="geo.placename" content="Hà Nội" />
        <meta name="geo.position" content="20.987787;105.861443" />
        <meta name="ICBM" content="20.987787, 105.861443" />
        <meta name="location" content="Hà Nội, Vietnam" />

        {/* Mobile Meta Tags */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content={brandName} />

        {/* MS Tile Color */}
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-config" content="/browserconfig.xml" />

        {/* Additional Meta Tags */}
        <meta name="copyright" content={`Copyright © ${new Date().getFullYear()} ${companyName}`} />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />

        {/* X-UA-Compatible cho IE */}
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

        {/* Referrer Policy */}
        <meta name="referrer" content="strict-origin-when-cross-origin" />

        {/* Content Security Policy (CSP) - Đặt trong production */}
        {/* <meta httpEquiv="Content-Security-Policy" content="default-src 'self';" /> */}

        {/* Schema Markup cho body */}
        <meta itemProp="name" content={mainTitle} />
        <meta itemProp="description" content={mainDescription} />
        <meta itemProp="image" content={configImageURL('/uploads/potech-logo.jpg')} />
      </head>

      <body className={workSans.className} itemScope itemType="https://schema.org/WebPage">
        <RecoilProvider>
          <AntdRegistry>
            {children}
          </AntdRegistry>
        </RecoilProvider>


      </body>
    </html>
  );
}
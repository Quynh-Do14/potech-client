import type { Metadata } from "next";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import RecoilProvider from "./ClientProviders";
import { configImageURL } from "@/infrastructure/helper/helper";
import { Work_Sans } from 'next/font/google';
import "@/assets/styles/common/editor-common.css"
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

// Tạo canonical URL hợp lệ
const canonicalURL = `${siteURL.replace(/\/$/, '')}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteURL), // Quan trọng cho Next.js 13+
  title: {
    default: mainTitle,
    template: `%s | ${brandName} - ${companyName}`,
  },
  description: mainDescription,
  keywords: keywords.join(", "),
  authors: [{
    name: companyName,
    url: siteURL
  }],
  creator: brandName,
  publisher: companyName,
  formatDetection: {
    telephone: true,
    date: false,
    address: false,
    email: false,
    url: false,
  },

  // Open Graph
  openGraph: {
    type: "website",
    url: canonicalURL,
    title: mainTitle,
    description: mainDescription,
    siteName: brandName,
    locale: "vi_VN",
    countryName: "Vietnam",
    images: [
      {
        url: configImageURL('/uploads/potech-logo.jpg'),
        width: 1200,
        height: 630,
        alt: `${brandName} - ${companyName}`,
        type: "image/png",
      },
    ],
    emails: ["info@example.com"], // Thay bằng email thực tế
    phoneNumbers: ["19008113"],
  },

  // Twitter Cards
  twitter: {
    card: "summary_large_image",
    title: mainTitle,
    description: mainDescription,
    images: [configImageURL('/uploads/POTECH-logo.png')],
    creator: "@potechofficial", // Thay bằng Twitter thực tế
    site: "@potechofficial",
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
      noimageindex: false,
    },
  },

  // Alternates
  alternates: {
    canonical: canonicalURL,
    languages: {
      "vi-VN": canonicalURL,
    },
  },

  // Verification
  // verification: {
  //   google: process.env.GOOGLE_SITE_VERIFICATION,
  //   yandex: process.env.YANDEX_VERIFICATION,
  //   yahoo: process.env.YAHOO_VERIFICATION,
  //   // otherVerification: {
  //   //   name: "facebook-domain-verification",
  //   //   content: "xxxxxxxxxxxxxx",
  //   // },
  // },

  // Other meta tags
  category: "automotive",
  classification: "Automotive Accessories",
  abstract: mainDescription,

  // Apple meta tags
  appleWebApp: {
    capable: true,
    title: brandName,
    statusBarStyle: "black-translucent",
  },

  // App Links
  appLinks: {
    web: {
      url: canonicalURL,
      should_fallback: false,
    },
  },

  // Archives & Assets
  archives: [`${canonicalURL}/sitemap.xml`],
  assets: [`${canonicalURL}/assets`],

  // Bookmark
  bookmarks: [canonicalURL],
};

// Schema Markup - Tối ưu cấu trúc
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${canonicalURL}/#organization`,
  "name": companyName,
  "legalName": companyName,
  "url": canonicalURL,
  "logo": {
    "@type": "ImageObject",
    "url": configImageURL('/uploads/POTECH-logo.png'),
    "width": "600",
    "height": "300"
  },
  "image": configImageURL('/uploads/POTECH-logo.png'),
  "description": mainDescription,
  "foundingDate": "2010", // Thay năm thành lập thực tế
  "founders": [
    {
      "@type": "Person",
      "name": "Người sáng lập" // Thay tên thực tế
    }
  ],
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Số 12 Ngõ 44 Tư Đình - Tổ 5 - Phường Long Biên",
    "addressLocality": "Hà Nội",
    "addressRegion": "Hà Nội",
    "postalCode": "100000",
    "addressCountry": "VN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "20.987787",
    "longitude": "105.861443"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "19008113",
    "contactType": "customer service",
    "contactOption": "TollFree",
    "areaServed": ["VN", "US", "CA"], // Cập nhật khu vực phục vụ
    "availableLanguage": ["Vietnamese", "English"]
  },
  "sameAs": [
    "https://www.facebook.com/potech.vietnam",
  ],
  "brand": {
    "@type": "Brand",
    "name": brandName,
    "logo": configImageURL('/uploads/POTECH-logo.png')
  }
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${canonicalURL}/#website`,
  "url": canonicalURL,
  "name": mainTitle,
  "description": mainDescription,
  "publisher": {
    "@id": `${canonicalURL}/#organization`
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": `${canonicalURL}/tim-kiem?q={search_term_string}`
    },
    "query-input": "required name=search_term_string"
  },
  "inLanguage": "vi-VN"
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "AutoPartsStore",
  "@id": `${canonicalURL}/#localbusiness`,
  "name": `${brandName} - ${companyName}`,
  "image": configImageURL('/uploads/POTECH-logo.png'),
  "description": mainDescription,
  "url": canonicalURL,
  "telephone": "19008113",
  "priceRange": "1.5-10 triệu",
  "currenciesAccepted": "VND",
  "paymentAccepted": "Cash, Credit Card, Bank Transfer",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Số 12 Ngõ 44 Tư Đình - Tổ 5 - Phường Long Biên",
    "addressLocality": "Hà Nội",
    "addressRegion": "Hà Nội",
    "postalCode": "100000",
    "addressCountry": "VN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "20.987787",
    "longitude": "105.861443"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "08:00",
      "closes": "18:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Saturday",
      "opens": "08:00",
      "closes": "12:00"
    }
  ],
  "areaServed": {
    "@type": "City",
    "name": "Hà Nội"
  },
  "makesOffer": [
    {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": "Lắp đặt màn hình ô tô"
      }
    },
    {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": "Cài đặt Android Box ô tô"
      }
    }
  ],
  "parentOrganization": {
    "@id": `${canonicalURL}/#organization`
  }
};

// Breadcrumb Schema
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Trang chủ",
      "item": canonicalURL
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Sản phẩm",
      "item": `${canonicalURL}/san-pham`
    }
  ]
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
              breadcrumbSchema
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
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />

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
      </head>

      <body className={workSans.className} itemScope itemType="https://schema.org/WebPage">
        <RecoilProvider>
          <AntdRegistry>
            {children}
          </AntdRegistry>
        </RecoilProvider>

        {/* Schema Markup cho body */}
        <meta itemProp="name" content={mainTitle} />
        <meta itemProp="description" content={mainDescription} />
        <meta itemProp="image" content={configImageURL('/uploads/POTECH-logo.png')} />
      </body>
    </html>
  );
}
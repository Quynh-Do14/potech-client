import React from "react";
import styles from '@/assets/styles/pages/agency/agency.module.css'

import ClientLayout from "@/infrastructure/common/Layouts/Client-Layout";
import { Metadata } from "next";
import { ROUTE_PATH } from "@/core/common/appRouter";
import { configImageURL } from "@/infrastructure/helper/helper";
import AgencyList from "./components/agency-list";

type Props = {
    params: { slug: string };
};

const publicURL = process.env.NEXT_PUBLIC_PUBLIC_URL;

// ✅ Fallback data SEO cho trang danh sách đại lý
const FALLBACK_DATA = {
    title: 'Hệ thống Đại lý – Phụ kiện ô tô chính hãng | POTECHVIETNAM',
    description: 'Danh sách đại lý phân phối phụ kiện ô tô chính hãng POTECHVIETNAM trên toàn quốc. Tìm đại lý gần nhất để mua hàng và bảo hành uy tín.',
    keywords: 'đại lý phụ kiện ô tô, hệ thống đại lý POTECHVIETNAM, đại lý phụ kiện xe hơi, cửa hàng phụ kiện ô tô chính hãng',
};

// ✅ Metadata SEO đầy đủ cho trang danh sách đại lý
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const agencyUrl = `${publicURL}${ROUTE_PATH.AGENCY}`;

    const title = FALLBACK_DATA.title;
    const description = FALLBACK_DATA.description;
    const keywords = FALLBACK_DATA.keywords;
    const imageUrl = configImageURL('/uploads/potech-logo.jpg');

    return {
        title,
        description,
        keywords,

        openGraph: {
            title,
            description,
            images: [
                {
                    url: imageUrl,
                    width: 1200,
                    height: 630,
                    alt: title,
                }
            ],
            type: 'website',
            url: agencyUrl,
            siteName: 'POTECHVIETNAM',
            locale: 'vi_VN',
        },

        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [
                {
                    url: imageUrl,
                    alt: title,
                }
            ],
        },

        alternates: {
            canonical: agencyUrl,
        },

        robots: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
            'max-video-preview': -1,
        },

        verification: {
            google: process.env.GOOGLE_VERIFICATION,
        },

        category: 'Hệ thống đại lý',
        authors: [{ name: 'POTECHVIETNAM' }],
    };
}

// Component AgencyPage - Trang danh sách đại lý
const AgencyPage = async ({ params }: Props) => {
    const agencyUrl = `${publicURL}${ROUTE_PATH.AGENCY}`;
    const imageUrl = configImageURL('/uploads/potech-logo.jpg');

    const pageName = FALLBACK_DATA?.title;
    const pageDescription = FALLBACK_DATA?.description;

    // ✅ CollectionPage (trang danh mục đại lý)
    const collectionPageSchema = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "@id": agencyUrl,
        "url": agencyUrl,
        "name": pageName,
        "description": pageDescription,
        "isPartOf": {
            "@type": "WebSite",
            "@id": `${publicURL}/#website`,
            "url": publicURL,
            "name": "POTECHVIETNAM"
        },
        "primaryImageOfPage": {
            "@type": "ImageObject",
            "url": imageUrl,
            "caption": pageName,
            "width": "1200",
            "height": "630"
        },
        "about": {
            "@type": "Thing",
            "name": "Hệ thống đại lý phụ kiện ô tô"
        },
        "inLanguage": "vi-VN"
    };

    // ✅ Breadcrumb 2 cấp
    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Trang chủ",
                "item": publicURL
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "Đại lý",
                "item": agencyUrl
            }
        ]
    };

    // ✅ WebPage
    const webpageSchema = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${agencyUrl}#webpage`,
        "url": agencyUrl,
        "name": pageName,
        "description": pageDescription,
        "isPartOf": {
            "@type": "WebSite",
            "@id": `${publicURL}/#website`,
            "url": publicURL,
            "name": "POTECHVIETNAM"
        },
        "primaryImageOfPage": {
            "@type": "ImageObject",
            "url": imageUrl,
            "caption": pageName,
            "width": "1200",
            "height": "630"
        },
        "about": {
            "@type": "Thing",
            "name": "Hệ thống đại lý phụ kiện ô tô"
        }
    };

    // ✅ Organization (thương hiệu)
    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "POTECHVIETNAM",
        "url": publicURL,
        "logo": imageUrl,
        "sameAs": []
    };

    return (
        <ClientLayout>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(webpageSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
            />

            <div className={styles.productSection}>
                <AgencyList />
            </div>
        </ClientLayout>
    );
};

export default AgencyPage;
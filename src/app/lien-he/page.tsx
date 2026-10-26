import React from "react";
import styles from "@/assets/styles/pages/contact/contact.module.css";
import ClientLayout from "@/infrastructure/common/Layouts/Client-Layout";
import { Metadata } from "next";
import { ROUTE_PATH } from "@/core/common/appRouter";
import { configImageURL } from "@/infrastructure/helper/helper";
import ContactContent from "./content";

type Props = {
    params: { slug: string };
};

const publicURL = process.env.NEXT_PUBLIC_PUBLIC_URL;

// ✅ Fallback data SEO cho trang liên hệ
const FALLBACK_DATA = {
    title: 'Liên hệ POTECHVIETNAM – Hỗ trợ Phụ kiện Ô tô 24/7',
    description: 'Liên hệ POTECHVIETNAM để được tư vấn phụ kiện ô tô chính hãng, báo giá và hỗ trợ bảo hành nhanh chóng. Hotline, email và địa chỉ cửa hàng tại đây.',
    keywords: 'liên hệ POTECHVIETNAM, hotline phụ kiện ô tô, địa chỉ cửa hàng phụ kiện xe hơi, hỗ trợ phụ kiện ô tô, tư vấn phụ kiện xe hơi',
};

// ✅ Metadata SEO đầy đủ cho trang liên hệ
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const contactUrl = `${publicURL}${ROUTE_PATH.CONTACT}`;

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
            url: contactUrl,
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
            canonical: contactUrl,
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

        category: 'Liên hệ',
        authors: [{ name: 'POTECHVIETNAM' }],
    };
}

const ContactPage = async ({ params }: Props) => {
    const contactUrl = `${publicURL}${ROUTE_PATH.CONTACT}`;
    const imageUrl = configImageURL('/uploads/potech-logo.jpg');

    const pageName = FALLBACK_DATA?.title;
    const pageDescription = FALLBACK_DATA?.description;

    // ✅ ContactPage Schema
    const contactPageSchema = {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "@id": contactUrl,
        "url": contactUrl,
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
            "name": "Liên hệ và hỗ trợ phụ kiện ô tô"
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
                "name": "Liên hệ",
                "item": contactUrl
            }
        ]
    };

    // ✅ WebPage
    const webpageSchema = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${contactUrl}#webpage`,
        "url": contactUrl,
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
            "name": "Liên hệ và hỗ trợ phụ kiện ô tô"
        }
    };

    // ✅ Organization + ContactPoint (thông tin liên hệ chi tiết)
    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "POTECHVIETNAM",
        "url": publicURL,
        "logo": imageUrl,
        "contactPoint": [
            {
                "@type": "ContactPoint",
                "telephone": "+84-000-000-000", // TODO: cập nhật hotline thực tế
                "contactType": "customer service",
                "areaServed": "VN",
                "availableLanguage": ["Vietnamese", "English"]
            }
        ],
        "sameAs": []
    };

    return (
        <ClientLayout>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
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
            <ContactContent />
        </ClientLayout >
    );
};

export default ContactPage;
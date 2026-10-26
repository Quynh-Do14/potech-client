import React from "react";
import styles from "@/assets/styles/pages/product/product.module.css"
import ClientLayout from "@/infrastructure/common/Layouts/Client-Layout";
import { Metadata } from "next";
import { ROUTE_PATH } from "@/core/common/appRouter";
import { configImageURL } from "@/infrastructure/helper/helper";
import SearchList from "./content";

type Props = {
    params: { slug: string };
};

const publicURL = process.env.NEXT_PUBLIC_PUBLIC_URL;

// ✅ Fallback data SEO cho trang tìm kiếm sản phẩm
const FALLBACK_DATA = {
    title: 'Tìm kiếm sản phẩm – Phụ kiện ô tô chính hãng | POTECHVIETNAM',
    description: 'Tìm kiếm phụ kiện ô tô chính hãng tại POTECHVIETNAM. Tra cứu nhanh theo tên, loại xe hoặc danh mục, giá tốt, bảo hành uy tín.',
    keywords: 'tìm kiếm phụ kiện ô tô, tra cứu phụ kiện xe hơi, tìm sản phẩm phụ kiện ô tô, POTECHVIETNAM',
};

// ✅ Metadata SEO đầy đủ cho trang tìm kiếm
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const searchUrl = `${publicURL}${ROUTE_PATH.SEARCH}`;

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
            url: searchUrl,
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
            canonical: searchUrl,
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

        category: 'Tìm kiếm sản phẩm',
        authors: [{ name: 'POTECHVIETNAM' }],
    };
}

// Component SearchPage - Trang tìm kiếm sản phẩm
const SearchPage = async ({ params }: Props) => {
    const searchUrl = `${publicURL}${ROUTE_PATH.SEARCH}`;
    const imageUrl = configImageURL('/uploads/potech-logo.jpg');

    const pageName = FALLBACK_DATA?.title;
    const pageDescription = FALLBACK_DATA?.description;

    // ✅ CollectionPage (trang danh mục sản phẩm)
    const collectionPageSchema = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "@id": searchUrl,
        "url": searchUrl,
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
            "name": "Tìm kiếm phụ kiện ô tô"
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
                "name": "Tìm kiếm",
                "item": searchUrl
            }
        ]
    };

    // ✅ WebPage
    const webpageSchema = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${searchUrl}#webpage`,
        "url": searchUrl,
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
            "name": "Tìm kiếm phụ kiện ô tô"
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
                <SearchList />
            </div>
        </ClientLayout>
    );
};

export default SearchPage;
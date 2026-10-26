import React from "react";
import styles from "@/assets/styles/pages/blog/blog.module.css";
import ClientLayout from "@/infrastructure/common/Layouts/Client-Layout";
import { Metadata } from "next";
import { ROUTE_PATH } from "@/core/common/appRouter";
import { configImageURL } from "@/infrastructure/helper/helper";
import BlogList from "./components/blog-list";

type Props = {
    params: { slug: string };
};

const baseURL = process.env.NEXT_PUBLIC_API_URL;
const publicURL = process.env.NEXT_PUBLIC_PUBLIC_URL;

// Định nghĩa fallback data cho trang tin tức
const FALLBACK_DATA = {
    title: 'Tin tức POTECHVIETNAM',
    description: 'Tin tức POTECHVIETNAM - Cập nhật tin tức, bài viết, kiến thức về phụ kiện ô tô tại POTECHVIETNAM',
    keywords: 'tin tức POTECHVIETNAM, blog POTECHVIETNAM, kiến thức phụ kiện ô tô, POTECHVIETNAM, phụ kiện xe hơi, kinh nghiệm ô tô',
};
// ✅ Metadata SEO đầy đủ cho trang danh sách tin tức
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const blogUrl = `${publicURL}${ROUTE_PATH.BLOG}`;

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
            url: blogUrl,
            siteName: 'Tin tức POTECHVIETNAM',
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
            canonical: blogUrl,
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

        category: 'Tin tức POTECHVIETNAM',
        authors: [{ name: 'POTECHVIETNAM' }],
    };
}

// Component BlogPage - Trang danh sách tin tức / blog
const BlogPage = async ({ params }: Props) => {
    const blogUrl = `${publicURL}${ROUTE_PATH.BLOG}`;
    const imageUrl = configImageURL('/uploads/potech-logo.jpg');

    const blogName = FALLBACK_DATA?.title;
    const blogDescription = FALLBACK_DATA?.description

    // ✅ CollectionPage (trang danh mục tin tức)
    const collectionPageSchema = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "@id": blogUrl,
        "url": blogUrl,
        "name": blogName,
        "description": blogDescription,
        "isPartOf": {
            "@type": "WebSite",
            "@id": `${publicURL}/#website`,
            "url": publicURL,
            "name": "Tin tức POTECHVIETNAM"
        },
        "primaryImageOfPage": {
            "@type": "ImageObject",
            "url": imageUrl,
            "caption": blogName,
            "width": "1200",
            "height": "630"
        },
        "about": {
            "@type": "Thing",
            "name": "Tin tức phụ kiện ô tô"
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
                "name": "Tin tức",
                "item": blogUrl
            }
        ]
    };

    // ✅ WebPage
    const webpageSchema = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${blogUrl}#webpage`,
        "url": blogUrl,
        "name": blogName,
        "description": blogDescription,
        "isPartOf": {
            "@type": "WebSite",
            "@id": `${publicURL}/#website`,
            "url": publicURL,
            "name": "Tin tức POTECHVIETNAM"
        },
        "primaryImageOfPage": {
            "@type": "ImageObject",
            "url": imageUrl,
            "caption": blogName,
            "width": "1200",
            "height": "630"
        },
        "about": {
            "@type": "Thing",
            "name": "Tin tức phụ kiện ô tô"
        }
    };

    // ✅ Organization (thương hiệu) - bổ sung cho SEO
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
                <BlogList />
            </div>
        </ClientLayout>
    );
};

export default BlogPage;
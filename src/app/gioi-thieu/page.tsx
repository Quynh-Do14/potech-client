import { ROUTE_PATH } from '@/core/common/appRouter'
import BreadcrumbCommon from '@/infrastructure/common/Layouts/Breadcumb'
import ClientLayout from '@/infrastructure/common/Layouts/Client-Layout'
import React from 'react'
import styles from '@/assets/styles/pages/introduce.module.css'
import TocClient from './tocClient'
import BannerCommon from '@/infrastructure/common/banner/BannerCommon'
import { Metadata } from 'next'
import { configImageURL } from '@/infrastructure/helper/helper'
import { Endpoint } from '@/core/common/apiLink'
import { ContentPageInterface } from '@/infrastructure/interface/contentPage/contentPage.interface'
const baseURL = process.env.NEXT_PUBLIC_API_URL;
const publicURL = process.env.NEXT_PUBLIC_PUBLIC_URL;
const introduceUrl = `${publicURL}${ROUTE_PATH.INTRODUCE}`;

const keywords = [
    "CÔNG TY TNHH TM XNK NỘI THẤT Ô TÔ QUANG MINH",
    "Công ty TNHH Thương Mại Xuất nhập khẩu Nội thất ô tô Quang Minh",
    "Potech Việt Nam",
    "potechvietnam",
    "màn hình android box Potech",
    "android box Potech",
    "màn hình ô tô & Android Box Potech",
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
            "name": "Giới thiệu",
            "item": introduceUrl
        },
    ]
};

const aboutPageSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": introduceUrl,
    "url": introduceUrl,
    "name": "Giới thiệu - Màn hình ô tô & Android Box Potech Chính Hãng - Bảo Hành 10 Năm",
    "description": "Màn hình ô tô & Android Box Potech chính hãng thuộc hệ sinh thái Quang Minh. Phần cứng độc quyền, tích hợp AI thông minh, bảo hành lên đến 10 năm. Nâng cấp giải trí và an toàn cho xe hơi.",
    "mainEntity": {
        "@type": "Organization",
        "name": "Công ty TNHH Thương Mại XNK Nội Thất Ô Tô Quang Minh",
        "description": "Nhà nhập khẩu và phân phối chính hãng Màn hình ô tô & Android Box Potech tại Việt Nam",
        "foundingDate": "2017-04-12",
        "foundingLocation": "Hà Nội, Việt Nam",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Số 12 Ngõ 44 Tư Đình – Tổ 5 – Phường Long Biên",
            "addressLocality": "Hà Nội",
            "addressCountry": "VN"
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "02462926666",
            "contactType": "customer service"
        }
    },
    "primaryImageOfPage": {
        "@type": "ImageObject",
        "url": configImageURL('/uploads/potech-logo.jpg'),
        "caption": "Màn hình ô tô & Android Box Potech"
    },
    "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbSchema.itemListElement
    },
    "significantLinks": [
        `${publicURL}${ROUTE_PATH.PRODUCT}`,
        `${publicURL}${ROUTE_PATH.BLOG}`
    ]
};

const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${publicURL}#organization`,
    "name": "Công ty TNHH Thương Mại XNK Nội Thất Ô Tô Quang Minh",
    "alternateName": "Potech Việt Nam",
    "url": publicURL,
    "logo": configImageURL('/uploads/potech-logo.jpg'),
    "description": "Nhà nhập khẩu và phân phối chính hãng màn hình ô tô & Android Box Potech tại Việt Nam",
    "sameAs": [
        "https://www.facebook.com/potech.vietnam",
    ],
    "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "02462926666",
        "contactType": "customer service",
        "areaServed": "VN",
        "availableLanguage": "Vietnamese"
    }
};

const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${publicURL}#website`,
    "url": publicURL,
    "name": "Màn hình ô tô & Android Box Potech",
    "description": "Màn hình ô tô & Android Box Potech chính hãng - Công ty Quang Minh",
    "publisher": {
        "@type": "Organization",
        "name": "Công ty TNHH Thương Mại XNK Nội Thất Ô Tô Quang Minh",
        "logo": configImageURL('/uploads/potech-logo.jpg')
    }
};

export const metadata: Metadata = {
    title: "Giới thiệu - Màn hình ô tô & Android Box Potech Chính Hãng - Bảo Hành 10 Năm",
    description: "Màn hình ô tô & Android Box Potech chính hãng thuộc hệ sinh thái Quang Minh. Phần cứng độc quyền, tích hợp AI thông minh, bảo hành lên đến 10 năm. Nâng cấp giải trí và an toàn cho xe hơi.",
    keywords: keywords.join(", "),
    authors: [{ name: "Công ty TNHH Thương Mại XNK Nội Thất Ô Tô Quang Minh" }],

    openGraph: {
        type: "website",
        url: `${publicURL}/${ROUTE_PATH.INTRODUCE}`,  // ✅ Sửa URL cụ thể cho trang
        title: "Giới thiệu - Màn hình ô tô & Android Box Potech Chính Hãng - Bảo Hành 10 Năm",
        description: "Potech - Màn hình ô tô & Android Box Potech chính hãng thuộc hệ sinh thái Quang Minh. Phần cứng độc quyền, tích hợp AI thông minh, bảo hành lên đến 10 năm. Nâng cấp giải trí và an toàn cho xe hơi.",
        images: [
            {
                url: configImageURL('/uploads/potech-logo.jpg'),
                alt: "Màn hình ô tô & Android Box Potech",
            },
        ],
        siteName: "Màn hình ô tô & Android Box Potech",
    },

    twitter: {
        card: "summary_large_image",
        title: "Giới thiệu - Màn hình ô tô & Android Box Potech Chính Hãng - Bảo Hành 10 Năm",
        description: "Potech - Màn hình ô tô & Android Box Potech chính hãng thuộc hệ sinh thái Quang Minh. Phần cứng độc quyền, tích hợp AI thông minh, bảo hành lên đến 10 năm. Nâng cấp giải trí và an toàn cho xe hơi.",
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
        canonical: `${publicURL}/${ROUTE_PATH.INTRODUCE}`,
    },

    other: {
        'application/ld+json': JSON.stringify([
            aboutPageSchema,      // ✅ AboutPage schema
            organizationSchema,   // ✅ Organization schema
            websiteSchema,        // ✅ Website schema
            breadcrumbSchema      // ✅ Breadcrumb schema
        ]),
        'og:image:alt': 'Màn hình ô tô & Android Box Potech Chính Hãng - Bảo Hành 10 Năm',
        'twitter:image:alt': 'Màn hình ô tô & Android Box Potech Chính Hãng - Bảo Hành 10 Năm',
        'og:locale': 'vi_VN',
        'business:contact_data:street': 'Số 12 Ngõ 44 Tư Đình – Tổ 5 – Phường Long Biên – Thành phố Hà Nội',
        'business:contact_data:locality': 'Hà Nội',
        'business:contact_data:country': 'VN',
        'business:contact_data:phone': '02462926666',
    }
};

const IntroducePage = async () => {
    const config = await fetch(`${baseURL}${Endpoint.ContentPage.Get}?type=INTRODUCE`, {
        cache: 'no-store', // Tắt cache
    }).then((res) => res.json());
    const contentPage: ContentPageInterface[] = config.data
    const content = contentPage[0].content ? contentPage[0].content : ""

    let tocItems: { id: string; text: any; level: number; }[] = [];
    let tocItemsLength: { id: string; text: any; level: number; }[] = [];

    var initialLength = 0
    const headings = String(content).match(/<(h[2-3])[^>]*>(.*?)<\/\1>/g);
    if (headings) {
        const items = headings.map((heading, index) => {
            const level = heading.match(/h([2-3])/)?.[1] ?? '2';
            const text = heading.replace(/<\/?h[2-3][^>]*>/g, '');
            const id = `heading-${index}`;
            return { id, text, level: parseInt(level) };
        });
        initialLength = items.length
        tocItems = items;
    }

    const updatedContent = String(content).replace(/<(h[2-3])[^>]*>(.*?)<\/\1>/g, (_match: any, tag: string[], text: any, _index: any) => {
        const id = `heading-${tocItems.length}`;

        tocItems.push({ id, text, level: parseInt(tag[1]) });
        tocItemsLength = tocItems.filter((_it, index) => index >= initialLength)
        return `<${tag} id="${id}">${text}</${tag}>`;
    });
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(aboutPageSchema)
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(organizationSchema)
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(websiteSchema)
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(websiteSchema)
                }}
            />

            <ClientLayout>
                <BannerCommon
                    type={'INTRODUCE'}
                />
                <div className={`${styles.introduceContainer} padding-common`}>
                    <BreadcrumbCommon
                        breadcrumb={"Giới thiệu"}
                        redirect={ROUTE_PATH.INTRODUCE}
                        title={'CÔNG TY TNHH THƯƠNG MẠI XNK NỘI THẤT Ô TÔ QUANG MINH'}
                        blackColor={true}
                    />
                    <TocClient tocItems={tocItemsLength} />
                    <div className="tiny-style">
                        <article
                            className="prose max-w-none"
                            dangerouslySetInnerHTML={{ __html: updatedContent }}
                        />
                    </div>
                </div>
            </ClientLayout>
        </>
    )
}

export default IntroducePage
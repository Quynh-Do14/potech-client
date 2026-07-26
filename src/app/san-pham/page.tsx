import React from "react";
import styles from "@/assets/styles/pages/product/product.module.css";
import ClientLayout from "@/infrastructure/common/Layouts/Client-Layout";
import ProductList from "./components/product-list";
import { Metadata } from "next";
import { ROUTE_PATH } from "@/core/common/appRouter";
import { Endpoint } from "@/core/common/apiLink";
import { SEOProductInterface } from "@/infrastructure/interface/seo-product/seoProduct.interface";
import { configImageURL } from "@/infrastructure/helper/helper";

type Props = {
    params: { slug: string };
};

const baseURL = process.env.NEXT_PUBLIC_API_URL;
const publicURL = process.env.NEXT_PUBLIC_PUBLIC_URL;

// Cache product data để tái sử dụng
let cachedProduct: SEOProductInterface | null = null;

async function getProduct(slug: string): Promise<SEOProductInterface> {
    const response = await fetch(`${baseURL}${Endpoint.SEOProduct.GetBySlug}/${slug}`, {
        cache: 'no-store', // Tắt cache
    });
    if (!response.ok) {
        throw new Error('Failed to fetch product');
    }

    const data = await response.json();
    cachedProduct = data;
    return data;
}

// ✅ Metadata tối ưu
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const product = await getProduct("san-pham");
    const productUrl = `${publicURL}${ROUTE_PATH.PRODUCT}`;

    const description = "Sản phẩm POTECHVIETNAM chính hãng"

    // const keywords = [
    //     `Sản phẩm POTECHVIETNAM`,
    //     product.category_name,
    //     product.brand_name,
    //     ...(product.keyword?.map(item => item.keyword) || [])
    // ].filter(Boolean).join(', ');

    return {
        title: `Sản phẩm POTECHVIETNAM`,
        description: description,
        keywords: `Sản phẩm POTECHVIETNAM`,

        openGraph: {
            title: `Sản phẩm POTECHVIETNAM`,
            description: description,
            images: [
                {
                    url: configImageURL('/uploads/potech-logo.jpg'),
                    width: 1200,
                    height: 630,
                    alt: `Sản phẩm POTECHVIETNAM`,
                }
            ],
            type: 'website',
            url: productUrl,
            siteName: `Sản phẩm POTECHVIETNAM`,
            locale: 'vi_VN',
        },

        twitter: {
            card: 'summary_large_image',
            title: `${`Sản phẩm POTECHVIETNAM`}`,
            description: `Sản phẩm POTECHVIETNAM`,
            images: [
                {
                    url: configImageURL('/uploads/potech-logo.jpg'),
                    alt: `Sản phẩm POTECHVIETNAM`,
                }
            ],
        },

        alternates: {
            canonical: productUrl,
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

        category: 'Sản phẩm của POTECHVIETNAM',

        // Thêm author nếu có
        authors: [{ name: 'POTECHVIETNAM' }],
    };
}

// Component ProductPage với Schema.org và Article schema
const ProductPage = async ({ params }: Props) => {
    const dataDetail = await getProduct("san-pham");
    const productUrl = `${publicURL}${ROUTE_PATH.PRODUCT}`;

    const imageUrl = configImageURL('/uploads/potech-logo.jpg');

    // ✅ Schema Product - chi tiết hơn
    const productSchema = {
        "@context": "https://schema.org",
        "@type": "Product",
        "@id": productUrl,
        "url": productUrl,
        "name": dataDetail.title,
        "description": dataDetail.content?.slice(0, 200) || dataDetail.title,
        "image": imageUrl,
        "sku": params.slug,
        "brand": {
            "@type": "Brand",
            "name": "POTECHVIETNAM"
        },
        "category": "Sản phẩm của POTECHVIETNAM",
        "offers": {
            "@type": "Offer",
            "url": productUrl,
            "priceCurrency": "VND",
            "priceValidUntil": new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            "itemCondition": "https://schema.org/NewCondition",
            "seller": {
                "@type": "Organization",
                "name": "Công ty TNHH Thương Mại XNK Nội Thất Ô Tô Quang Minh"
            }
        },

    };

    // ✅ Schema Breadcrumb
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
                "name": "Sản phẩm",
                "item": `${publicURL}${ROUTE_PATH.PRODUCT}`
            },
        ]
    };

    // ✅ Schema WebPage
    const webpageSchema = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": productUrl,
        "url": productUrl,
        "name": dataDetail.title,
        "description": dataDetail.content?.slice(0, 200) || dataDetail.title,
        "isPartOf": {
            "@type": "WebSite",
            "@id": `${publicURL}/#website`,
            "url": publicURL,
            "name": "Sản phẩm của POTECHVIETNAM"
        },
        "primaryImageOfPage": {
            "@type": "ImageObject",
            "url": imageUrl,
            "caption": dataDetail.title,
            "width": "1200",
            "height": "630"
        },
        "about": {
            "@type": "Thing",
            "name": "Phụ kiện ô tô"
        }
    };

    // ✅ Schema Article - quan trọng cho bài viết giới thiệu sản phẩm
    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "@id": `${productUrl}#article`,
        "url": productUrl,
        "headline": `${dataDetail.title}`,
        "description": dataDetail.content?.slice(0, 200) || dataDetail.title,
        "image": imageUrl,
        "author": {
            "@type": "Organization",
            "name": "POTECHVIETNAM"
        },
        "publisher": {
            "@type": "Organization",
            "name": dataDetail.title,
            "logo": {
                "@type": "ImageObject",
                "url": configImageURL('/uploads/potech-logo.jpg')
            }
        },
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": productUrl
        },
        "articleBody": dataDetail.title,
        "keywords": dataDetail.title
    };

    return (
        <ClientLayout>
            {/* JSON-LD Schemas */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
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
                dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
            />

            <div className={styles.productSection}>
                <ProductList />
                {
                    dataDetail?.content &&
                    <div className="bg-white">
                        <div className={`padding-common`}>
                            <div className="tiny-style">
                                <article
                                    className="prose max-w-none"
                                    dangerouslySetInnerHTML={{ __html: dataDetail.content }}
                                />
                            </div>
                        </div>
                    </div>
                }
            </div>
        </ClientLayout>
    );
};

export default ProductPage;
import React from "react";
import styles from "@/assets/styles/pages/product/product.module.css";
import ClientLayout from "@/infrastructure/common/Layouts/Client-Layout";
import ProductList from "./components/product-list";
import { Metadata } from "next";
import { ROUTE_PATH } from "@/core/common/appRouter";
import { Endpoint } from "@/core/common/apiLink";
import { SEOProductInterface } from "@/infrastructure/interface/seo-product/seoProduct.interface";
import { configImageURL } from "@/infrastructure/helper/helper";
import { notFound } from "next/navigation";

type Props = {
    params: { slug: string };
};

const baseURL = process.env.NEXT_PUBLIC_API_URL;
const publicURL = process.env.NEXT_PUBLIC_PUBLIC_URL;

// Định nghĩa fallback data
const FALLBACK_DATA = {
    title: 'Sản phẩm',
    content: 'Nội dung đang được cập nhật',
    description: 'Sản phẩm của POTECHVIETNAM - Phụ kiện ô tô chính hãng',
    slug: '',
};

// Cache product data để tái sử dụng
let cachedProduct: SEOProductInterface | null = null;

async function getProduct(slug: string): Promise<SEOProductInterface | null> {
    try {
        const response = await fetch(`${baseURL}${Endpoint.SEOProduct.GetBySlug}/${slug}`, {
            cache: 'no-store',
        });

        if (!response.ok) {
            return null;
        }

        const data = await response.json();

        // Kiểm tra dữ liệu có hợp lệ không
        if (!data || !data.title) {
            return null;
        }

        cachedProduct = data;
        return data;
    } catch (error) {
        console.error('Error fetching product:', error);
        return null;
    }
}

// Hàm tạo meta description fallback
function generateDescription(product: SEOProductInterface | null): string {
    if (!product) {
        return 'Sản phẩm phụ kiện ô tô chất lượng cao tại POTECHVIETNAM';
    }

    if (product.content) {
        // Loại bỏ HTML tags và lấy text thuần
        const plainText = product.content.replace(/<[^>]*>/g, '');
        const truncated = plainText.length > 160
            ? plainText.slice(0, 160) + '...'
            : plainText;
        return `${product.title} - ${truncated}`;
    }

    return `${product.title} - Sản phẩm phụ kiện ô tô chất lượng cao tại POTECHVIETNAM`;
}

// ✅ Metadata với fallback
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const product = await getProduct(params.slug);
    const productUrl = `${publicURL}${ROUTE_PATH.PRODUCT}`;

    // Nếu không có sản phẩm, trả về metadata mặc định
    if (!product) {
        return {
            title: 'Sản phẩm | POTECHVIETNAM - Phụ kiện ô tô chính hãng',
            description: 'Sản phẩm phụ kiện ô tô chất lượng cao tại POTECHVIETNAM',
            robots: {
                index: true,
                follow: true,
            },
            alternates: {
                canonical: productUrl,
            },
        };
    }

    const description = generateDescription(product);
    // const keywords = generateKeywords(product);

    return {
        title: `${product.title}`,
        description: description,
        keywords: product.title,

        openGraph: {
            title: `${product.title}`,
            description: description,
            images: [
                {
                    url: configImageURL('/uploads/potech-logo.jpg'),
                    width: 1200,
                    height: 630,
                    alt: product.title || 'Sản phẩm POTECHVIETNAM',
                }
            ],
            type: 'website',
            url: productUrl,
            siteName: 'POTECHVIETNAM - Phụ kiện ô tô',
            locale: 'vi_VN',
        },

        twitter: {
            card: 'summary_large_image',
            title: `${product.title}`,
            description: description,
            images: [
                {
                    url: configImageURL('/uploads/potech-logo.jpg'),
                    alt: product.title || 'Sản phẩm POTECHVIETNAM',
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

        category: product.title,
        authors: [{ name: 'POTECHVIETNAM' }],
    };
}

// Component ProductPage
const ProductPage = async ({ params }: Props) => {
    const dataDetail = await getProduct(params.slug);
    const productUrl = `${publicURL}${ROUTE_PATH.PRODUCT}`;

    const imageUrl = configImageURL('/uploads/POTECHVIETNAM-logo.png');

    const productName = dataDetail?.title || FALLBACK_DATA.title;
    const productContent = dataDetail?.content || FALLBACK_DATA.content;
    const productDescription = dataDetail?.content
        ? dataDetail.content.replace(/<[^>]*>/g, '').slice(0, 200)
        : FALLBACK_DATA.description;

    // ✅ Schema Product
    const productSchema = {
        "@context": "https://schema.org",
        "@type": "Product",
        "@id": productUrl,
        "url": productUrl,
        "name": productName,
        "description": productDescription,
        "image": imageUrl,
        "sku": params.slug,
        "brand": {
            "@type": "Brand",
            "name": "POTECHVIETNAM"
        },
        "category": dataDetail?.title || "Phụ kiện ô tô",
        "offers": {
            "@type": "Offer",
            "url": productUrl,
            "priceCurrency": "VND",
            // "price": dataDetail.price.toString(),
            "priceValidUntil": new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            "itemCondition": "https://schema.org/NewCondition",
            "availability": "https://schema.org/InStock",
            "seller": {
                "@type": "Organization",
                "name": "Công ty TNHH Thương Mại XNK Nội Thất Ô Tô Quang Minh"
            }
        }
    };

    // ✅ Schema Breadcrumb - có fallback
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
            ...(dataDetail?.title ? [{
                "@type": "ListItem",
                "position": 3,
                "name": dataDetail.title || "Danh mục",
                "item": `${publicURL}${ROUTE_PATH.CATEGORY}/${dataDetail.slug}`
            }] : []),
            {
                "@type": "ListItem",
                "position": dataDetail?.slug ? 4 : 3,
                "name": productName,
                "item": productUrl
            }
        ]
    };

    // ✅ Schema WebPage
    const webpageSchema = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": productUrl,
        "url": productUrl,
        "name": productName,
        "description": productDescription,
        "isPartOf": {
            "@type": "WebSite",
            "@id": `${publicURL}/#website`,
            "url": publicURL,
            "name": "POTECHVIETNAM - Phụ kiện ô tô"
        },
        "primaryImageOfPage": {
            "@type": "ImageObject",
            "url": imageUrl,
            "caption": productName,
            "width": "1200",
            "height": "630"
        },
        "about": {
            "@type": "Thing",
            "name": dataDetail?.title || "Phụ kiện ô tô"
        }
    };

    // ✅ Schema Article - giữ nguyên nhưng không hiển thị UI
    const articleSchema = dataDetail?.content ? {
        "@context": "https://schema.org",
        "@type": "Article",
        "@id": `${productUrl}#article`,
        "url": productUrl,
        "headline": `${productName}`,
        "description": productDescription,
        "image": imageUrl,
        "author": {
            "@type": "Organization",
            "name": "POTECHVIETNAM"
        },
        "publisher": {
            "@type": "Organization",
            "name": "POTECHVIETNAM - Phụ kiện ô tô",
            "logo": {
                "@type": "ImageObject",
                "url": configImageURL('/uploads/POTECHVIETNAM-logo.png')
            }
        },
        "datePublished": dataDetail.created_at || new Date().toISOString(),
        "dateModified": dataDetail.updated_at || new Date().toISOString(),
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": productUrl
        },
        "articleBody": dataDetail.content || productName,
        "keywords": dataDetail.title
    } : null;

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
            {articleSchema && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
                />
            )}

            <div className={styles.productSection}>
                <ProductList title={dataDetail?.title} />
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
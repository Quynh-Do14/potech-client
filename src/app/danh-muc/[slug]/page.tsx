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

// Định nghĩa fallback data
const FALLBACK_DATA = {
    title: 'Sản phẩm POTECHVIETNAM',
    content: 'Sản phẩm công nghệ chất lượng cao tại POTECHVIETNAM',
    description: 'Sản phẩm POTECHVIETNAM - Công nghệ chính hãng, chất lượng cao, giá tốt nhất thị trường',
    slug: 'san-pham',
};

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

// Hàm tạo meta description
function generateDescription(product: SEOProductInterface | null): string {
    if (!product) {
        return 'Sản phẩm POTECHVIETNAM - Công nghệ chính hãng, chất lượng cao, giá tốt nhất thị trường';
    }

    // Tạo description từ content
    if (product.content) {
        // Loại bỏ HTML tags và lấy text thuần
        const plainText = product.content.replace(/<[^>]*>/g, '');
        const truncated = plainText.length > 160
            ? plainText.slice(0, 160) + '...'
            : plainText;
        return `${product.title} - ${truncated}`;
    }

    // Tạo description từ các thuộc tính
    const parts = [];
    if (product.title) parts.push(product.title);

    return `${parts.join(' - ')} - Sản phẩm công nghệ chất lượng cao tại POTECHVIETNAM`;
}

// Hàm tạo keywords
function generateKeywords(product: SEOProductInterface | null): string {
    if (!product) {
        return 'Sản phẩm POTECHVIETNAM, công nghệ, POTECHVIETNAM, thiết bị công nghệ, giải pháp công nghệ, sản phẩm chính hãng';
    }

    const keywords = new Set<string>();

    // Thêm title
    if (product.title) keywords.add(product.title);

    // Thêm từ khóa từ API
    if (product.keyword && Array.isArray(product.keyword)) {
        product.keyword.forEach(item => {
            if (item.keyword) keywords.add(item.keyword);
        });
    }

    // Thêm từ khóa mở rộng
    if (product.title) {
        // Tách từ khóa từ title
        const titleWords = product.title.split(' ');
        titleWords.forEach(word => {
            if (word.length > 2) keywords.add(word);
        });
    }

    // Thêm từ khóa mặc định nếu chưa đủ
    if (keywords.size < 5) {
        keywords.add('Sản phẩm POTECHVIETNAM');
        keywords.add('công nghệ');
        keywords.add('POTECHVIETNAM');
        keywords.add('thiết bị công nghệ');
        keywords.add('giải pháp công nghệ');
        keywords.add('sản phẩm chính hãng');
    }

    return Array.from(keywords).join(', ');
}

// ✅ Metadata với fallback và SEO đầy đủ
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const product = await getProduct("san-pham");
    const productUrl = `${publicURL}${ROUTE_PATH.PRODUCT}`;

    // Nếu không có sản phẩm, trả về metadata mặc định
    if (!product) {
        return {
            title: 'Sản phẩm POTECHVIETNAM | Công nghệ chính hãng',
            description: 'Sản phẩm POTECHVIETNAM - Công nghệ chính hãng, chất lượng cao, giá tốt nhất thị trường',
            keywords: 'Sản phẩm POTECHVIETNAM, công nghệ, POTECHVIETNAM, thiết bị công nghệ, giải pháp công nghệ',
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
    const keywords = generateKeywords(product);

    return {
        title: `${product.title} | POTECHVIETNAM - Công nghệ chính hãng`,
        description: description,
        keywords: keywords,

        openGraph: {
            title: `${product.title} | POTECHVIETNAM - Công nghệ chính hãng`,
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
            siteName: 'POTECHVIETNAM - Công nghệ',
            locale: 'vi_VN',
        },

        twitter: {
            card: 'summary_large_image',
            title: `${product.title} | POTECHVIETNAM - Công nghệ chính hãng`,
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

        category: 'Công nghệ',
        authors: [{ name: 'POTECHVIETNAM' }],
    };
}

// Component ProductPage với Schema.org và Article schema
const ProductPage = async ({ params }: Props) => {
    const dataDetail = await getProduct("san-pham");
    const productUrl = `${publicURL}${ROUTE_PATH.PRODUCT}`;

    // Nếu không có dữ liệu, hiển thị fallback
    if (!dataDetail) {
        return (
            <ClientLayout>
                <div className={styles.productSection}>
                    <div className="container mx-auto px-4 py-12">
                        <div className="text-center">
                            <h1 className="text-2xl font-bold mb-4">Sản phẩm POTECHVIETNAM</h1>
                            <p className="text-gray-600">Sản phẩm công nghệ chất lượng cao tại POTECHVIETNAM</p>
                        </div>
                    </div>
                </div>
            </ClientLayout>
        );
    }

    const imageUrl = configImageURL('/uploads/potech-logo.jpg');

    const productName = dataDetail.title || FALLBACK_DATA.title;
    const productDescription = dataDetail.content
        ? dataDetail.content.replace(/<[^>]*>/g, '').slice(0, 200)
        : FALLBACK_DATA.description;

    // ✅ Schema Product - chi tiết hơn
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
        "category": "Công nghệ",
        "offers": {
            "@type": "Offer",
            "url": productUrl,
            "priceCurrency": "VND",
            "priceValidUntil": new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            "itemCondition": "https://schema.org/NewCondition",
            "availability": "https://schema.org/InStock",
            "seller": {
                "@type": "Organization",
                "name": "Công ty TNHH Thương Mại XNK Nội Thất Ô Tô Quang Minh"
            }
        },
    };

    // ✅ Schema Breadcrumb - chi tiết hơn
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
            {
                "@type": "ListItem",
                "position": 3,
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
            "name": "POTECHVIETNAM - Công nghệ"
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
            "name": "Công nghệ"
        }
    };

    // ✅ Schema Article - chỉ hiển thị khi có content
    const articleSchema = dataDetail.content ? {
        "@context": "https://schema.org",
        "@type": "Article",
        "@id": `${productUrl}#article`,
        "url": productUrl,
        "headline": `Bài viết giới thiệu ${productName}`,
        "description": productDescription,
        "image": imageUrl,
        "author": {
            "@type": "Organization",
            "name": "POTECHVIETNAM"
        },
        "publisher": {
            "@type": "Organization",
            "name": "POTECHVIETNAM - Công nghệ",
            "logo": {
                "@type": "ImageObject",
                "url": configImageURL('/uploads/potech-logo.jpg')
            }
        },
        "datePublished": dataDetail.created_at || new Date().toISOString(),
        "dateModified": dataDetail.updated_at || new Date().toISOString(),
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": productUrl
        },
        "articleBody": dataDetail.content || productName,
        "keywords": dataDetail.keyword?.map(item => item.keyword).join(', ') || productName
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
                <ProductList title={dataDetail.title} />
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
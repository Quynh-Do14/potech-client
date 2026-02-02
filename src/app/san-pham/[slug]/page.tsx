import { ROUTE_PATH } from '@/core/common/appRouter';
import BreadcrumbCommon from '@/infrastructure/common/Layouts/Breadcumb';
import ClientLayout from '@/infrastructure/common/Layouts/Client-Layout';
import styles from '@/assets/styles/pages/product/slugProduct.module.css'
import { configImageURL, formatCurrency, splitTakeId } from '@/infrastructure/helper/helper';
import { Metadata } from 'next';
import GalleryComponent from './components/gallery';
import { Endpoint } from '@/core/common/apiLink';
import ProductAdvantageComponent from './components/advantage';
import RelationProductComponent from './components/relationProduct';
import { ProductInterface } from '@/infrastructure/interface/product/product.interface';
import BlogInProductSlug from './components/blogRandom';
import dynamic from 'next/dynamic';
import { PageLoading } from '@/infrastructure/common/loading/loadingPage';

type Props = {
    params: { slug: string };
};
const baseURL = process.env.NEXT_PUBLIC_API_URL;
const publicURL = process.env.NEXT_PUBLIC_PUBLIC_URL;
export async function generateMetadata
    ({ params }: Props): Promise<Metadata> {
    const product: ProductInterface = await fetch(`${baseURL}${Endpoint.Product.GetById}/${splitTakeId(params.slug)}`, {
        cache: 'no-store', // Tắt cache
    }).then((res) => res.json());
    const productUrl = `${publicURL}/${ROUTE_PATH.PRODUCT}/${params.slug}`;

    const productSchema = {
        "@context": "https://schema.org",
        "@type": "Product",
        "@id": productUrl,    // ✅ Nhất quán
        "url": productUrl,    // ✅ Nhất quán
        "name": product.name,
        "description": product.short_description || product.description,
        "image": configImageURL(product.image),
        "offers": {
            "@type": "Offer",
            "url": productUrl, // ✅ Nhất quán
            "priceCurrency": "VND",
            "price": product.price?.toString(),
            "priceValidUntil": new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            // ❓ "availability": "https://schema.org/InStock", // Xem phần 2
            // ❓ "itemCondition": "https://schema.org/NewCondition" // Xem phần 3
        },
    };

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
                "item": `${publicURL}/${ROUTE_PATH.PRODUCT}` // ✅ Nhất quán
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": product.name,
                "item": productUrl // ✅ Nhất quán
            }
        ]
    };

    return {
        title: product.name,
        description: product.short_description,
        openGraph: {
            title: product.name,
            description: product.short_description,
            images: configImageURL(product.image),
        },
        other: {
            'application/ld+json': JSON.stringify([productSchema, breadcrumbSchema])
        }
    };
}

const ProductSlugContent = async ({ params }: Props) => {
    const dataDetail: ProductInterface = await fetch(`${baseURL}${Endpoint.Product.GetById}/${splitTakeId(params.slug)}`, {
        cache: 'no-store', // Tắt cache
    }).then((res) =>
        res.json()
    );
    const features = [
        "Ra lệnh giọng nói thông minh với trợ lý Kiki",
        "Tích hợp camera 360",
        "Cài đặt 5 màu sắc xe cơ bản",
        "Cài đặt được biển số xe",
        "Màn hình kích thước lớn, độ phân giải cao",
        "Tích hợp nhiều bản đồ lựa chọn"
    ];
    return (
        <ClientLayout>
            <div className={styles.productContainer}>
                <div className={`${styles.productContent} padding-common`} >
                    <BreadcrumbCommon
                        breadcrumb={"Sản phẩm"}
                        redirect={ROUTE_PATH.PRODUCT}
                        title={dataDetail.name}
                        blackColor={true}
                    />
                    <div className={`${styles.content}`}>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                            {/* Column 1: Gallery */}
                            <div className="w-full">
                                <GalleryComponent slides={dataDetail.images} />
                            </div>

                            {/* Column 2: Product Info */}
                            <div className={styles.productInfo}>
                                <h1>{dataDetail.name}</h1>
                                <div className="space-y-4">
                                    {/* Giá sản phẩm */}
                                    <div className="flex items-center gap-2">
                                        <span className="text-2xl font-bold text-red-600">
                                            {formatCurrency(Number(dataDetail.price))}đ
                                        </span>
                                        {Number(dataDetail.price_sale) ? (
                                            <span className="text-lg text-gray-500 line-through">
                                                {formatCurrency(Number(dataDetail.price_sale))}đ
                                            </span>
                                        ) : null}
                                    </div>
                                </div>
                                <div className="flex">
                                    <div className={styles.categoryTag}>
                                        {dataDetail.category_name}
                                    </div>
                                </div>

                                <ul className={styles.featureList}>
                                    {features.map((feature, index) => (
                                        <li key={index} className={styles.featureItem}>
                                            <span className={styles.featureIcon}>
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                                    <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                                                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </span>
                                            <span className={styles.featureText}>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className={`${styles.content} ${styles.gridContent}`}>
                        <div className={styles.gridContentDescription}>
                            <div className={styles.specificationHeader}>
                                <div className={styles.title}>Mô tả sản phẩm</div>
                            </div>
                            <article
                                className="prose max-w-none py-5"
                                dangerouslySetInnerHTML={{ __html: dataDetail.description }}
                            />
                        </div>
                        <div className={styles.gridContentFigure}>
                            <div className={styles.specificationHeader}>
                                <div className={styles.title}>Thông số sản phẩm</div>
                            </div>
                            <ProductAdvantageComponent product={dataDetail.productFigure} />
                        </div>
                    </div>
                    <div className={`${styles.content}`}>
                        <div className={styles.specificationHeader}>
                            <div className={styles.title}>Sản phẩm tương tự</div>
                        </div>
                        <RelationProductComponent listProduct={dataDetail.sameCategoryProducts} />
                    </div>
                    <div className={`${styles.content}`}>
                        <div className={styles.specificationHeader}>
                            <div className={styles.title}>Tin tức nổi bật</div>
                        </div>
                        <BlogInProductSlug />
                    </div>
                </div>
            </div>
        </ClientLayout>
    )
}


const ProductSlugPage = dynamic(() => Promise.resolve(ProductSlugContent), {
    ssr: true,
    loading: () => <PageLoading />
});

export default ProductSlugPage;
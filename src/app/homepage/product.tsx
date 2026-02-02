'use client'

import React, { useState, useEffect } from "react";
import styles from '@/assets/styles/pages/home/product.module.css'
import productService from "@/infrastructure/repository/product/product.service";
import { configImageURL, convertSlug, formatCurrencyVND } from "@/infrastructure/helper/helper";
import Link from "next/link";
import { ROUTE_PATH } from "@/core/common/appRouter";
import { useRecoilValue } from "recoil";
import { CategoryProductState } from "@/core/common/atoms/category/categoryState";
import Image from "next/image";
import { ProductInterface } from "@/infrastructure/interface/product/product.interface";
import dynamic from "next/dynamic";
import { PageLoading } from "@/infrastructure/common/loading/loadingPage";

const ProductContent = () => {
    const [listProduct, setListProduct] = useState<Array<ProductInterface>>([])
    const categoryProductState = useRecoilValue(CategoryProductState).data;

    const onGetListProductAsync = async () => {
        const param = {}
        try {
            await productService.GetProduct(
                param,
                () => { }
            ).then((res) => {
                setListProduct(res.data);
            })
        }
        catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        onGetListProductAsync().then(_ => { });
    }, []);

    return (
        <section className={styles.productGoldSection}>
            <div className="section-header">
                <div className="section-badge">
                    <span className="badge-text">SẢN PHẨM MÀN HÌNH</span>
                </div>
                <h1 className="section-title">
                    DVD <span className="highlight">Sản Phẩm </span> Màn Hình
                </h1>
            </div>
            <div className="flex flex-col gap-10">
                {categoryProductState.map((category, key) => {
                    const productFromCategory = listProduct.filter(
                        (filter) => filter.category_id == category.id
                    );
                    const gridStyle =
                        productFromCategory.length == 2
                            ? styles.goldGrid2Col
                            : productFromCategory.length == 3
                                ? styles.goldGrid3Col
                                : styles.goldGrid;
                    const itemMediaCol =
                        productFromCategory.length == 2
                            ? styles.itemMedia2Col
                            : productFromCategory.length == 3
                                ? styles.itemMedia3Col
                                : styles.itemMedia;
                    return (
                        <div className={styles.goldContainer} key={key}>
                            {/* Gold & Black Header */}
                            <h2 className={styles.sectionTitle}>
                                {category.name}
                            </h2>

                            {/* Gold & Black Gallery Grid */}
                            <div className={gridStyle}>
                                {productFromCategory.slice(0, 4).map((item, index) => (
                                    <Link
                                        href={`${ROUTE_PATH.PRODUCT}/${convertSlug(item.name)}-${item.id}.html`}
                                        key={item.id}
                                        className={styles.goldCard}
                                        style={{ animationDelay: `${index * 0.1}s` }}
                                    >
                                        {/* Gold Sale Badge */}
                                        {Number(item.price_sale) !== 0 ? (
                                            <div className={styles.goldSaleBadge}>
                                                <span className={styles.goldBadgeText}>GIẢM GIÁ</span>
                                                <div className={styles.goldBadgeCorner}></div>
                                            </div>
                                        ) : null}

                                        {/* Card Media with Gold Border */}
                                        <div className={styles.cardGoldMedia}>
                                            <div className={styles.goldMediaWrapper}>
                                                <div className={styles.goldCardImage}>
                                                    <Image
                                                        src={configImageURL(item.image)}
                                                        alt={item.name}
                                                        fill
                                                        className={styles.objectCover}
                                                    />
                                                </div>
                                                <div className={styles.goldImageOverlay}></div>
                                                <div className={styles.goldMediaBorder}></div>

                                                {/* Quick View Button Gold Style */}
                                                <button
                                                    className={styles.goldQuickViewBtn}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        // Handle quick view logic here
                                                    }}
                                                >
                                                    <svg className={styles.goldEyeIcon} viewBox="0 0 24 24" fill="none">
                                                        <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="currentColor" strokeWidth="2" />
                                                        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
                                                    </svg>
                                                    <span>Xem chi tiết</span>
                                                </button>
                                            </div>
                                        </div>

                                        {/* Card Content Gold & Black */}
                                        <div className={styles.cardGoldContent}>
                                            <div className={styles.goldContentWrapper}>
                                                <h3 className={styles.goldCardTitle}>{item.name}</h3>

                                                <div className={styles.goldFeatures}>
                                                    <span className={styles.goldFeatureChip}>
                                                        Điều khiển bằng giọng nói
                                                    </span>
                                                    <span className={styles.goldFeatureChip}>
                                                        Tích hợp camera 360
                                                    </span>
                                                </div>

                                                {/* Price Section Gold Style */}
                                                <div className={styles.goldPriceSection}>
                                                    {Number(item.price_sale) ? (
                                                        <>
                                                            <div className={styles.goldPriceRow}>
                                                                <span className={styles.goldCurrentPrice}>
                                                                    {formatCurrencyVND(Number(item.price_sale))}
                                                                </span>
                                                                <span className={styles.goldDiscountBadge}>
                                                                    <span className={styles.discountIcon}>🔥</span>
                                                                    Tiết kiệm {Math.round((1 - item.price_sale / item.price) * 100)}%
                                                                </span>
                                                            </div>
                                                            <div className={styles.goldOriginalPriceWrapper}>
                                                                <span className={styles.goldOriginalPrice}>
                                                                    {formatCurrencyVND(Number(item.price))}
                                                                </span>
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <div className={styles.goldPriceRow}>
                                                            <span className={styles.goldNormalPrice}>
                                                                {formatCurrencyVND(Number(item.price))}
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Gold Action Button */}
                                            </div>
                                        </div>

                                        {/* Gold Corner Accents */}
                                        <div className="gold-corner-tl"></div>
                                        <div className="gold-corner-tr"></div>
                                        <div className="gold-corner-bl"></div>
                                        <div className="gold-corner-br"></div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )
                })}
            </div>

        </section>
    );
};

const ProductSection = dynamic(() => Promise.resolve(ProductContent), {
    ssr: false,
    loading: () => <PageLoading />
});

export default ProductSection;
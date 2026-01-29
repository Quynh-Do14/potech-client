import React from 'react'
import styles from "@/assets/styles/pages/product/relationProduct.module.css"
import Link from 'next/link'
import { ROUTE_PATH } from '@/core/common/appRouter'
import { configImageURL, convertSlug, formatCurrencyVND } from '@/infrastructure/helper/helper'
import { ProductInterface } from '@/infrastructure/interface/product/product.interface'
import Image from 'next/image'
type Props = {
    listProduct: ProductInterface[]
}
const RelationProductComponent = (props: Props) => {
    const { listProduct } = props
    return (
        <div className={styles.relationProductSection}>
            <div className={styles.galleryContainer}>
                <div className={styles.goldGrid}>
                    {listProduct.map((item, index) => (
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
                                        <Image src={configImageURL(item.image)} alt={item.name} fill />
                                    </div>
                                    <div className={styles.goldImageOverlay}></div>
                                    <div className={styles.goldMediaBorder}></div>

                                    {/* Quick View Button Gold Style */}
                                    <button className={styles.goldQuickViewBtn}                                    >
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
                                                        Tiết kiệm {Math.round((1 - Number(item.price_sale) / Number(item.price)) * 100)}%
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

                                    {/* Gold Corner Accents */}
                                    <div className={styles.goldCornerTl}></div>
                                    <div className={styles.goldCornerTr}></div>
                                    <div className={styles.goldCornerBl}></div>
                                    <div className={styles.goldCornerBr}></div>
                                </div>
                            </div>

                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default RelationProductComponent
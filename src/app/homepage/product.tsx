'use client'

import React, { useState, useEffect } from "react";
import '@/assets/styles/pages/home/product.css'
import productService from "@/infrastructure/repository/product/product.service";
import { configImageURL, convertSlug, formatCurrencyVND } from "@/infrastructure/helper/helper";
import Link from "next/link";
import { ROUTE_PATH } from "@/core/common/appRouter";
import { useRecoilValue } from "recoil";
import { CategoryProductState } from "@/core/common/atoms/category/categoryState";
import Image from "next/image";
import { ProductInterface } from "@/infrastructure/interface/product/product.interface";

const ProductSection = () => {
    const [listProduct, setListProduct] = useState<Array<ProductInterface>>([])
    const onGetListProductAsync = async () => {
        const param = {
        }
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
        <section className="product-gold-section">
            <div className="gold-container">
                {/* Gold & Black Header */}

                <div className="section-header">
                    <div className="article-badge">
                        <span className="badge-text">SẢN PHẨM MÀN HÌNH</span>
                    </div>
                    <h2 className="article-title">
                        DVD <span className="highlight">SẢN PHẨM </span> MÀN HÌNH
                    </h2>
                    <p className="article-subtitle">
                        Thông tin mới nhất về công nghệ, sự kiện và kiến thức chuyên sâu về bảo vệ ô tô
                    </p>
                </div>

                {/* Gold & Black Gallery Grid */}
                <div className="gold-grid">
                    {listProduct.slice(0, 4).map((item, index) => (
                        <Link
                            href={`${ROUTE_PATH.PRODUCT}/${convertSlug(item.name)}-${item.id}.html`}
                            key={item.id}
                            className="gold-card"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            {/* Gold Sale Badge */}
                            {Number(item.price_sale) !== 0 ? (
                                <div className="gold-sale-badge">
                                    <span className="gold-badge-text">GIẢM GIÁ</span>
                                    <div className="gold-badge-corner"></div>
                                </div>
                            ) : null}

                            {/* Card Media with Gold Border */}
                            <div className="card-gold-media">
                                <div className="gold-media-wrapper">
                                    <div className="gold-card-image">
                                        <Image src={configImageURL(item.image)} alt={item.name} fill />
                                    </div>
                                    <div className="gold-image-overlay"></div>
                                    <div className="gold-media-border"></div>

                                    {/* Quick View Button Gold Style */}
                                    <button
                                        className="gold-quick-view-btn"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            // Handle quick view logic here
                                        }}
                                    >
                                        <svg className="gold-eye-icon" viewBox="0 0 24 24" fill="none">
                                            <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="currentColor" strokeWidth="2" />
                                            <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
                                        </svg>
                                        <span>Xem chi tiết</span>
                                    </button>
                                </div>
                            </div>

                            {/* Card Content Gold & Black */}
                            <div className="card-gold-content">
                                <div className="gold-content-wrapper">
                                    <h3 className="gold-card-title">{item.name}</h3>

                                    <div className="gold-features">
                                        <span className="gold-feature-chip">
                                            Điều khiển bằng giọng nói
                                        </span>
                                        <span className="gold-feature-chip">
                                            Tích hợp camera 360
                                        </span>
                                    </div>

                                    {/* Price Section Gold Style */}
                                    <div className="gold-price-section">
                                        {Number(item.price_sale) ? (
                                            <>
                                                <div className="gold-price-row">
                                                    <span className="gold-current-price">
                                                        {formatCurrencyVND(item.price_sale)}
                                                    </span>
                                                    <span className="gold-discount-badge">
                                                        <span className="discount-icon">🔥</span>
                                                        Tiết kiệm {Math.round((1 - item.price_sale / item.price) * 100)}%
                                                    </span>
                                                </div>
                                                <div className="gold-original-price-wrapper">
                                                    <span className="gold-original-price">
                                                        {formatCurrencyVND(item.price)}
                                                    </span>
                                                </div>
                                            </>
                                        ) : (
                                            <div className="gold-price-row">
                                                <span className="gold-normal-price">
                                                    {formatCurrencyVND(item.price)}
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

            {/* Gold Pattern Background */}
            <div className="gold-pattern-bg"></div>
        </section>
    );
};

export default ProductSection;
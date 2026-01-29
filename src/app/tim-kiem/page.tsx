'use client'
import React, { useState, useEffect, Suspense, useLayoutEffect } from "react";
import productService from "@/infrastructure/repository/product/product.service";
import { configImageURL, convertSlug, formatCurrencyVND } from "@/infrastructure/helper/helper";
import Link from "next/link";
import { ROUTE_PATH } from "@/core/common/appRouter";
import styles from "@/assets/styles/pages/product/product.module.css"
import ClientLayout from "@/infrastructure/common/Layouts/Client-Layout";
import BreadcrumbCommon from "@/infrastructure/common/Layouts/Breadcumb";
import InputSearchCommon from "@/infrastructure/common/input/input-search-common";
import SelectSearchCommon from "@/infrastructure/common/input/select-search-common";
import ButtonCommon from "@/infrastructure/common/button/button-common";
import { useRecoilValue } from "recoil";
import { useRouter, useSearchParams } from "next/navigation";
import { ProductInterface, ProductParams } from "@/infrastructure/interface/product/product.interface";
import SkeletonProduct from "./skeleton";
import { CategoryProductState } from "@/core/common/atoms/category/categoryState";
import Image from "next/image";
import { BrandState } from "@/core/common/atoms/brand/brandState";
import { PaginationNoSizeCommon } from "@/infrastructure/common/pagination/PaginationNoSize";

const priceRanges = [

    {
        "id": 2,
        "name": "0 - 5,000,000",
        "range": "0-5000000"
    },
    {
        "id": 3,
        "name": "5,000,000 - 10,000,000",
        "range": "5000000-10000000"
    },
    {
        "id": 4,
        "name": "10,000,000 - 20,000,000",
        "range": "10000000-20000000"
    },
    {
        "id": 5,
        "name": "20,000,000 - 50,000,000",
        "range": "20000000-50000000"
    },
    {
        "id": 6,
        "name": "50,000,000 - 100,000,000",
        "range": "50000000-100000000"
    },
    {
        "id": 7,
        "name": "100,000,000 - 200,000,000",
        "range": "100000000-200000000"
    },
    {
        "id": 8,
        "name": "Trên 200,000,000",
        "range": "200000000-999999999999"
    }
]

const ProductContent = () => {
    const [listProduct, setListProduct] = useState<Array<ProductInterface>>([])
    const [searchText, setSearchText] = useState<string>("");
    const [totalPage, setTotalPage] = useState<number>(0);
    const [total, setTotal] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalElement, setTotalElement] = useState<number>(0);
    const [pageSize, setPageSize] = useState<number>(10);
    const [loading, setLoading] = useState<boolean>(false);
    const [initialLoading, setInitialLoading] = useState<boolean>(true);
    const [categoryId, setCategoryId] = useState<string>("");
    const [rangePrice, setRangePrice] = useState<string>("");
    const [minPrice, setMinPrice] = useState<number>(0);
    const [maxPrice, setMaxPrice] = useState<number>(999999999999);
    const [brandId, setBrandId] = useState<string>("");


    const router = useRouter(); // Từ next/navigation
    const searchParams = useSearchParams(); // Dùng useSearchParams thay vì router.query

    // Lấy các query parameters
    const search = searchParams?.get('search') || '';
    const page = searchParams?.get('page') || '1';
    const limit = searchParams?.get('limit') || '10';
    const category_id = searchParams?.get('category_id') || '';
    const brand_id = searchParams?.get('brand_id') || '';
    const min_price = searchParams?.get('min_price') || '';
    const max_price = searchParams?.get('max_price') || '';

    const categoryProductState = useRecoilValue(CategoryProductState).data
    const brandState = useRecoilValue(BrandState).data

    const onGetListProductAsync = async ({ name = searchText, limit = pageSize, page = currentPage, category_id = categoryId, brand_id = brandId, min = minPrice, max = maxPrice }) => {
        const param: ProductParams = {
            page: page,
            limit: limit,
            search: name,
            category_id: category_id,
            brand_id: brand_id,
            min_price: min,
            max_price: max,
        }
        try {
            await productService.GetProduct(
                param,
                setLoading
            ).then((res) => {
                setListProduct(res.data);
                setTotalElement(res.limit);
                setTotalPage(res.totalPages);
                setTotal(res.total);
            })
        }
        catch (error) {
            console.error(error)
        }
    }

    const onSearch = async (name = searchText, limit = pageSize, page = 1, category_id = categoryId, brand_id = brandId, min = minPrice, max = maxPrice) => {
        await onGetListProductAsync({ name: name, limit: limit, page: page, category_id: category_id, brand_id: brand_id, min: min, max: max }).then(_ => { });
    };


    const onSearchParam = async () => {
        // Tạo URL mới với search params
        const params = new URLSearchParams(searchParams?.toString() || '');
        params.set('search', searchText);
        params.set('category_id', categoryId);
        params.set('brand_id', brandId);
        params.set('min_price', String(minPrice));
        params.set('max_price', String(maxPrice));
        params.set('page', '1'); // Reset về trang 1 khi search

        router.push(`${ROUTE_PATH.PRODUCT}?${params.toString()}`);

        await onSearch(searchText, pageSize, 1, categoryId, brandId).then(_ => { });
    }

    const onChangeSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
    };

    const onChangeCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCategoryId(e.target.value);
    };

    const onChangeBrand = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setBrandId(e.target.value);
    };

    const onChangeRangePrice = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setRangePrice(value);
        console.log('value', value);
        const min = value.split('-')[0];
        const max = value.split('-')[1];
        setMinPrice(Number(min));
        setMaxPrice(Number(max));
    };

    const onChangePage = async (page: number) => {
        setCurrentPage(page);

        // Cập nhật params với page mới
        const params = new URLSearchParams(searchParams?.toString() || '');
        params.set('page', page.toString());
        router.push(`${ROUTE_PATH.PRODUCT}?${params.toString()}`);

        await onSearch(searchText, pageSize, page, categoryId, brandId).then(_ => { });
    }


    useEffect(() => {
        const parsedPage = parseInt(page) || 1;
        const parsedLimit = parseInt(limit) || 10;
        const parsedSearch = search || "";
        const parsedCategory = category_id || "";
        const parsedBrand = brand_id || "";
        const parsedMinPrice = parseInt(min_price as string) || 0;
        const parsedMaxPrice = parseInt(max_price as string) || 999999999999;
        setSearchText(parsedSearch);
        setCurrentPage(parsedPage);
        setPageSize(parsedLimit);
        setCategoryId(parsedCategory);
        setMinPrice(parsedMinPrice);
        setMaxPrice(parsedMaxPrice);
        setRangePrice(`${parsedMinPrice}-${parsedMaxPrice}`)

        onSearch(parsedSearch, parsedLimit, parsedPage, parsedCategory, parsedBrand);
    }, [search, page, limit, category_id, brand_id]); // Theo dõi các giá trị từ searchParams

    const onReset = () => {
        setSearchText('');
        setCategoryId('');
        setBrandId('');
        setMinPrice(0);
        setMaxPrice(999999999999);
        setRangePrice('');
        setCurrentPage(1);
        router.push(`${ROUTE_PATH.PRODUCT}`);
    }

    useLayoutEffect(() => {
        setInitialLoading(false);
    });

    return (
        <ClientLayout>
            <div className={styles.productSection}>
                <div className={`padding-common`}>
                    <BreadcrumbCommon
                        breadcrumb={"Sản phẩm"}
                        redirect={ROUTE_PATH.SEARCH}
                        title={"Tìm kiếm sản phẩm"}
                        blackColor={true}
                    />
                    <div className={styles.productContent}>
                        <div className="pageHeader">
                            <div className="badge">
                                <span className="badgeText">Tìm kiếm sản phẩm</span>
                            </div>
                            <h1 className="headerTitle">
                                <span className="highlight">Danh Sách</span> Sản Phẩm
                            </h1>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-2">
                            {/* Search Input */}
                            <div className="sm:col-span-3">
                                <InputSearchCommon
                                    placeholder={'Tìm kiếm tin tức'}
                                    value={searchText}
                                    onChange={onChangeSearchText}
                                    disabled={false}
                                />
                            </div>

                            {/* Category Select */}
                            <div className="sm:col-span-3">
                                <SelectSearchCommon
                                    listDataOfItem={categoryProductState}
                                    onChange={onChangeCategory}
                                    label={"Danh mục sản phẩm"}
                                    value={categoryId}
                                />
                            </div>

                            <div className="sm:col-span-2">
                                <SelectSearchCommon
                                    listDataOfItem={brandState}
                                    onChange={onChangeBrand}
                                    label={"Thương hiệu"}
                                    value={brandId}
                                />
                            </div>

                            <div className="sm:col-span-2">
                                <SelectSearchCommon
                                    listDataOfItem={priceRanges}
                                    onChange={onChangeRangePrice}
                                    label={"Khoảng giá"}
                                    value={rangePrice}
                                    labelName="name"
                                    valueName="range"
                                />
                            </div>

                            {/* Search Button */}
                            <div className="sm:col-span-2">
                                <ButtonCommon
                                    onClick={onSearchParam}
                                    title={'Tìm kiếm'}
                                />
                            </div>
                        </div>

                        {/* Loading State */}
                        {
                            initialLoading || loading ? (
                                <SkeletonProduct />
                            ) : listProduct.length > 0 ? (
                                /* Data State */
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
                                                            {item.category_name}
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
                            ) : (
                                <div className={styles.galleryContainer}>
                                    <div className={styles.noDataContainer}>
                                        <div className={styles.noDataIcon}>
                                            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                                <circle cx="12" cy="12" r="10" />
                                                <line x1="8" y1="8" x2="16" y2="16" />
                                                <line x1="16" y1="8" x2="8" y2="16" />
                                            </svg>
                                        </div>
                                        <h3 className={styles.noDataTitle}>Không tìm thấy sản phẩm</h3>
                                        <p className={styles.noDataDescription}>
                                            Không có sản phẩm nào phù hợp với tìm kiếm của bạn.
                                        </p>
                                        <ButtonCommon
                                            onClick={onReset}
                                            title={'Xóa bộ lọc'}
                                        />
                                    </div>
                                </div>
                            )}
                    </div>
                    <PaginationNoSizeCommon
                        total={total}
                        currentPage={Number(page)}
                        onChangePage={onChangePage}
                        pageSize={pageSize}
                    />
                </div>
            </div>
        </ClientLayout>

    );
};

const ProductPage = () => {
    return (
        <Suspense fallback={<SkeletonProduct />}>
            <ProductContent />
        </Suspense>
    );
};

export default ProductPage;
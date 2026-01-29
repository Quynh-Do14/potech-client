'use client'

import { ROUTE_PATH } from '@/core/common/appRouter'
import BreadcrumbCommon from '@/infrastructure/common/Layouts/Breadcumb'
import ClientLayout from '@/infrastructure/common/Layouts/Client-Layout'
import React, { Suspense, useEffect, useLayoutEffect, useState } from 'react'
import styles from "@/assets/styles/pages/blog/blog.module.css";
import Link from 'next/link';
import { configImageURL, convertDateOnlyShow, convertSlug } from '@/infrastructure/helper/helper';
import blogService from '@/infrastructure/repository/blog/blog.service'
import { useRouter, useSearchParams } from 'next/navigation'
import { useRecoilValue } from 'recoil';
import Image from 'next/image'
import BlogSkeleton from './skeleton'
import { PaginationNoSizeCommon } from '@/infrastructure/common/pagination/PaginationNoSize'
import InputSearchCommon from '@/infrastructure/common/input/input-search-common'
import SelectSearchCommon from '@/infrastructure/common/input/select-search-common'
import ButtonCommon from '@/infrastructure/common/button/button-common'
import { CategoryBlogState } from '@/core/common/atoms/category/categoryState'
import { BlogInterface } from '@/infrastructure/interface/blog/blog.interface'

const BlogContent = () => {
    const [listBlog, setListBlog] = useState<Array<BlogInterface>>([])
    const [searchText, setSearchText] = useState<string>("");
    const [totalPage, setTotalPage] = useState<number>(0);
    const [total, setTotal] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalElement, setTotalElement] = useState<number>(0);
    const [pageSize, setPageSize] = useState<number>(10);
    const [loading, setLoading] = useState<boolean>(false);
    const [categoryId, setCategoryId] = useState<string>("");
    const [initialLoading, setInitialLoading] = useState<boolean>(true);

    const router = useRouter(); // Từ next/navigation
    const searchParams = useSearchParams(); // Dùng useSearchParams thay vì router.query

    // Lấy các query parameters
    const search = searchParams?.get('search') || '';
    const page = searchParams?.get('page') || '1';
    const limit = searchParams?.get('limit') || '10';
    const category_id = searchParams?.get('category_id') || '';

    const categoryBlogState = useRecoilValue(CategoryBlogState).data

    const onGetListBlogAsync = async ({ name = searchText, limit = pageSize, page = currentPage, category_id = categoryId }) => {
        const param = {
            page: page,
            limit: limit,
            search: name,
            category_id: category_id
        }
        try {
            await blogService.GetBlog(
                param,
                setLoading
            ).then((res) => {
                setListBlog(res.data);
                setTotalElement(res.limit);
                setTotalPage(res.totalPages);
                setTotal(res.total);
            })
        }
        catch (error) {
            console.error(error)
        }
    }

    const onSearch = async (name = searchText, limit = pageSize, page = 1, category_id = categoryId) => {
        await onGetListBlogAsync({ name: name, limit: limit, page: page, category_id: category_id }).then(_ => { });
    };


    const onSearchParam = async () => {
        // Tạo URL mới với search params
        const params = new URLSearchParams(searchParams?.toString() || '');
        params.set('search', searchText);
        params.set('category_id', categoryId);
        params.set('page', '1'); // Reset về trang 1 khi search
        router.push(`${ROUTE_PATH.BLOG}?${params.toString()}`);

        await onSearch(searchText, pageSize, 1, categoryId).then(_ => { });
    }

    const onChangeSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
    };

    const onChangeCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCategoryId(e.target.value);
    };

    const onChangePage = async (page: number) => {
        setCurrentPage(page);

        // Cập nhật params với page mới
        const params = new URLSearchParams(searchParams?.toString() || '');
        params.set('page', page.toString());
        router.push(`${ROUTE_PATH.BLOG}?${params.toString()}`);

        await onSearch(searchText, pageSize, page, categoryId).then(_ => { });
    }


    useEffect(() => {
        const parsedPage = parseInt(page) || 1;
        const parsedLimit = parseInt(limit) || 10;
        const parsedSearch = search || "";
        const parsedCategory = category_id || "";

        setSearchText(parsedSearch);
        setCurrentPage(parsedPage);
        setPageSize(parsedLimit);
        setCategoryId(parsedCategory);

        onSearch(parsedSearch, parsedLimit, parsedPage, parsedCategory);
    }, [search, page, limit, category_id]); // Theo dõi các giá trị từ searchParams

    useLayoutEffect(() => {
        setInitialLoading(false);
    });
    return (
        <ClientLayout>
            <div className={styles.blogContainer}>
                <div className='padding-common'>
                    <BreadcrumbCommon
                        breadcrumb={"Tin tức"}
                        redirect={ROUTE_PATH.BLOG}
                        title={"Tin tức mới nhất"}
                        blackColor={true}
                    />
                    <div className={styles.newsArticleContainer}>
                        {/* Header */}
                        <div className={styles.newsHeader}>
                            <div className={styles.articleBadge}>
                                <span className={styles.badgeText}>TIN TỨC & BÀI VIẾT</span>
                            </div>
                            <h1 className={styles.articleTitle}>
                                <span className={styles.highlight}>Tin Tức</span> Mới Nhất
                            </h1>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-2">
                            {/* Search Input - 5/12 columns on desktop, full on mobile */}
                            <div className="sm:col-span-5">
                                <InputSearchCommon
                                    placeholder={'Tìm kiếm tin tức'}
                                    value={searchText}
                                    onChange={onChangeSearchText}
                                    disabled={false}
                                />
                            </div>

                            {/* Category Select - 4/12 columns on desktop, full on mobile */}
                            <div className="sm:col-span-4">
                                <SelectSearchCommon
                                    listDataOfItem={categoryBlogState}
                                    onChange={onChangeCategory}
                                    label={"Danh mục tin tức"}
                                    value={categoryId}
                                />
                            </div>

                            {/* Search Button - 3/12 columns on desktop, full on mobile */}
                            <div className="sm:col-span-3">
                                <ButtonCommon
                                    onClick={onSearchParam}
                                    title={'Tìm kiếm'}
                                />
                            </div>
                        </div>
                        {/* News Grid */}
                        <div className={styles.recentGrid}>
                            {loading || initialLoading
                                ?
                                <BlogSkeleton />
                                :
                                listBlog.map((article, index) => (
                                    <article key={index} className={styles.recentCard}>
                                        <Link
                                            href={`${ROUTE_PATH.BLOG}/${convertSlug(article?.title)}-${article?.id}.html`}
                                            className={styles.recentLink}
                                        >
                                            <div className={styles.recentImage}>
                                                <Image
                                                    src={configImageURL(article.image)}
                                                    alt={article.title}
                                                    fill
                                                    className={styles.recentImg}
                                                />
                                            </div>

                                            <div className={styles.recentContent}>
                                                <div className={styles.articleMeta}>
                                                    <span className={styles.category}>{article.category_name}</span>
                                                    <span className={styles.divider}>•</span>
                                                    <span className={styles.date}>{convertDateOnlyShow(article.created_at)}</span>
                                                </div>

                                                <h4 className={styles.recentTitle}>
                                                    {article.title}
                                                </h4>

                                                <div className={styles.stats}>
                                                    <div className={styles.stat}>
                                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                                                            <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z"
                                                                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                            <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                                                                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                        <span>1.2K</span>
                                                    </div>
                                                    <div className={styles.stat}>
                                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                                                            <path d="M21 11.5C21.1326 12.0523 21 13 21 13C21 13 18 15 12 15C6 15 3 13 3 13C3 13 2.86739 12.0523 3 11.5C3.13261 10.9477 3 10 3 10C3 10 6 8 12 8C18 8 21 10 21 10C21 10 20.8674 10.9477 21 11.5Z"
                                                                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                            <path d="M21 11.5V16.5C21 16.5 18 18.5 12 18.5C6 18.5 3 16.5 3 16.5V11.5"
                                                                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                        <span>24</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </article>
                                ))}
                        </div>
                        <PaginationNoSizeCommon
                            total={total}
                            currentPage={Number(page)}
                            onChangePage={onChangePage}
                            pageSize={pageSize}
                        />
                    </div>
                </div>
            </div>
        </ClientLayout>
    )
}

const BlogPage = () => {
    return (
        <Suspense fallback={<BlogSkeleton />}>
            <BlogContent />
        </Suspense>
    );
};

export default BlogPage;
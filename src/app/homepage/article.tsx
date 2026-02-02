'use client'
import React, { useEffect, useState } from "react";
import "@/assets/styles/pages/home/article.css";
import blogService from "@/infrastructure/repository/blog/blog.service";
import { configImageURL, convertDateOnlyShow, convertSlug } from "@/infrastructure/helper/helper";
import Link from "next/link";
import { ROUTE_PATH } from "@/core/common/appRouter";
import Image from "next/image";

const ArticleSection = () => {
    const [listBlog, setListBlog] = useState<Array<any>>([])
    const [loading, setLoading] = useState<boolean>(false);

    const onGetListBlogAsync = async () => {
        const param = {
            limit: 4,
        }
        try {
            await blogService.GetBlog(
                param,
                setLoading
            ).then((res) => {
                setListBlog(res.data);
            })
        }
        catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        onGetListBlogAsync().then(_ => { });
    }, []);

    return (
        <div className="news-article-container">
            {/* Header */}
            <div className="section-header">
                <div className="section-badge">
                    <span className="badge-text">TIN TỨC & BÀI VIẾT</span>
                </div>
                <h2 className="section-title">
                    Cập Nhật <span className="highlight">Tin Tức</span> Mới Nhất
                </h2>
                <p className="section-subtitle">
                    Thông tin mới nhất về công nghệ, sự kiện và kiến thức chuyên sâu về bảo vệ ô tô
                </p>
            </div>
            <div className="recent-grid">
                {listBlog.map(article => (
                    <article key={article.id} className="recent-card">
                        <Link
                            href={`${ROUTE_PATH.BLOG}/${convertSlug(article?.title)}-${article?.id}.html`}
                            className="recent-link"
                        >
                            <div className="recent-image">
                                <Image
                                    src={configImageURL(article.image)}
                                    alt={article.title}
                                    fill
                                    className="recent-img"
                                />
                            </div>

                            <div className="recent-content">
                                <div className="article-meta">
                                    <span className="category">{article.category_name}</span>
                                    <span className="divider">•</span>
                                    <span className="date">{convertDateOnlyShow(article.created_at)}</span>
                                </div>

                                <h4 className="recent-title">
                                    {article.title}
                                </h4>

                                <div className="stats">
                                    <div className="stat">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                                            <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z"
                                                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                                                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <span>1.2K</span>
                                    </div>
                                    <div className="stat">
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
        </div>
    );
};

export default ArticleSection;
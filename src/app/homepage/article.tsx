'use client'
import React, { useEffect, useState } from "react";
import "@/assets/styles/pages/home/article.css";
import blogService from "@/infrastructure/repository/blog/blog.service";
import { configImageURL, convertDateOnlyShow, convertSlug } from "@/infrastructure/helper/helper";
import Link from "next/link";
import { ROUTE_PATH } from "@/core/common/appRouter";
import Image from "next/image";
import { BlogInterface } from "@/infrastructure/interface/blog/blog.interface";
import { ConfigPageInterface } from "@/infrastructure/interface/configPage/configPage.interface";
type Props = {
    configPage: ConfigPageInterface[]
    type: 'TITLE_PAGE' | 'SECTION_1' | 'SECTION_2' | 'SECTION_3' | 'SECTION_4' | 'ACHIEVEMENT';
}

const ArticleSection = (props: Props) => {
    const {
        configPage,
        type
    } = props;
    const configContent = configPage.find(item => item.type == type);

    const [listBlog, setListBlog] = useState<Array<BlogInterface>>([])
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
                {
                    configContent?.box_content
                        ?
                        <div className="section-badge">
                            <span className="badge-text"> {configContent?.box_content} </span>
                        </div>
                        :
                        null
                }
                {
                    configContent?.title
                        ?
                        <h2 className="section-title">
                            <article
                                dangerouslySetInnerHTML={{ __html: configContent?.title }}
                            />
                        </h2>
                        :
                        null
                }
                {
                    configContent?.description
                        ?
                        <p className="section-subtitle">
                            {configContent?.description}
                        </p>
                        :
                        null
                }
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
                                    <span className="divider mx-1">•</span>
                                    <span className="date">{convertDateOnlyShow(article.created_at)}</span>
                                </div>

                                <h4 className="recent-title">
                                    {article.title}
                                </h4>

                                <div className="stats">
                                    <div className="stat">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <circle cx="12" cy="12" r="10"></circle>
                                            <circle cx="12" cy="10" r="3"></circle>
                                            <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"></path>
                                        </svg>
                                        <span>{article.user_name}</span>
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
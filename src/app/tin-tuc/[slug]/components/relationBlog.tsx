import styles from "@/assets/styles/pages/blog/slugBlog.module.css";
import { ROUTE_PATH } from "@/core/common/appRouter";
import { configImageURL, convertDateOnlyShow, convertSlug } from "@/infrastructure/helper/helper";
import { BlogInterface } from "@/infrastructure/interface/blog/blog.interface";
import Image from "next/image";
import Link from "next/link";
type Props = {
    relatedBlogs: BlogInterface[]
}
const RelationBlogComponent = (props: Props) => {
    const { relatedBlogs } = props;

    return (
        <div className={styles.newsGrid}>
            <p className={styles.title}>Bài viết tương tự</p>
            <div className={styles.recentGrid}>
                {relatedBlogs.map((article, index) => (
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
        </div>
    )
}

export default RelationBlogComponent
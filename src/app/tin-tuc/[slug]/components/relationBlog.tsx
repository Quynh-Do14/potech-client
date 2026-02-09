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
                            </div>
                        </Link>
                    </article>
                ))}
            </div>
        </div>
    )
}

export default RelationBlogComponent
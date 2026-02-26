import { ROUTE_PATH } from '@/core/common/appRouter'
import BreadcrumbCommon from '@/infrastructure/common/Layouts/Breadcumb'
import ClientLayout from '@/infrastructure/common/Layouts/Client-Layout'
import { configImageURL, splitTakeId } from '@/infrastructure/helper/helper'
import { Metadata } from 'next';
import styles from "@/assets/styles/pages/blog/slugBlog.module.css";
import RelationBlogComponent from './components/relationBlog';
import { Endpoint } from '@/core/common/apiLink';
import { BlogInterface } from '@/infrastructure/interface/blog/blog.interface';
import Image from 'next/image';
import TocBlog from './components/toc';

type Props = {
    params: { slug: string };
};
const baseURL = process.env.NEXT_PUBLIC_API_URL;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const blog: BlogInterface = await fetch(`${baseURL}${Endpoint.Blog.GetById}/${splitTakeId(params.slug)}`, {
        cache: 'no-store', // Tắt cache
    }).then((res) => res.json());

    return {
        title: blog.title,
        description: blog.short_description,
        openGraph: {
            title: blog.title,
            description: blog.short_description,
            images: configImageURL(blog.image),
        },
    };
}

const BlogSlugPage = async ({ params }: Props) => {

    const dataDetail: BlogInterface = await fetch(`${baseURL}${Endpoint.Blog.GetById}/${splitTakeId(params.slug)}`, {
        cache: 'no-store', // Tắt cache
    }).then((res) =>
        res.json()
    );
    const blog = dataDetail || {};
    const relatedBlogs = dataDetail?.related_blogs || []


    let tocItems: { id: string; text: any; level: number; }[] = [];
    let tocItemsLength: { id: string; text: any; level: number; }[] = [];

    var initialLength = 0
    const headings = String(blog.description).match(/<(h[2-3])[^>]*>(.*?)<\/\1>/g);
    if (headings) {
        const items = headings.map((heading, index) => {
            const level = heading.match(/h([2-3])/)?.[1] ?? '2';
            const text = heading.replace(/<\/?h[2-3][^>]*>/g, '');
            const id = `heading-${index}`;
            return { id, text, level: parseInt(level) };
        });
        initialLength = items.length
        tocItems = items;
    }

    const updatedContent = String(blog.description).replace(/<(h[2-3])[^>]*>(.*?)<\/\1>/g, (_match: any, tag: string[], text: any, _index: any) => {
        const id = `heading-${tocItems.length}`;

        tocItems.push({ id, text, level: parseInt(tag[1]) });
        tocItemsLength = tocItems.filter((_it, index) => index >= initialLength)
        return `<${tag} id="${id}">${text}</${tag}>`;
    });
    return (
        <ClientLayout>
            <div className={`${styles.blogSlugContainer} padding-common`}>
                <div className="flex flex-col lg:flex-row gap-5">
                    {/* Main content - chiếm 75% trên desktop, toàn bộ trên mobile */}
                    <div className="w-full lg:w-3/4">
                        <div className="space-y-6 flex flex-col gap-3">
                            <BreadcrumbCommon
                                breadcrumb={"Tin tức"}
                                redirect={ROUTE_PATH.BLOG}
                                title={blog.title}
                                blackColor={true}
                            />
                            <h1>
                                {blog.title}
                            </h1>
                            {/* <div className={styles.blogImg}
                                style={{ backgroundImage: `url(${configImageURL(blog.image)})` }}
                            ></div> */}

                            <div className={styles.blogImg}>
                                <Image src={configImageURL(blog.image)} alt={blog.title} fill loading="lazy" />
                            </div>
                            <TocBlog tocItems={tocItemsLength} />
                            <div className="quill-content">
                                <article
                                    className="ql-editor prose max-w-none"
                                    dangerouslySetInnerHTML={{ __html: updatedContent }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Sidebar - chiếm 25% trên desktop, toàn bộ trên mobile */}
                    <div className="w-full lg:w-1/4">
                        <RelationBlogComponent relatedBlogs={relatedBlogs} />
                    </div>
                </div>
            </div>
        </ClientLayout >
    )
}

export default BlogSlugPage
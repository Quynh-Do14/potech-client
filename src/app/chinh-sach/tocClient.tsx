'use client'
import styles from '@/assets/styles/pages/policy.module.css'

type Props = {
    tableOfContents: Array<{ id: string, name: string }>
}
const TocClient = (props: Props) => {
    const { tableOfContents } = props
    const onHref = (id: string) => {
        const el = document.getElementById(id)
        if (!el) return

        const y = el.getBoundingClientRect().top + window.scrollY - 80
        window.scrollTo({ top: y, behavior: 'smooth' })
    }

    return (
        <div className={styles.toc}>
            <div className={styles.tocTitle}>Nội dung bài viết</div>
            <ol className={styles.tocList}>
                {
                    tableOfContents.map((item, index) => (
                        <li key={index}><a onClick={() => onHref(item.id)}>{item.name}</a></li>

                    ))
                }
            </ol>
        </div>
    )
}
export default TocClient
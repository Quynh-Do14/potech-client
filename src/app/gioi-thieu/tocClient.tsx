'use client'
import styles from '@/assets/styles/pages/introduce.module.css'

const tableOfContents = [
    { id: 'gioi-thieu', name: 'Giới thiệu chung' },
    { id: 'tam-nhin', name: 'Tầm nhìn' },
    { id: 'su-menh', name: 'Sứ mệnh' },
    { id: 'gia-tri-cot-loi', name: 'Giá trị cốt lõi RIMO' },
    { id: 'su-khac-biet', name: 'Sự khác biệt của phim cách nhiệt Rimo' },
    { id: 'doi-tac', name: 'Đối tác của Rimo' },
]

const TocClient = () => {
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
                        <li key={index}><a onClick={() => onHref(item.id)}>{index + 1}. {item.name}</a></li>

                    ))
                }
            </ol>
        </div>
    )
}
export default TocClient
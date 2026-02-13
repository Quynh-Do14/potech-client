import React from 'react'
import styles from '@/assets/styles/pages/home/achievement.module.css'
interface Stat {
    label: string;
    title: string;
}

const stats: Stat[] = [
    { title: "Lỗi 1 đổi 1", label: "Trong 12 tháng" },
    { title: "Bảo hành 24 tháng", label: "Kể từ ngày mua" },
    { title: "Sản phẩm chính hãng", label: "Đại lý toàn quốc" },
    { title: "Miễn phí lắp đặt ", label: "Toàn quốc" }
];

const AchievementSection = () => {
    return (
        <div className={styles.achievement}>
            <div className={styles.statsContainer}>
                {stats.map((stat: Stat, index: number) => (
                    <div key={index} className={styles.statItem}>
                        <div className={styles.statNumber}>{stat.title}</div>
                        <div className={styles.statLabel}>{stat.label}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AchievementSection
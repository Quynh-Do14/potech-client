import React from 'react'
import styles from '@/assets/styles/pages/home/achievement.module.css'
const AchievementSection = () => {
    return (
        <div className={styles.achievement}>
            <div className={styles.statsContainer}>
                <div className={styles.statItem}>
                    <div className={styles.statValue}>LỖI 1 ĐỔI 1</div>
                    <div className={styles.statLabel}>Trong 12 tháng</div>
                </div>
                <div className={styles.statItem}>
                    <div className={styles.statValue}>BẢO HÀNH 18 THÁNG</div>
                    <div className={styles.statLabel}>Kể từ ngày mua</div>
                </div>
                <div className={styles.statItem}>
                    <div className={styles.statValue}>SẢN PHẨM CHÍNH HÃNG</div>
                    <div className={styles.statLabel}>Đại lý toàn quốc</div>
                </div>
            </div>
        </div>
    )
}

export default AchievementSection
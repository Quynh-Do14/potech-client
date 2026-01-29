import React from 'react'
import styles from '@/assets/styles/pages/home/achievement.module.css'
const AchievementSection = () => {
    return (
        <div className={styles.achievement}>
            <div className={styles.statsContainer}>
                <div className={styles.statItem}>
                    <div className={styles.statValue}>2.500+</div>
                    <div className={styles.statLabel}>Khách hàng tham gia</div>
                </div>
                <div className={styles.statItem}>
                    <div className={styles.statValue}>50+</div>
                    <div className={styles.statLabel}>Giải thưởng</div>
                </div>
                <div className={styles.statItem}>
                    <div className={styles.statValue}>5.8K</div>
                    <div className={styles.statLabel}>Lượt chia sẻ</div>
                </div>
                <div className={styles.statItem}>
                    <div className={styles.statValue}>98%</div>
                    <div className={styles.statLabel}>Hài lòng</div>
                </div>
            </div>
        </div>
    )
}

export default AchievementSection
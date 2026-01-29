import React from 'react'
import styles from '@/assets/styles/pages/agency/skeleton.module.css'
const AgencySkeleton = () => {
    return (
        Array.from({ length: 5 }).map((_, index) => (
            <div className={styles.agencyCardSkeleton} key={index}>
                <div className={styles.skeletonImage}>
                    <div className={styles.skeletonImageOverlay}></div>
                </div>

                <div className={styles.skeletonContent}>
                    <div className={styles.skeletonHeader}>
                        <div className={`${styles.skeletonText} ${styles.skeletonTitle}`}></div>
                    </div>

                    <div className={styles.skeletonInfo}>
                        <div className={styles.skeletonInfoItem}>
                            <div className={styles.skeletonIcon}></div>
                            <div className={`${styles.skeletonText} ${styles.skeletonAddress}`}></div>
                        </div>

                        <div className={styles.skeletonInfoItem}>
                            <div className={styles.skeletonIcon}></div>
                            <div className={`${styles.skeletonText} ${styles.skeletonPhone}`}></div>
                        </div>
                    </div>

                    <div className={styles.skeletonFooter}>
                        <div className={styles.skeletonButton}></div>
                    </div>
                </div>
            </div>
        ))

    )
}

export default AgencySkeleton
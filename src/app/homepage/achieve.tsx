import React from 'react'
import styles from '@/assets/styles/pages/home/achievement.module.css'
import { ConfigPageInterface } from '@/infrastructure/interface/configPage/configPage.interface';

type Props = {
    configPage: ConfigPageInterface[]
    type: 'TITLE_PAGE' | 'SECTION_1' | 'SECTION_2' | 'SECTION_3' | 'SECTION_4' | 'ACHIEVEMENT';
}

const AchievementSection = (props: Props) => {
    const {
        configPage,
        type
    } = props;
    const configContent: ConfigPageInterface[] = configPage.filter(item => item.type == type);
    return (
        <div className={styles.achievement}>
            <div className={styles.statsContainer}>
                {configContent.map((stat: ConfigPageInterface, index: number) => (
                    <div key={index} className={styles.statItem}>
                        <div className={styles.statNumber}>
                            <article
                                dangerouslySetInnerHTML={{ __html: stat.title }}
                            />
                        </div>
                        <div className={styles.statLabel}>{stat.description}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AchievementSection
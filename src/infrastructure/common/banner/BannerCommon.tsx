import React from 'react';
import Image from 'next/image';
import styles from '@/assets/styles/components/banner.module.css';

type Props = {
    bannerImg: any
}
const BannerCommon = (props: Props) => {
    const { bannerImg } = props;
    return (
        <div className={styles.bannerContainer}>
            <Image
                src={bannerImg}
                alt="Banner quảng cáo dòng sản phẩm RIMO PREMIUM"
                className={styles.bannerImage}
                width={1920}
                height={600}
                priority
            />
        </div>
    );
};

export default BannerCommon;
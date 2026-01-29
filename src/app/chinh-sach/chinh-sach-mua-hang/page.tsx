import { ROUTE_PATH } from '@/core/common/appRouter'
import BreadcrumbCommon from '@/infrastructure/common/Layouts/Breadcumb'
import ClientLayout from '@/infrastructure/common/Layouts/Client-Layout'
import React from 'react'
import styles from '@/assets/styles/pages/policy.module.css'
import TocClient from '../tocClient'
import BannerCommon from '@/infrastructure/common/banner/BannerCommon'
import banner from '@/assets/images/banner/Banner-Menu-GIoi-thieu.jpg';

const PolicyPage = () => {

    const tableOfContents = [
        { id: 'chinh-sach-mua-hang', name: 'CHÍNH SÁCH MUA HÀNG' },
    ];
    return (
        <ClientLayout>
            <BannerCommon
                bannerImg={banner}
            />
            <div className={`${styles.policyContainer} padding-common`}>
                <BreadcrumbCommon
                    breadcrumb={"Chính sách"}
                    redirect={ROUTE_PATH.PURCHASE_POLICY}
                    title={'Chính sách mua hàng'}
                    blackColor={true}
                />
                <TocClient
                    tableOfContents={tableOfContents}
                />

                <div className={styles.container}>
                    <h1 className={styles.title} id='chinh-sach-mua-hang'>CHÍNH SÁCH MUA HÀNG</h1>

                    <p className={styles.paragraph}>
                        Hiện nay Inmax đang cung cấp tất cả các hình thức mua hàng để phục vụ tốt nhất tất cả các yêu cầu của quý khách hàng trên khắp cả nước.
                    </p>

                    <p className={styles.paragraph}>
                        Với các sản phẩm phim cách nhiệt công ty bán ra luôn cung cấp đầy đủ giấy tờ, nguồn gốc hàng hóa, và những chứng nhận hợp quy với tiêu chuẩn Việt Nam.
                    </p>

                    <p className={styles.paragraph}>
                        Quý khách hàng có thể đặt mua hàng trực tiếp tại các đại lý của Inmax trên toàn quốc, qua HOTLINE 1900 8113 hoặc trên website online: https://inmax.vn/
                    </p>
                </div>
            </div>
        </ClientLayout>
    )
}

export default PolicyPage
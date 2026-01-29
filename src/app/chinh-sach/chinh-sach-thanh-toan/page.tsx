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
        { id: 'phuong-thuc-thanh-toan', name: 'Hình thức thanh toán' },
        { id: 'tien-mat-truc-tiep', name: 'Thanh toán tiền mặt trực tiếp' },
        { id: 'thanh-toan-cod', name: 'Thanh toán khi nhận hàng (COD)' },
        { id: 'chuyen-khoan-truoc', name: 'Thanh toán chuyển khoản trước' },
        { id: 'thong-tin-tai-khoan', name: 'Thông tin tài khoản' },
    ];
    return (
        <ClientLayout>
            <BannerCommon
                bannerImg={banner}
            />
            <div className={`${styles.policyContainer} padding-common`}>
                <BreadcrumbCommon
                    breadcrumb={"Chính sách"}
                    redirect={ROUTE_PATH.PRIVACY_POLICY}
                    title={'Chính sách thanh toán'}
                    blackColor={true}
                />
                <TocClient
                    tableOfContents={tableOfContents}
                />

                <div className={styles.container}>
                    <h1 className={styles.title} id='phuong-thuc-thanh-toan'>CHÍNH SÁCH THANH TOÁN</h1>

                    <p className={styles.paragraph}>
                        Nhằm mang đến cho Quý khách những trải nghiệm mua hàng tuyệt vời nhất, Rimo chúng tôi đưa ra 3 hình thức thanh toán để Quý khách hàng có thể lựa chọn hình thức thuận tiện và phù hợp với mình nhất:
                    </p>

                    <h2 className={styles.heading} id='tien-mat-truc-tiep'>1. Thanh toán tiền mặt trực tiếp</h2>
                    <p className={styles.paragraph}>
                        Quý khách có thể đến trực tiếp địa chỉ của chúng tôi để thanh toán bằng tiền mặt.
                    </p>

                    <h2 className={styles.heading} id='thanh-toan-cod'>2. Thanh toán khi nhận hàng (COD)</h2>
                    <p className={styles.paragraph}>
                        Với phương thức thanh toán này, Quý khách hàng nhận hàng – xem hàng tại nhà và thanh toán bằng tiền mặt cho nhân viên giao hàng. Rimo chấp nhận hình thức thanh toán khi nhận hàng (COD) cho hầu hết các đơn hàng trên toàn quốc.
                    </p>

                    <h2 className={styles.heading} id='chuyen-khoan-truoc'>3. Thanh toán chuyển khoản trước</h2>
                    <p className={styles.paragraph}>
                        Trong quá trình đặt hàng, nếu Quý khách hàng không muốn thanh toán bằng tiền mặt hoặc không thể thanh toán trực tiếp, bạn có thể chọn hình thức thanh toán chuyển khoản, sau đó, Rimo sẽ tiến hành giao hàng theo thỏa thuận hoặc hợp đồng với Quý khách.
                    </p>

                    <h3 className={styles.subHeading} id='thong-tin-tai-khoan'>Thông tin tài khoản thanh toán:</h3>
                    <div className={styles.bankInfo}>
                        <p className={styles.paragraph}><strong>Số tài khoản:</strong> 19037686171010</p>
                        <p className={styles.paragraph}><strong>Ngân hàng:</strong> Techcombank</p>
                        <p className={styles.paragraph}><strong>Chi nhánh:</strong> Chương Dương</p>
                        <p className={styles.paragraph}><strong>Chủ tài khoản:</strong> CÔNG TY TNHH THƯƠNG MẠI XUẤT NHẬP KHẨU NỘI THẤT Ô TÔ QUANG MINH</p>
                    </div>

                    <h3 className={styles.subHeading}>Lưu ý khi lựa chọn hình thức thanh toán chuyển khoản trước</h3>
                    <p className={styles.paragraph}>
                        Nội dung chuyển khoản phải ghi rõ họ tên và chuyển cho món hàng nào. Sau khi chuyển khoản, chúng tôi sẽ liên hệ xác nhận và tiến hành giao hàng. Nếu sau thời gian thỏa thuận mà chúng tôi không giao hàng hoặc không phản hồi lại, quý khách có thể gửi khiếu nại trực tiếp về địa chỉ trụ sở và yêu cầu bồi thường nếu chứng minh được sự chậm trễ làm ảnh hưởng đến kinh doanh của quý khách.
                    </p>

                    <h3 className={styles.subHeading}>Đối với khách hàng kinh doanh</h3>
                    <p className={styles.paragraph}>
                        Đối với khách hàng có nhu cầu mua số lượng lớn để kinh doanh hoặc buôn sỉ vui lòng liên hệ trực tiếp với chúng tôi để có chính sách giá cả hợp lý. Và việc thanh toán sẽ được thực hiện theo hợp đồng. Chúng tôi cam kết kinh doanh minh bạch, hợp pháp, bán hàng chất lượng, có nguồn gốc.
                    </p>
                </div>
            </div>
        </ClientLayout>
    )
}

export default PolicyPage
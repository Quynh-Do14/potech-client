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
        { id: 'chinh-sach-bao-hanh-doi-tra', name: 'CHÍNH SÁCH BẢO HÀNH VÀ ĐỔI TRẢ' },
        { id: 'phim-cach-nhiet', name: 'I. Chính sách bảo hành phim cách nhiệt INMAX' },
        { id: 'pham-vi-ap-dung', name: '1. Phạm vi áp dụng' },
        { id: 'truong-hop-khong-bao-hanh-phim', name: '2. Trường hợp không được bảo hành' },
        { id: 'dieu-kien-doi-tra', name: '3. Điều kiện đổi trả/huỷ đơn' },
        { id: 'truong-hop-khong-chap-nhan', name: 'Trường hợp không chấp nhận đổi/trả' },
        { id: 'ppf-inmax', name: 'II. Chính sách bảo hành PPF INMAX' },
        { id: 'pham-vi-bao-hanh-ppf', name: '1. Phạm vi bảo hành PPF' },
        { id: 'pham-vi-tu-choi-ppf', name: '2. Phạm vi từ chối bảo hành PPF' },
    ];
    return (
        <ClientLayout>
            <BannerCommon
                bannerImg={banner}
            />
            <div className={`${styles.policyContainer} padding-common`}>
                <BreadcrumbCommon
                    breadcrumb={"Chính sách"}
                    redirect={ROUTE_PATH.WARRANTY_RETURN_POLICY}
                    title={'Chính sách bảo hành – đổi trả hàng'}
                    blackColor={true}
                />
                <TocClient
                    tableOfContents={tableOfContents}
                />

                <div className={styles.container}>
                    <h1 className={styles.title} id='chinh-sach-bao-hanh-doi-tra'>CHÍNH SÁCH BẢO HÀNH VÀ ĐỔI TRẢ</h1>

                    <h2 className={styles.heading} id='phim-cach-nhiet'>I. Chính sách bảo hành và đổi trả của Phim phản xạ nhiệt/cách nhiệt INMAX</h2>

                    <h3 className={styles.subHeading} id='pham-vi-ap-dung'>1. Phạm vi áp dụng</h3>
                    <p className={styles.paragraph}>
                        Sản phẩm được bảo hành điện tử 12 năm đối với lỗi nhà sản xuất bao gồm:
                    </p>
                    <ul className={styles.list}>
                        <li>Phim bị phồng rộp</li>
                        <li>Phim bong tróc, tách lớp bề mặt phim</li>
                        <li>Phim cách nhiệt bay màu</li>
                        <li>Gây mùi khó chịu</li>
                        <li>Phim được chứng minh không có tác dụng</li>
                    </ul>
                    <p className={styles.paragraph}>
                        Tất cả các sản phẩm Inmax để được bảo hành cần đảm bảo điều kiện có mã bảo hành hợp lệ và trong thời gian bảo hành theo quy định.
                    </p>

                    <h3 className={styles.subHeading} id='truong-hop-khong-bao-hanh-phim'>2. Trường hợp không được bảo hành</h3>
                    <ul className={styles.list}>
                        <li>Phim bị rách, trầy xước, kéo dãn, biến đổi hình dạng do ngoại lực, mưa gió, thiên tai mà không phải do lỗi kỹ thuật</li>
                        <li>Phim bị va đập, sử dụng hóa chất tác động làm hỏng bề mặt phim</li>
                        <li>Sử dụng sai nội dung hướng dẫn</li>
                        <li>Sản phẩm quá thời hạn bảo hành</li>
                        <li>Khách hàng tự ý can thiệp vào máy của sản phẩm hoặc đem đến một nơi nào khác sửa chữa</li>
                    </ul>

                    <h3 className={styles.subHeading} id='dieu-kien-doi-tra'>3. Điều kiện đổi trả hàng hoặc hoàn tiền 100%</h3>
                    <ul className={styles.list}>
                        <li>Sản phẩm mới mua trong vòng 03 ngày kể từ ngày xuất bán</li>
                        <li>Sản phẩm phát hiện bị lỗi của nhà sản xuất khi nhận hàng</li>
                        <li>Sản phẩm không giống với sản phẩm mà Quý khách đã đặt hàng trên website của Inmax</li>
                    </ul>

                    <h4 className={styles.subHeading2} id='truong-hop-khong-chap-nhan'>Trường hợp không chấp nhận đổi hoặc trả sản phẩm:</h4>
                    <ul className={styles.list}>
                        <li>Quý khách muốn thay đổi chủng loại, mẫu mã sản phẩm</li>
                        <li>Lỗi do người sử dụng</li>
                        <li>Không chấp nhận các lỗi ngoại quan (xước, móp, méo, vỡ, sứt, tem rách, ẩm mốc,…) khi khách hàng đã mang sản phẩm ra khỏi cửa hàng</li>
                    </ul>

                    <p className={styles.paragraph}>
                        <strong>Mọi thắc mắc về chính sách bảo hành vui lòng liên hệ với chúng tôi qua hotline 1900 8113 để được hỗ trợ nhanh nhất!</strong>
                    </p>

                    <p className={styles.paragraph}>
                        <em>Xin trân trọng cảm ơn!</em>
                    </p>

                    <h2 className={styles.heading} id='ppf-inmax'>II. Chính sách bảo hành và đổi trả của PPF INMAX</h2>

                    <h3 className={styles.subHeading} id='pham-vi-bao-hanh-ppf'>1. Phạm vi bảo hành cho sản phẩm PPF Inmax</h3>
                    <ul className={styles.list}>
                        <li>Tạp chất (chấm keo) (kích thước chấm {'<'}0.5mm): trong phạm vi một mét chiều rộng {'<'} 3 chấm, cho toàn bộ nhánh {'<'} 10 chấm, (kích thước chấm 0.5mm-2 mm) trong phạm vi 3cm tính từ mép {'<'} 3 chấm</li>
                        <li>Các vấn đề bong tróc/ vết nứt/ phồng rộp/ tách lớp do keo dán phim, thi công</li>
                        <li>Chênh lệch màu vàng △E ≥/oxy hóa/mất độ bóng</li>
                        <li>Bề mặt màng trở nên xỉn màu, ố vàng (lỗi lớp phủ)</li>
                        <li>Vết lõm vật lý của phim</li>
                        <li>Không có hiệu ứng lá sen, làm đọng vết mưa/đốm nước</li>
                        <li>Các vấn đề về bong bóng và lớp keo phủ không đồng đều</li>
                    </ul>

                    <h3 className={styles.subHeading} id='pham-vi-tu-choi-ppf'>2. Phạm vi từ chối bảo hành cho sản phẩm PPF Inmax</h3>
                    <p className={styles.paragraph}>
                        INMAX và đơn vị thi công sẽ không chịu trách nhiệm bảo hành với các khiếm khuyết như sau:
                    </p>
                    <ul className={styles.list}>
                        <li>Sủi bọt, cong vênh do súng bắn nước áp lực cao gây ra</li>
                        <li>Bề mặt màng xỉn màu do thi công</li>
                        <li>Ăn mòn chất lỏng/ Phân chim/ Vết dầu/ Vết nước</li>
                        <li>Keo dư do phương pháp xé không đúng cách</li>
                        <li>Vết xước do con người, hoạt động xây dựng tác động lực mạnh gây ra</li>
                        <li>Thiên tai, ngoại lực, hoặc các vật thể có tính axit, kiềm mạnh</li>
                    </ul>
                </div>
            </div>
        </ClientLayout>
    )
}

export default PolicyPage
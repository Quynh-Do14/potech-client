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
        { id: 'chinh-sach-giao-hang', name: 'CHÍNH SÁCH GIAO HÀNG' },
        { id: 'thoi-han-giao-hang', name: 'Thời hạn ước tính giao hàng' },
        { id: 'phi-van-chuyen', name: 'Phí vận chuyển' },
        { id: 'gioi-han-dia-ly', name: 'Giới hạn địa lý' },
    ];
    return (
        <ClientLayout>
            <BannerCommon
                bannerImg={banner}
            />
            <div className={`${styles.policyContainer} padding-common`}>
                <BreadcrumbCommon
                    breadcrumb={"Chính sách"}
                    redirect={ROUTE_PATH.SHIPPING_DELIVERY_INFO}
                    title={'Chính sách giao hàng'}
                    blackColor={true}
                />
                <TocClient
                    tableOfContents={tableOfContents}
                />

                <div className={styles.container}>
                    <h1 className={styles.title} id='chinh-sach-giao-hang'>CHÍNH SÁCH GIAO HÀNG</h1>

                    <p className={styles.paragraph}>
                        Inmax cung cấp dịch vụ giao hàng tận nơi trên toàn quốc, áp dụng cho khách mua hàng trên website, fanpage và gọi điện thoại và mua trực tiếp tại cửa hàng, đại lý.
                    </p>

                    <p className={styles.paragraph}>
                        Đơn hàng sẽ được giao đến tận địa chỉ khách hàng đã cung cấp thông qua công ty vận chuyển trung gian.
                    </p>

                    <h2 className={styles.heading} id='thoi-han-giao-hang'>Thời hạn ước tính cho việc giao hàng</h2>
                    <p className={styles.paragraph}>
                        Thông thường sau khi nhận được thông tin đặt hàng chúng tôi sẽ xử lý đơn hàng trong vòng 24h và phản hồi lại thông tin cho khách hàng về việc thanh toán và giao nhận.
                    </p>

                    <p className={styles.paragraph}>
                        Thời gian giao hàng thường trong khoảng từ 3-5 ngày kể từ ngày chốt đơn hàng hoặc theo thỏa thuận với khách khi đặt hàng.
                    </p>

                    <p className={styles.paragraph}>
                        Tuy nhiên, cũng có trường hợp việc giao hàng kéo dài hơn nhưng chỉ xảy ra trong những tình huống bất khả kháng như sau:
                    </p>

                    <ul className={styles.list}>
                        <li>Nhân viên chúng tôi liên lạc với khách hàng qua điện thoại không được nên không thể giao hàng</li>
                        <li>Địa chỉ giao hàng bạn cung cấp không chính xác hoặc khó tìm</li>
                        <li>Số lượng đơn hàng tăng đột biến khiến việc xử lý đơn hàng bị chậm</li>
                        <li>Đối tác cung cấp hàng chậm hơn dự kiến khiến việc giao hàng bị chậm lại hoặc đối tác vận chuyển giao hàng bị chậm</li>
                    </ul>

                    <h2 className={styles.heading} id='phi-van-chuyen'>Phí vận chuyển</h2>
                    <p className={styles.paragraph}>
                        Chúng tôi sử dụng dịch vụ vận chuyển ngoài nên cước phí vận chuyển sẽ được tính theo phí của các đơn vị vận chuyển tùy vào vị trí và khối lượng của đơn hàng, khi liên hệ lại xác nhận đơn hàng với khách sẽ báo mức phí cụ thể cho khách hàng.
                    </p>

                    <p className={styles.paragraph}>
                        Để kiểm tra tình trạng đơn hàng, Quý khách xin vui lòng inbox fanpage hoặc gọi số hotline, cung cấp tên, số điện thoại để được kiểm tra.
                    </p>

                    <p className={styles.paragraph}>
                        Khi hàng được giao, Quý khách hàng vui lòng ký kiểm tra lại số lượng cũng như loại hàng hóa được giao có chính xác không với nhân viên giao hàng. Xin quý khách vui lòng giữ lại biên lại vận chuyển và hóa đơn mua hàng để đối chiếu kiểm tra.
                    </p>

                    <h2 className={styles.heading} id='gioi-han-dia-ly'>Các giới hạn về mặt địa lý cho việc giao hàng</h2>
                    <p className={styles.paragraph}>
                        Riêng khách tỉnh có nhu cầu mua số lượng lớn hoặc khách buôn sỉ nếu có nhu cầu mua sản phẩm, chúng tôi sẽ nhờ dịch vụ giao nhận của các công ty vận chuyển và phí sẽ được tính theo phí của các đơn vị cung cấp dịch vụ vận chuyển hoặc theo thoản thuận hợp đồng giữa 2 bên.
                    </p>

                    <div className={styles.noteBox}>
                        <strong>LƯU Ý:</strong> Trường hợp phát sinh chậm trễ trong việc giao hàng chúng tôi sẽ thông tin kịp thời cho khách hàng và khách hàng có thể lựa chọn giữa việc Hủy hoặc tiếp tục Chờ.
                    </div>
                </div>
            </div>
        </ClientLayout>
    )
}

export default PolicyPage
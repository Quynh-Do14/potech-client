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
        { id: 'chinh-sach-bao-mat-thong-tin', name: 'CHÍNH SÁCH BẢO MẬT THÔNG TIN' },
        { id: 'muc-dich-thu-thap-thong-tin', name: '1. Mục đích và phạm vi thu thập' },
        { id: 'pham-vi-su-dung-thong-tin', name: '2. Phạm vi sử dụng thông tin' },
        { id: 'thoi-gian-luu-tru-thong-tin', name: '3. Thời gian lưu trữ thông tin' },
        { id: 'dia-chi-quan-ly-thong-tin', name: '4. Địa chỉ quản lý thông tin' },
        { id: 'phuong-tien-chinh-sua-thong-tin', name: '5. Phương tiện chỉnh sửa thông tin' },
        { id: 'cam-ket-bao-mat-thong-tin', name: '6. Cam kết bảo mật thông tin' },
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
                    title={'Chính sách bảo mật'}
                    blackColor={true}
                />
                <TocClient
                    tableOfContents={tableOfContents}
                />

                <div className={styles.container}>
                    <h1 className={styles.title} id='chinh-sach-bao-mat-thong-tin'>CHÍNH SÁCH BẢO MẬT THÔNG TIN</h1>

                    <p className={styles.paragraph}>
                        Tại Inmax việc bảo vệ thông tin khách hàng rất quan trọng. Quý khách yên tâm khi cung cấp thông tin cho chúng tôi để sử dụng dịch vụ dán phim cách nhiệt.
                    </p>

                    <h2 className={styles.heading} id='muc-dich-thu-thap-thong-tin'>1. Mục đích và phạm vi thu thập</h2>
                    <p className={styles.paragraph}>
                        – Để truy cập và sử dụng một số dịch vụ tại website, quý khách có thể được yêu cầu đăng ký với chúng tôi thông tin cá nhân (thành viên), bao gồm:
                    </p>
                    <ul className={styles.list}>
                        <li>Email, Họ tên, Số ĐT liên lạc, địa chỉ, công ty, tên đăng nhập, mật khẩu</li>
                    </ul>

                    <p className={styles.paragraph}>
                        – Chúng tôi cũng thu thập thông tin về số lần viếng thăm, bao gồm số trang quý khách xem, số links (liên kết) bạn click, những thông tin khác liên quan đến việc kết nối đến website và các thông tin mà trình duyệt Web (Browser) quý khách sử dụng mỗi khi truy cập vào website của chúng tôi gồm: địa chỉ IP, loại Browser, ngôn ngữ sử dụng, thời gian và những địa chỉ mà Browser truy xuất đến.
                    </p>

                    <h2 className={styles.heading} id='pham-vi-su-dung-thong-tin'>2. Phạm vi sử dụng thông tin</h2>
                    <p className={styles.paragraph}>
                        Mục đích sử dụng thông tin Thành viên cung cấp để:
                    </p>
                    <ul className={styles.list}>
                        <li>Hỗ trợ khách hàng khi mua sản phẩm</li>
                        <li>Giải đáp thắc mắc khách hàng</li>
                        <li>Cung cấp cho khách hàng thông tin mới nhất trên Website của chúng tôi, thực hiện các khảo sát khách hàng, các hoạt động quảng bá liên quan đến các sản phẩm và dịch vụ của website nếu quý khách đăng kí nhận email thông báo</li>
                    </ul>

                    <h2 className={styles.heading} id='thoi-gian-luu-tru-thong-tin'>3. Thời gian lưu trữ thông tin</h2>
                    <p className={styles.paragraph}>
                        – Dữ liệu cá nhân của Thành viên sẽ được lưu trữ cho đến khi có yêu cầu hủy bỏ hoặc tự Thành viên đăng nhập và thực hiện hủy bỏ. Còn lại trong mọi trường hợp thông tin cá nhân Thành viên sẽ được bảo mật trên máy chủ của website.
                    </p>

                    <h2 className={styles.heading} id='dia-chi-quan-ly-thong-tin'>4. Địa chỉ của đơn vị thu thập và quản lý thông tin cá nhân</h2>
                    <div className={styles.companyContact}>
                        <p className={styles.paragraph}><strong>CÔNG TY TNHH THƯƠNG MẠI XNK NỘI THẤT Ô TÔ QUANG MINH</strong></p>
                        <p className={styles.paragraph}><strong>Địa chỉ:</strong> Số 12 Ngõ 44 Tư Đình, Phường Long Biên, Quận Long Biên, Thành phố Hà Nội</p>
                        <p className={styles.paragraph}><strong>Điện thoại:</strong> 1900 8113</p>
                        <p className={styles.paragraph}><strong>Email:</strong> inmax.quangminh@gmail.com</p>
                    </div>

                    <h2 className={styles.heading} id='phuong-tien-chinh-sua-thong-tin'>5. Phương tiện và công cụ để người dùng tiếp cận và chỉnh sửa dữ liệu cá nhân của mình</h2>
                    <ul className={styles.list}>
                        <li>Thành viên có quyền tự kiểm tra, cập nhật, điều chỉnh hoặc hủy bỏ thông tin cá nhân của mình bằng cách đăng nhập vào tài khoản và chỉnh sửa thông tin cá nhân hoặc yêu cầu website thực hiện việc này</li>
                        <li>Thành viên có quyền gửi khiếu nại về người bán đến Ban quản trị của website tại địa chỉ: inmax.quangminh@gmail.com hoặc HOTLINE <strong>1900 8113</strong> khi tiếp nhận những phản hồi này chúng tôi sẽ xác nhận lại thông tin, trường hợp đúng như phản ánh của Thành viên tùy theo mức độ, và sẽ có những biện pháp xử lý kịp thời</li>
                    </ul>

                    <h2 className={styles.heading} id='cam-ket-bao-mat-thong-tin'>6. Cam kết bảo mật thông tin cá nhân khách hàng</h2>
                    <ul className={styles.list}>
                        <li>Thông tin cá nhân của Thành viên trên website được chúng tôi cam kết bảo mật tuyệt đối theo chính sách bảo vệ thông tin cá nhân của website. Việc thu thập và sử dụng thông tin của mỗi Thành viên chỉ được thực hiện khi có sự đồng ý của khách hàng đó trừ những trường hợp pháp luật có quy định khác</li>
                        <li>Không sử dụng, không chuyển giao, cung cấp hay tiết lộ cho bên thứ 3 nào về thông tin cá nhân của Thành viên khi không có sự cho phép đồng ý từ Thành viên</li>
                        <li>Trong trường hợp máy chủ lưu trữ thông tin bị hacker tấn công dẫn đến mất mát dữ liệu cá nhân Thành viên, website sẽ có trách nhiệm thông báo vụ việc cho cơ quan chức năng điều tra xử lý kịp thời và thông báo cho Thành viên được biết</li>
                        <li>Bảo mật tuyệt đối mọi thông tin giao dịch trực tuyến của Thành viên bao gồm thông tin hóa đơn kế toán chứng từ số hóa tại khu vực dữ liệu trung tâm an toàn cấp 1 của website</li>
                        <li>Ban quản trị chúng tôi yêu cầu các cá nhân khi đăng ký/mua hàng là Thành viên, phải cung cấp đầy đủ thông tin cá nhân có liên quan như: họ và tên, địa chỉ liên lạc, email, số chứng minh nhân dân, điện thoại, số tài khoản, số thẻ thanh toán …., và chịu trách nhiệm về tính pháp lý của những thông tin trên. Ban quản trị website không chịu trách nhiệm cũng như không giải quyết mọi khiếu nại có liên quan đến quyền lợi của Thành viên đó nếu xét thấy tất cả thông tin cá nhân của Thành viên đó cung cấp khi đăng ký ban đầu là không chính xác</li>
                        <li>Ban quản trị khuyến cáo Thành viên nên bảo mật các thông tin liên quan đến mật khẩu truy xuất của mình và không nên chia sẻ với bất kỳ người nào khác. Nếu sử dụng máy tính chung nhiều người, Thành viên nên đăng xuất, hoặc thoát hết tất cả cửa sổ Website đang mở</li>
                    </ul>

                    <div className={styles.conclusion}>
                        <p className={styles.paragraph}>
                            <strong>Inmax hiểu rằng quyền lợi của Quý khách trong việc bảo vệ thông tin cá nhân cũng chính là trách nhiệm của chúng tôi</strong> nên trong bất kỳ trường hợp có thắc mắc, góp ý nào liên quan đến đến việc thông tin cá nhân bị sử dụng sai mục đích hoặc phạm vi đã thông báo vui lòng liên hệ qua số hotline <strong>1900 8113</strong> hoặc email: <a href="mailto:inmax.quangminh@gmail.com">inmax.quangminh@gmail.com</a>
                        </p>
                    </div>
                </div>
            </div>
        </ClientLayout>
    )
}

export default PolicyPage
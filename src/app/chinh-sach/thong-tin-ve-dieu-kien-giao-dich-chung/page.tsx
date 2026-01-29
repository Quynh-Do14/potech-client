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
        { id: 'chinh-sach-quy-dinh-chung', name: 'CHÍNH SÁCH & QUY ĐỊNH CHUNG' },
        { id: 'quy-dinh-thanh-toan', name: 'I. QUY ĐỊNH HÌNH THỨC THANH TOÁN' },
        { id: 'chinh-sach-van-chuyen', name: 'II. CHÍNH SÁCH VẬN CHUYỂN, GIAO HÀNG' },
        { id: 'chinh-sach-doi-tra-bao-hanh', name: 'III. CHÍNH SÁCH ĐỔI/TRẢ VÀ HOÀN TIỀN' },
        { id: 'truong-hop-bao-hanh', name: 'Trường hợp được bảo hành' },
        { id: 'truong-hop-khong-bao-hanh', name: 'Trường hợp không được bảo hành' },
        { id: 'luu-y-bao-hanh', name: 'Lưu ý về bảo hành' },
        { id: 'chinh-sach-doi-moi', name: 'Chính sách đổi mới sản phẩm' },
        { id: 'truong-hop-khong-doi-tra', name: 'Trường hợp không đổi/trả sản phẩm' },
        { id: 'chinh-sach-bao-mat', name: 'IV. CHÍNH SÁCH BẢO MẬT THÔNG TIN' },
        { id: 'muc-dich-thu-thap', name: '1. Mục đích và phạm vi thu thập' },
        { id: 'pham-vi-su-dung', name: '2. Phạm vi sử dụng thông tin' },
        { id: 'thoi-gian-luu-tru', name: '3. Thời gian lưu trữ thông tin' },
        { id: 'dia-chi-quan-ly', name: '4. Địa chỉ của đơn vị thu thập và quản lý thông tin cá nhân' },
        { id: 'phuong-tien-tiep-can', name: '5. Phương tiện và công cụ để người dùng tiếp cận và chỉnh sửa dữ liệu cá nhân của mình' },
        { id: 'cam-ket-bao-mat', name: '6. Cam kết bảo mật thông tin cá nhân khách hàng' },
        { id: 'thong-tin-cong-ty', name: 'CÔNG TY TNHH THƯƠNG MẠI XNK NỘI THẤT Ô TÔ QUANG MINH' },
    ];
    return (
        <ClientLayout>
            <BannerCommon
                bannerImg={banner}
            />
            <div className={`${styles.policyContainer} padding-common`}>
                <BreadcrumbCommon
                    breadcrumb={"Chính sách"}
                    redirect={ROUTE_PATH.TERMS_AND_CONDITIONS}
                    title={'Thông tin về điều kiện giao dịch chung'}
                    blackColor={true}
                />
                <TocClient
                    tableOfContents={tableOfContents}
                />

                <div className={styles.container}>
                    <h1 className={styles.title} id='chinh-sach-quy-dinh-chung'>CHÍNH SÁCH & QUY ĐỊNH CHUNG</h1>

                    <h2 className={styles.heading} id='quy-dinh-thanh-toan'>I. QUY ĐỊNH HÌNH THỨC THANH TOÁN</h2>
                    <p className={styles.paragraph}>
                        Khách hàng thanh toán ngay khi nhận hàng bằng tiền mặt. Trường hợp nếu khách hàng muốn thanh toán trước bằng hình thức chuyển khoản vui lòng làm việc với CSKH để được hỗ trợ.
                    </p>

                    <h2 className={styles.heading} id='chinh-sach-van-chuyen'>II. CHÍNH SÁCH VẬN CHUYỂN, GIAO HÀNG</h2>
                    <p className={styles.paragraph}>
                        – Nếu địa chỉ của khách hàng gần khu vực có tuyến giao hàng trực tiếp hoặc nhân viên của công ty thì trực tiếp công ty sẽ giao hàng cho khách tại địa chỉ khách hàng đăng ký.
                    </p>
                    <p className={styles.paragraph}>
                        – Tại các khu vực khác: Công ty sẽ chuyển hàng COD qua đường bưu điện cho khách hàng.
                    </p>

                    <h2 className={styles.heading} id='chinh-sach-doi-tra-bao-hanh'>III. CHÍNH SÁCH ĐỔI/TRẢ VÀ HOÀN TIỀN</h2>
                    <p className={styles.paragraph}>
                        Thời gian nhận và trả bảo hành: Các ngày trong tuần trừ Ngày lễ và chủ nhật (không quá 10 ngày kể từ khi nhận hàng).
                    </p>

                    <h3 className={styles.subHeading} id='truong-hop-bao-hanh'>Trường hợp được bảo hành</h3>
                    <ul className={styles.list}>
                        <li>Các sản phẩm có thời gian bảo hành 12 năm đối với lỗi do nhà sản xuất</li>
                        <li>Sản phẩm trong thời hạn bảo hành và còn nguyên vẹn bao bì</li>
                        <li>Sản phẩm được bảo hành theo quy định của nhà sản xuất</li>
                        <li>Quý khách xuất trình phiếu mua hàng khi yêu cầu bảo hành</li>
                    </ul>

                    <h3 className={styles.subHeading} id='truong-hop-khong-bao-hanh'>Trường hợp không được bảo hành</h3>
                    <ul className={styles.list}>
                        <li>Quá thời gian bảo hành</li>
                        <li>Phiếu bảo hành, tem bảo hành, số Serial bị rách, bị dán đè, bị sửa đổi hoặc không xác định được</li>
                        <li>Phim bị rách, trầy xước, kéo dãn, biến đổi hình dạng do ngoại lực, mưa gió, thiên tai mà không phải do lỗi kỹ thuật</li>
                        <li>Sản phẩm bị ẩm mốc, đổi màu,……do bảo quản không đúng qui định</li>
                        <li>Khách hàng tự ý can thiệp vào máy của sản phẩm hoặc đem đến một nơi nào khác sửa chữa</li>
                    </ul>

                    <h3 className={styles.subHeading} id='luu-y-bao-hanh'>Lưu ý về bảo hành</h3>
                    <p className={styles.paragraph}>
                        – Khách hàng chịu trách nhiệm cho chi phí vận chuyển đến trung tâm bảo hành.
                    </p>

                    <h3 className={styles.subHeading} id='chinh-sach-doi-moi'>Chính sách đổi mới sản phẩm</h3>
                    <p className={styles.paragraph}>
                        Nhằm đảm bảo quyền lợi người tiêu dùng, nâng cao chất lượng dịch vụ sau bán hàng, Chúng tôi đổi sản phẩm mới cùng loại nếu sản phẩm gặp sự cố không thể khắc phục được ngay (do lỗi kỹ thuật của nhà sản xuất). Sản phẩm chỉ được đổi khi đáp ứng đầy đủ các điều kiện sau dưới đây:
                    </p>
                    <ul className={styles.list}>
                        <li>Sản phẩm mới mua trong vòng 03 ngày kể từ ngày xuất bán. Khách hàng mua trực tuyến, thời gian được tính từ ngày khách nhận được sản phẩm</li>
                        <li>Sản phẩm không bị cũ, xước, biến dạng và thỏa mãn các điều kiện bảo hành</li>
                        <li>Sản phẩm nhận lại phải còn nguyên vẹn vỏ thùng, xốp và đầy đủ các phụ kiện kèm theo, quà khuyến mãi (nếu có)…</li>
                    </ul>

                    <h3 className={styles.subHeading} id='truong-hop-khong-doi-tra'>Trường hợp không chấp nhận đổi hoặc trả sản phẩm</h3>
                    <ul className={styles.list}>
                        <li>Quý khách muốn thay đổi chủng loại, mẫu mã sản phẩm</li>
                        <li>Lỗi do người sử dụng</li>
                        <li>Không chấp nhận các lỗi ngoại quan (xước, móp, méo, vỡ, sứt, tem rách, ẩm mốc,…) khi khách hàng đã mang sản phẩm ra khỏi cửa hàng</li>
                    </ul>

                    <h2 className={styles.heading} id='chinh-sach-bao-mat'>IV. CHÍNH SÁCH BẢO MẬT THÔNG TIN</h2>

                    <h3 className={styles.subHeading} id='muc-dich-thu-thap'>1. Mục đích và phạm vi thu thập</h3>
                    <ul className={styles.list}>
                        <li>Để truy cập và sử dụng một số dịch vụ tại website, quý khách có thể được yêu cầu đăng ký với chúng tôi thông tin cá nhân (thành viên), bao gồm: Email, Họ tên, Số ĐT liên lạc, địa chỉ, công ty, tên đăng nhập, mật khẩu</li>
                        <li>Chúng tôi cũng thu thập thông tin về số lần viếng thăm, bao gồm số trang quý khách xem, số links (liên kết) bạn click, những thông tin khác liên quan đến việc kết nối đến website và các thông tin mà trình duyệt Web (Browser) quý khách sử dụng mỗi khi truy cập vào website của chúng tôi gồm: địa chỉ IP, loại Browser, ngôn ngữ sử dụng, thời gian và những địa chỉ mà Browser truy xuất đến</li>
                    </ul>

                    <h3 className={styles.subHeading} id='pham-vi-su-dung'>2. Phạm vi sử dụng thông tin</h3>
                    <p className={styles.paragraph}>
                        Mục đích sử dụng thông tin Thành viên cung cấp để:
                    </p>
                    <ul className={styles.list}>
                        <li>Hỗ trợ khách hàng khi mua sản phẩm</li>
                        <li>Giải đáp thắc mắc khách hàng</li>
                        <li>Cung cấp cho khách hàng thông tin mới nhất trên Website của chúng tôi, thực hiện các khảo sát khách hàng, các hoạt động quảng bá liên quan đến các sản phẩm và dịch vụ của website nếu quý khách đăng kí nhận email thông báo</li>
                    </ul>

                    <h3 className={styles.subHeading} id='thoi-gian-luu-tru'>3. Thời gian lưu trữ thông tin</h3>
                    <p className={styles.paragraph}>
                        – Dữ liệu cá nhân của Thành viên sẽ được lưu trữ cho đến khi có yêu cầu hủy bỏ hoặc tự Thành viên đăng nhập và thực hiện hủy bỏ. Còn lại trong mọi trường hợp thông tin cá nhân Thành viên sẽ được bảo mật trên máy chủ của website.
                    </p>

                    <h3 className={styles.subHeading} id='dia-chi-quan-ly'>4. Địa chỉ của đơn vị thu thập và quản lý thông tin cá nhân</h3>
                    <h3 className={styles.subHeading} id='phuong-tien-tiep-can'>5. Phương tiện và công cụ để người dùng tiếp cận và chỉnh sửa dữ liệu cá nhân của mình</h3>
                    <ul className={styles.list}>
                        <li>Thành viên có quyền tự kiểm tra, cập nhật, điều chỉnh hoặc hủy bỏ thông tin cá nhân của mình bằng cách đăng nhập vào tài khoản và chỉnh sửa thông tin cá nhân hoặc yêu cầu website thực hiện việc này</li>
                        <li>Thành viên có quyền gửi khiếu nại về người bán đến Ban quản trị của website tại địa chỉ: inmax.quangminh@gmail.com hoặc hotline 1900 8113 khi tiếp nhận những phản hồi này chúng tôi sẽ xác nhận lại thông tin, trường hợp đúng như phản ánh của Thành viên tùy theo mức độ, và sẽ có những biện pháp xử lý kịp thời</li>
                    </ul>

                    <h3 className={styles.subHeading} id='cam-ket-bao-mat'>6. Cam kết bảo mật thông tin cá nhân khách hàng</h3>
                    <ul className={styles.list}>
                        <li>Thông tin cá nhân của Thành viên trên website được chúng tôi cam kết bảo mật tuyệt đối theo chính sách bảo vệ thông tin cá nhân của website. Việc thu thập và sử dụng thông tin của mỗi Thành viên chỉ được thực hiện khi có sự đồng ý của khách hàng đó trừ những trường hợp pháp luật có quy định khác</li>
                        <li>Không sử dụng, không chuyển giao, cung cấp hay tiết lộ cho bên thứ 3 nào về thông tin cá nhân của Thành viên khi không có sự cho phép đồng ý từ Thành viên</li>
                        <li>Trong trường hợp máy chủ lưu trữ thông tin bị hacker tấn công dẫn đến mất mát dữ liệu cá nhân Thành viên, website sẽ có trách nhiệm thông báo vụ việc cho cơ quan chức năng điều tra xử lý kịp thời và thông báo cho Thành viên được biết</li>
                        <li>Bảo mật tuyệt đối mọi thông tin giao dịch trực tuyến của Thành viên bao gồm thông tin hóa đơn kế toán chứng từ số hóa tại khu vực dữ liệu trung tâm an toàn cấp 1 của website</li>
                        <li>Ban quản trị chúng tôi yêu cầu các cá nhân khi đăng ký/mua hàng là Thành viên, phải cung cấp đầy đủ thông tin cá nhân có liên quan như: họ và tên, địa chỉ liên lạc, email, số chứng minh nhân dân, điện thoại, số tài khoản, số thẻ thanh toán …, và chịu trách nhiệm về tính pháp lý của những thông tin trên. Ban quản trị website không chịu trách nhiệm cũng như không giải quyết mọi khiếu nại có liên quan đến quyền lợi của Thành viên đó nếu xét thấy tất cả thông tin cá nhân của Thành viên đó cung cấp khi đăng ký ban đầu là không chính xác</li>
                        <li>Ban quản trị khuyến cáo Thành viên nên bảo mật các thông tin liên quan đến mật khẩu truy xuất của mình và không nên chia sẻ với bất kỳ người nào khác. Nếu sử dụng máy tính chung nhiều người, Thành viên nên đăng xuất, hoặc thoát hết tất cả cửa sổ Website đang mở</li>
                    </ul>

                    <h2 className={styles.heading} id='thong-tin-cong-ty'>CÔNG TY TNHH THƯƠNG MẠI XNK NỘI THẤT Ô TÔ QUANG MINH</h2>
                    <div className={styles.companyContact}>
                        <p className={styles.paragraph}><strong>Địa chỉ:</strong> Số 12 Ngõ 44 Tư Đình, Phường Long Biên, Quận Long Biên, Thành phố Hà Nội</p>
                        <p className={styles.paragraph}><strong>Điện thoại:</strong> 1900 8113</p>
                        <p className={styles.paragraph}><strong>Email:</strong> inmax.quangminh@gmail.com</p>
                    </div>
                </div>
            </div>
        </ClientLayout>
    )
}

export default PolicyPage
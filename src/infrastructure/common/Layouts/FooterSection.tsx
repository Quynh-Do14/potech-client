import styles from '@/assets/styles/components/footer.module.css';
import { ROUTE_PATH } from '@/core/common/appRouter';
import Link from 'next/link';

const FooterSection = () => {
    const menuItems = [
        {
            id: "home",
            label: "TRANG CHỦ",
            href: ROUTE_PATH.HOME_PAGE,
            icon: "fa-home"
        },
        {
            id: "introduce",
            label: "GIỚI THIỆU",
            href: ROUTE_PATH.INTRODUCE,
            icon: "fa-info-circle"
        },
        {
            id: "products",
            label: "SẢN PHẨM",
            href: ROUTE_PATH.PRODUCT,
            icon: "fa-car"
        },
        {
            id: "agency",
            label: "ĐẠI Lý",
            href: ROUTE_PATH.AGENCY,
            icon: "fa-building"
        },
        {
            id: "blog",
            label: "TIN TỨC",
            href: ROUTE_PATH.BLOG,
            icon: "fa-newspaper-o"
        },
        {
            id: "contact",
            label: "LIÊN HỆ",
            href: ROUTE_PATH.CONTACT,
            icon: "fa-phone"
        },
    ];

    const policy = [
        {
            id: "terms",
            label: "Thông tin về điều kiện giao dịch chung",
            href: ROUTE_PATH.TERMS_AND_CONDITIONS,
            icon: "fa-file-text"
        },
        {
            id: "privacy",
            label: "CHÍNH SÁCH BẢO MẬT",
            href: ROUTE_PATH.PRIVACY_POLICY,
            icon: "fa-shield"
        },
        {
            id: "purchase",
            label: "CHÍNH SÁCH MUA HÀNG",
            href: ROUTE_PATH.PURCHASE_POLICY,
            icon: "fa-shopping-cart"
        },
        {
            id: "warranty",
            label: "CHÍNH SÁCH BẢO HÀNH - ĐỔI TRẢ",
            href: ROUTE_PATH.WARRANTY_RETURN_POLICY,
            icon: "fa-refresh"
        },
        {
            id: "shipping",
            label: "Thông tin về vận chuyển và giao nhận",
            href: ROUTE_PATH.SHIPPING_DELIVERY_INFO,
            icon: "fa-truck"
        },
        {
            id: "payment",
            label: "Thông tin về các phương thức thanh toán",
            href: ROUTE_PATH.PAYMENT_METHODS_INFO,
            icon: "fa-credit-card"
        },
    ];

    return (
        <footer className={styles.footer}>
            <div className="padding-common-layout">
                <div className={styles.footerContainer}>
                    {/* Contact Section */}
                    <div className={styles.footerSection}>
                        <div className={styles.sectionTitle}>
                            LIÊN HỆ
                        </div>
                        <div className={styles.contactInfo}>
                            <div className={styles.companyInfo}>
                                Công ty TNHH Thương Mại XNK Nội Thất Ô Tô Quang Minh
                            </div>
                            <div className={styles.companyInfo}>
                                GPKD số 0107801299 do Sở KH và ĐT TP Hà Nội cấp ngày 12/04/2017
                            </div>
                            <div className={styles.companyInfo}>
                                Người đại diện: Ông Nguyễn Văn Ty
                            </div>
                            <div className={styles.contactDetails}>
                                <div className={styles.contactItem}>
                                    <i className={`fa fa-map-marker ${styles.contactIcon}`}></i>
                                    <span className={styles.contactText}>
                                        Địa chỉ: Số 12 Ngõ 44 Tư Đình – Tổ 5 – Phường Long Biên – Thành phố Hà Nội
                                    </span>
                                </div>
                                <div className={styles.contactItem}>
                                    <i className={`fa fa-map-marker ${styles.contactIcon}`}></i>
                                    <span className={styles.contactText}>
                                        Địa chỉ: Số 15 Tùng Thiện Vương – Phường Phú Định – Thành phố Hồ Chí Minh
                                    </span>
                                </div>
                                <div className={styles.contactItem}>
                                    <i className={`fa fa-envelope ${styles.contactIcon}`}></i>
                                    <span className={styles.contactText}>
                                        inmax.quangminh@gmail.com
                                    </span>
                                </div>
                                <div className={styles.contactItem}>
                                    <i className={`fa fa-phone ${styles.contactIcon}`}></i>
                                    <span className={styles.contactText}>
                                        1900.8113
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className={styles.footerSection}>
                        <div className={styles.sectionTitle}>
                            LIÊN KẾT NHANH
                        </div>
                        <ul className={styles.linksList}>
                            {menuItems.map((item) => (
                                <li className={styles.linkItem} key={item.id}>
                                    <Link href={item.href} className={styles.link}>
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Policies */}
                    <div className={styles.footerSection}>
                        <div className={styles.sectionTitle}>
                            CHÍNH SÁCH
                        </div>
                        <ul className={styles.linksList}>
                            {policy.map((item) => (
                                <li className={styles.linkItem} key={item.id}>
                                    <Link href={item.href} className={styles.link}>
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>


            <div className={styles.footerBottom}>
                <p>&copy; {new Date().getFullYear()} POTECH. Tất cả các quyền được bảo lưu.</p>
                <p>Chuyên gia phim cách nhiệt & chăm sóc ô tô hàng đầu Việt Nam</p>
            </div>
        </footer>
    );
};

export default FooterSection;
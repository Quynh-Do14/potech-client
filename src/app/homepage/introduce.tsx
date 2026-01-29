import React from 'react';
import introduce1 from '@/assets/images/introduce1.jpg';
import introduce2 from '@/assets/images/introduce2.jpg';
import introduce3 from '@/assets/images/introduce3.jpg';
import introduce4 from '@/assets/images/introduce4.jpg';
import introduce5 from '@/assets/images/introduce5.jpg';
import introduce6 from '@/assets/images/introduce6.jpg';
import styles from '@/assets/styles/pages/home/introduce.module.css'
const data = [
    {
        image: introduce1,
        title: 'Không cản sóng, duy trì kết nối 3G, 4G',
        content: 'Inmax áp dụng công nghệ phản xạ nhiệt hiện đại bậc nhất với những lỗ nhỏ li ti không gây cản trở sóng, nhiễu tín hiệu điện tử. Từ đó giúp duy trì kết nối 3G, 4G, Wifi vào các thiết bị thông minh của chủ xế và được sử dụng trong xe. Người dùng thoải mái nghe - gọi, tận hưởng tối đa các tiện ích giải trí mình mong muốn.'
    },
    {
        image: introduce2,
        title: 'Giảm lóa lên đến 55%',
        content: 'Tấm phim được cấu tạo từ những cấp phim thấp giúp giảm lóa tối ưu chống chói mắt, cải thiện tối đa tầm nhìn cho người lái, giúp họ tập trung quan sát đường tốt hơn, giảm thiểu nguy hiểm do tai nạn. Hơn thế, Inmax còn đóng vai trò giúp cản bớt ánh sáng từ đèn pha của các xe chạy làn ngược chiều, đảm bảo tài xế lưu thông an toàn vào buổi tối.'
    },
    {
        image: introduce3,
        title: 'Cản tia hồng ngoại, Cách nhiệt tối đa',
        content: 'Giảm tối đa lượng nhiệt tích tụ lên bề mặt kính, chênh lệch 10 độ so với dòng film cao cấp nhất trên thị trường và 15-20 độ so với đa số các dòng film thông thường. Bức xạ nhiệt, tia hồng ngoại khi chiếu đến bề mặt film cách nhiệt sẽ bị phản xạ gần như hoàn toàn ra môi trường bên ngoài.'
    },
    {
        image: introduce4,
        title: 'Độc quyền công nghệ phún xạ nhiệt 12 lớp kim loại',
        content: 'Sử dụng phún xạ 12 kim loại quý khác nhau, cấu trúc lớp phủ nhiều lớp này sẽ chặn hầu hết bức xạ hồng ngoại từ ánh sáng mặt trời, ngăn chặn tia UV gây hại đồng thời vẫn cho phép cải thiện khả năng truyền ánh sáng, tối ưu hóa khả năng hiển thị của người lái, mang lại hiệu suất và trải nghiệm tốt nhất. Hơn thế nữa, nó cũng không làm thay đổi diện mạo xế cưng của bạn, ngược lại còn là lựa chọn cao cấp cho sự thoải mái với vẻ ngoài sang trọng, thời thượng.'
    },
    {
        image: introduce5,
        title: 'Loại bỏ 99% tia UV',
        content: 'Sử dụng tấm phim cách nhiệt Inmax có khả năng giảm tới 99% tia UV đi qua kính. Tấm phim được tráng các lớp hợp chất giúp hấp thu tia UV lên trên bề mặt nhựa polyester. Từ đó, Inmax giúp giải quyết nhiều vấn đề từ những bức xạ do tia nắng mặt trời gây ra như sạm da, đen da, lão hóa, giảm thiểu khả năng gây ung thư da nguy hiểm, giúp bảo vệ tối ưu nhất sức khỏe làn da và mắt của bạn cũng như bất kỳ ai khi bước lên xe. Tia UV cũng chứa nguồn năng lượng lớn gây nên tình trạng nóng cho xe nên ngăn chặn được tia này cũng giúp giảm nhiệt đáng kể cho xế yêu của bạn.'
    },
    {
        image: introduce6,
        title: 'Bảo vệ môi trường',
        content: 'Thời điểm mùa hè, sử dụng điều hòa là nguyên nhân dẫn đến tiêu thụ điện năng lớn. Điều hòa sử dụng dung môi làm lạnh, phát sinh chất thải làm suy giảm tầng ozon. Phim cách nhiệt Inmax đóng vai trò lớn giúp giảm nhiệt, làm mát, giảm 30% công suất hoạt động của điều hòa, giúp xe hơi giảm tải sử dụng điện năng và giảm phát thải chất ô nhiễm ra môi trường.'
    },
]
const IntroduceSection = () => {
    return (
        <div className={styles.introduceContainer}>
            <div className={styles.pageHeader}>
                <h2 className={styles.mainTitle}>
                    Các tính năng vượt trội đem lại <span className={styles.highlight}>trải nghiệm tuyệt vời</span>
                </h2>
                {/* <p className={styles.subtTitle}>
                    Công nghệ bảo vệ & nâng cấp xe hơi chuyên nghiệp
                </p> */}
            </div>
            <div className={styles.introduceContent}>
                {data.map((item, index) => (
                    <div key={index} className={styles.card}>
                        <div
                            className={styles.imageContainer}
                            style={{
                                backgroundImage: `url(${item.image.src})`,
                                objectFit: 'cover'
                            }}
                        >
                            <h3 className={styles.title}>{item.title}</h3>
                            <h4 className={styles.content}>{item.content}</h4>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default IntroduceSection
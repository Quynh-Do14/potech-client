"use client"
import { Breadcrumb } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import styles from '@/assets/styles/components/breadcumb.module.css'
import { ROUTE_PATH } from '@/core/common/appRouter';
interface BreadcrumbCommonProps {
    breadcrumb: string;
    redirect: string;
    title: string;
    blackColor?: boolean;
}

const BreadcrumbCommon: React.FC<BreadcrumbCommonProps> = ({
    breadcrumb,
    title,
    redirect,
    blackColor = false,
}) => {
    const router = useRouter();
    const fontStyle = blackColor ? styles.font_style_black : styles.font_style_white;

    return (
        <div className={styles.breadcumb_container}>
            <div>
                {/* Cách 1: Suppress warning bằng cách ignore */}
                {/* @ts-ignore */}
                <Breadcrumb
                    className='flex items-center'
                    separator={<CaretRightOutlined className={fontStyle} />}
                    items={[
                        {
                            title: 'Trang chủ',
                            className: fontStyle,
                            onClick: () => router.push(ROUTE_PATH.HOME_PAGE),
                        },
                        ...(breadcrumb ? [{
                            title: breadcrumb,
                            className: fontStyle,
                            onClick: () => router.push(redirect)
                        }] : []),
                        {
                            title: title,
                            className: fontStyle,
                        },
                    ]}
                />
            </div>
        </div>
    );
};
export default BreadcrumbCommon
import Image from 'next/image'
import FooterSection from './FooterSection'
import HeaderSection from './HeaderSection'
import mess from '@/assets/images/icon/icon_mess.png';
import facebook from '@/assets/images/icon/icon_facebook.png';
import call from '@/assets/images/icon/icon_call.png';
import '@/assets/styles/components/MainLayout.css'
const ClientLayout = ({ ...props }: any) => {
    return (
        <div className="main-layout-client">
            <HeaderSection />
            {props.children}
            <FooterSection />
            <div className='social tel'>
                <a href="tel:19008113" className='social-item' data-tooltip="Gọi ngay 1900 8113">
                    <Image src={call} alt="Gọi ngay" />
                </a>
            </div>
            <div className='social media'>
                <a href="https://www.facebook.com/potech.vietnam"
                    target='_blank'
                    rel="noopener noreferrer"
                    className='social-item'
                    data-tooltip="Facebook RIMO">
                    <Image src={facebook} alt='RIMO' />
                </a>
                <a href="https://m.me/109804934943900"
                    target='_blank'
                    rel="noopener noreferrer"
                    className='social-item'
                    data-tooltip="Messenger RIMO">
                    <Image src={mess} alt='RIMO' />
                </a>
            </div>

        </div>
    )
}

export default ClientLayout
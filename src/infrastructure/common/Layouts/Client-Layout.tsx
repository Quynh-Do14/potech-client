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
                <a href="tel:1900988910" className='social-item' data-tooltip="1900 988 910">
                    <Image src={call} alt="Gọi ngay" />
                    <span>1900 988 910</span>
                </a>
            </div>
            <div className='social media'>
                <a href="https://www.facebook.com/potech.vietnam"
                    target='_blank'
                    rel="noopener noreferrer"
                    className='social-item'
                    data-tooltip="Facebook POTECH">
                    <Image src={facebook} alt='POTECH' />
                </a>
                <a href="https://m.me/109804934943900"
                    target='_blank'
                    rel="noopener noreferrer"
                    className='social-item'
                    data-tooltip="Messenger POTECH">
                    <Image src={mess} alt='POTECH' />
                </a>
            </div>

        </div>
    )
}

export default ClientLayout
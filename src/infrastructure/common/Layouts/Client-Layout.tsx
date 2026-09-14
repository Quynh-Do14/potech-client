import Image from 'next/image'
import FooterSection from './FooterSection'
import HeaderSection from './HeaderSection'
import mess from '@/assets/images/icon/icon_mess.png';
import facebook from '@/assets/images/icon/icon_facebook.png';
import tiktok from '@/assets/images/icon/icon_tiktok.png';
import youtube from '@/assets/images/icon/icon_youtube.png';
import call from '@/assets/images/icon/icon_call.png';
import '@/assets/styles/components/MainLayout.css'
const ClientLayout = ({ ...props }: any) => {
    return (
        <div className="main-layout-client">
            <HeaderSection />
            {props.children}
            <FooterSection />
            <div className='social tel'>
                <a href="tel:0866690889" className='social-item' data-tooltip="0866 690 889">
                    <Image src={call} alt="Gọi ngay" />
                    <span>0866 690 889</span>
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
                <a href="https://m.me/potech.vietnam"
                    target='_blank'
                    rel="noopener noreferrer"
                    className='social-item'
                    data-tooltip="Messenger POTECH">
                    <Image src={mess} alt='POTECH' />
                </a>
                <a href="https://www.tiktok.com/@potech.vn"
                    target='_blank'
                    rel="noopener noreferrer"
                    className='social-item'
                    data-tooltip="Tiktok POTECH">
                    <Image src={tiktok} alt='POTECH' />
                </a>
                <a href="www.youtube.com/@PotechViệtNam"
                    target='_blank'
                    rel="noopener noreferrer"
                    className='social-item'
                    data-tooltip="Youtube POTECH">
                    <Image src={youtube} alt='POTECH' />
                </a>
            </div>

        </div>
    )
}

export default ClientLayout
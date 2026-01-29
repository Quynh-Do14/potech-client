import FooterSection from './FooterSection'
import HeaderSection from './HeaderSection'

const ClientLayout = ({ ...props }: any) => {
    return (
        <div className="main-layout-client">
            <HeaderSection />
            {props.children}
            <FooterSection />
        </div>
    )
}

export default ClientLayout
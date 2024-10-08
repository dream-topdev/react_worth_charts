import { FC } from 'react'
import { Link } from 'react-router-dom'

import WorthChartLogo from '../../assets/WorthCharting.png'
import FacebookLogo from '../../assets/icons/facebook.svg'
import TwitterLogo from '../../assets/icons/twitter.svg'
import TelegramLogo from '../../assets/icons/telegram.svg'
import InstagramLogo from '../../assets/icons/instagram.svg'
import { BaseButton } from '../common/BaseButton'
import { useAuthContext } from '../../context/authContext'
import { useNavigate } from 'react-router-dom'

const Footer:FC = () => {
    const { session, signOutHandler } = useAuthContext()
    const navigate = useNavigate()
    return(
        <div>
            <div className="flex flex-row">
                <div className="relative flex items-center left-6 w-1/6">
                    <img src={WorthChartLogo} width={300} height={300} alt="worthchart" />
                </div>
                <div className="flex flex-col ml-8 w-4/6">
                    <div className="flex flex-row border-b-2 border-color-white gap-4 h-[116px]">
                        <Link to="/about" className="flex items-center font-mono">About</Link>
                        <Link to="/techmethod" className="flex items-center font-mono">Technique & Methodology</Link>
                        <Link to="/testimonials" className="flex items-center font-mono">Testimonials</Link>
                        <BaseButton text="subscribe" className="!bg-green-700 mt-[33px] h-[43px] w-[164px]  bg-color-brand-green border-color-brand-green border-2 font-mono text-xl hover:!bg-green-700"/>
                        {!session && (
                        <BaseButton
                            text="login"
                            className="mt-[33px] w-[114px]  h-[43px] bg-transparent border-color-brand-green border-2 font-mono text-xl hover:!bg-green-700"
                            onClick={() => {
                            navigate('/auth/login')
                            }}
                        />
                        )}
                        {session && (
                        <BaseButton
                            text="logout"
                            className="mt-[33px] w-[114px]  h-[43px] bg-transparent border-color-brand-green border-2 font-mono text-xl hover:!bg-green-700"
                            onClick={() => {
                            if (signOutHandler) {
                                signOutHandler()
                                navigate('/auth/login')
                            }
                            }}
                        />
                        )}
                    </div>
                    <div className="flex flex-row gap-4 h-[116px]">
                        <Link to="/privacy" className="flex items-center font-mono">Privacy Policy</Link>
                        <Link to="/tou" className="flex items-center font-mono">Terms of Use</Link>
                    </div>
                </div>
                <div className="flex flex-row-reverse w-1/6 gap-4 justify-center">
                    <img src={InstagramLogo} width={24} alt="instagram" className="relative -top-1/4"/>
                    <img src={TelegramLogo} width={24} alt="telegram" className="relative -top-1/4" />
                    <img src={TwitterLogo} width={24} alt="twitter" className="mr-4 relative -top-1/4" />
                    <img src={FacebookLogo} width={12} alt="facebook" className="relative -top-1/4"/>
                </div>
            </div>
        </div>
    )
}

export default Footer
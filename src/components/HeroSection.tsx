import Image from 'next/image'
import backHero from '../assets/images/hero/backHero.webp'
import frontHero from '../assets/images/hero/frontHero.webp'
import textHero from '../assets/images/hero/logoHero.svg'
import logoCasamiento from '../assets/images/hero/logoCasamiento.svg'
import chevron from '@/public/chevron.svg'
import '@/src/styles/invitation.css'
import { useEffect, useState } from 'react'

interface HeroProps {
    id: string;
}

export const HeroSection = ({ id }: HeroProps) => {

    const [visible, setVisible] = useState(true)

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 200) {
                setVisible(false)
            } else {
                setVisible(true)
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, []);

    return (
        <div id={id} className="fixed top-0 left-0 w-full h-dvh z-30 pointer-events-none">
            <div className="relative w-full h-dvh overflow-hidden">
                <div id="heroMask" className="absolute inset-0 z-30 pointer-events-none h-dvh bg-[#111117]">
                    <picture id='heroComplete' className='flex h-dvh w-vw object-cover justify-center relative'>
                        <Image id='backHero' src={backHero} alt="" className='h-dvh w-auto object-cover z-21 scale-140 ' />
                        <Image id='frontHero' src={frontHero} alt="" className='h-dvh w-auto absolute bottom-0 left-0 object-cover z-23 origin-bottom scale-120' />
                        <Image src={textHero} alt="" className='absolute z-22 top-1/3 -translate-y-11/20 w-[80vw] max-h-1/4' loading='eager' id='imgTextHero' />
                    </picture>
                </div>
                <Image
                    id='chevron'
                    src={chevron}
                    alt="Logo"
                    className={`w-[15vw] max-w-[60px] absolute mx-auto z-90 bottom-0 left-1/2 -translate-x-1/2 text-white animate-bounce duration-[1000ms] ${visible ? "opacity-100" : "opacity-0"}`}
                />

                <div id='dateLogo' className="absolute inset-0 z-20 opacity-0 flex flex-col items-center justify-center text-white">
                    <div className='relative w-full flex flex-col items-center'>
                        <Image
                            id='logoDate'
                            src={logoCasamiento}
                            alt="Logo"
                            className="w-[60vw] max-w-[300px] block mx-auto"
                        />
                        <h3 className='uppercase absolute z-2 text-center font-bold w-full top-[110%] text-(length:--h1size)'>
                            Disponible<br />el 9 de enero<br />de 2027
                        </h3>
                    </div>
                </div>

            </div>
        </div>
    )
}
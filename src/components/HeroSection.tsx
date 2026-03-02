import Image from 'next/image'
import backHero from '../assets/images/hero/backHero.webp'
import frontHero from '../assets/images/hero/frontHero.webp'
import textHero from '../assets/images/hero/logoHero.svg'
import logoCasamiento from '../assets/images/hero/logoCasamiento.svg'
import '@/src/styles/invitation.css'

interface HeroProps {
    id: string;
}

export const HeroSection = ({ id }: HeroProps) => {

    return (
        <div id={id} className="fixed top-0 left-0 w-full h-lvh z-30 pointer-events-none">
            <div className="relative w-full h-lvh overflow-hidden">
                <div id="heroMask" className="absolute inset-0 z-30 pointer-events-none h-lvh">
                    <picture id='heroComplete' className='flex h-lvh w-vw scale-125 object-cover justify-center relative'>
                        <Image src={backHero} alt="" className='h-lvh w-auto object-cover z-21' />
                        <Image src={frontHero} alt="" className='h-lvh w-auto absolute top-0 left-0 object-cover z-23 top-1/2 left-1/2 -translate-1/2' />
                        <Image src={textHero} alt="" className='absolute z-22 top-1/3 -translate-y-1/2 -translate-1/10 w-[80vw] max-h-1/4' loading='eager' id='imgTextHero' />
                    </picture>
                </div>

                <div
                    id='dateLogo'
                    className="absolute inset-0 z-20 opacity-0 flex flex-col items-center justify-center text-white"
                >
                    <Image id='logoDate' src={logoCasamiento} alt="Logo" className="z-22 w-[60vw]" />
                    <h3 className='uppercase absolute z-2 text-center font-bold w-full text-base/8 mt-10 bottom-1/5'>
                        Disponible<br />el 9 de enero<br />de 2027
                    </h3>
                </div>

            </div>
        </div>
    )
}
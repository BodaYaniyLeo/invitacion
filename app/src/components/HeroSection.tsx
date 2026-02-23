import Image from 'next/image'
import backHero from '../assets/images/backHero.svg'
import frontHero from '../assets/images/frontHero.svg'
import textHero from '../assets/images/logoHero.svg'
import logoCasamiento from '../assets/images/logoCasamiento.svg'
import '@/app/src/styles/invitation.css'

interface HeroProps {
    id: string;
}

export const HeroSection = ({ id }: HeroProps) => {

    return (
        <div id={id} className="fixed top-0 left-0 w-full h-dvh z-30 pointer-events-none">
            <div className="relative w-full h-dvh overflow-hidden">
                <div id="heroMask" className="absolute inset-0 z-30 pointer-events-none h-dvh">
                    <picture id='heroComplete' className='flex h-dvh w-dvw scale-110 object-cover justify-center relative'>
                        <Image src={backHero} alt="" className='h-dvh w-auto object-cover z-1' />
                        <Image src={frontHero} alt="" className='h-dvh w-auto absolute top-0 left-0 object-cover z-3 top-1/2 left-1/2 -translate-1/2' />
                        <Image src={textHero} alt="" className='absolute z-2 top-1/3 -translate-y-1/2 -translate-1/10 max-w-100 w-full max-h-1/4' id='imgTextHero' />
                    </picture>
                </div>

                <div id='dateLogo' className="absolute h-dvh inset-0 z-20 opacity-0 flex flex-col items-center justify-center text-white p-6">
                    <Image src={logoCasamiento} alt="Logo" className="absolute z-2 top-1/3 left-1/2 translateResize sizeImg max-w-100" />
                    <h3 className='uppercase absolute z-2 top-1/2 left-1/2 translateResize max-w-100 text-center font-bold w-full text-base/8 mt-10'>
                        Disponible<br />el 9 de enero<br />de 2027
                    </h3>
                </div>

            </div>
        </div>
    )
}
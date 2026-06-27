'use client'
import '@/src/styles/invitation.css'
import Image from 'next/image';
import footerLogoP from '../assets/images/footer/footerLogoP.svg'
import footerLogoS from '../assets/images/footer/footerLogoS.svg'
import { ArrayElements } from '@/app/page'

interface finalType {
    data: ArrayElements
}

export const FinalLogo = ({
    data,
}: finalType) => {

    return (
        <div
            id="finalLogo"
            className="absolute top-1/2 -translate-y-1/2 w-full flex flex-col justify-center items-center text-white px-6 pointer-events-auto py-2 invisible"
        >
            <div id='finalAnimation' className="flex flex-col items-center justify-center bg-[#111117]">
                {data.guests.length > 1
                    ? <Image src={footerLogoP} alt="Logo" className="w-[50vw] max-w-80 mb-4 scale-120" />
                    : <Image src={footerLogoS} alt="Logo" className="w-[50vw] max-w-80 mb-4 scale-120" />
                }
            </div>
        </div>
    );
};
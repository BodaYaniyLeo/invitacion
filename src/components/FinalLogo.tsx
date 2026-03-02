'use client'
import '@/src/styles/invitation.css'
import Image from 'next/image';
import logoCasamiento from '../assets/images/logoCasamiento.svg'
import { useEffect, useState } from 'react';
import { ArrayElements, VideoProps } from './Invitation'

export const FinalLogo = ({
    data,
}: VideoProps) => {

    const [dataGuest, setDataGuest] = useState<ArrayElements[]>([])

    useEffect(() => {
        const guest = data
        setDataGuest(guest)
    }, [data])

    const discount = dataGuest[0]?.payment_coverage

    return (
        <div
            id='finalLogo'
            className="w-full flex flex-col justify-center items-center opacity-0 invisible"
        >
            <div id='finalAnimation' className="flex flex-col items-center justify-center text-white p-6">
                <Image src={logoCasamiento} alt="Logo" className="w-50" />
                {discount < 1 ?
                    <>
                        <h3 className='uppercase text-center font-bold text-base/8 mt-10'>
                            Confirmar<br /> antes del 9 de noviembre<br />de 2026
                        </h3>
                    </>
                    : <>
                        <h3 className='uppercase text-center font-bold text-base/8 mt-10'>
                            Te esperamos!
                        </h3>
                    </>
                }
            </div>
        </div>
    )
};
'use client'
import '@/src/styles/invitation.css'
import Image from 'next/image';
import logoCasamiento from '../assets/images/hero/logoCasamiento.svg'
import { useEffect, useState } from 'react';
import { VideoProps } from './Invitation'
import { guestsObj } from '@/app/page'

export const Price = ({
    id,
    data,
}: VideoProps) => {

    const [dataGuest, setDataGuest] = useState<guestsObj[]>([])
    const [discount, setDiscount] = useState<number>(0)

    useEffect(() => {
        const guest = data[0].guests
        setDataGuest(guest)
        if (guest[0].payment_coverage) {
            setDiscount(guest[0].payment_coverage)
        }
    }, [data])

    return (
        <div
            id={id}
            className="absolute top-1/2 -translate-y-1/2 w-full flex flex-col justify-center items-center text-white px-6 pointer-events-auto py-2 invisible"
        >
            <div id='finalAnimation' className="flex flex-col items-center justify-center">
                <Image src={logoCasamiento} alt="Logo" className="max-w-[50vw] mb-4" />

                <div id='textFinalContainer' className='flex flex-col h-full justify-center'>
                    <div id='textFinal'>
                        <div id='textFinalInner'>
                            {discount < 1 ? (
                                <h3 className='uppercase text-center font-bold text-base/7'>
                                    Pre compra hasta el 9 de noviembre de 2026
                                </h3>
                            ) : (
                                <h3 className='uppercase text-center font-bold text-base/7'>
                                    Confirmar antes del 9 de noviembre de 2026
                                </h3>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
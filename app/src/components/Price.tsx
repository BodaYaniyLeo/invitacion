'use client'
import '@/app/src/styles/invitation.css'
import Image from 'next/image';
import logoCasamiento from '../assets/images/hero/logoCasamiento.svg'
import { useEffect, useState } from 'react';
import { AnswerComponent } from './AnswerComponent';
import { createBrowserSupabaseClient } from '@/app/lib/supabase/client';

export type ArrayElements = {
    id: number;
    name: string;
    lastname: string;
    payment_coverage: number;
    state: string;
    confirm: boolean;
}

interface VideoProps {
    id: string;
    data: ArrayElements[];
}

export const Price = ({
    id,
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
            id={id}
            className="w-full flex flex-col justify-center items-center text-white px-6 pointer-events-auto py-2"
        >
            <div id='finalAnimation' className="flex flex-col items-center justify-center hidden">
                <Image src={logoCasamiento} alt="Logo" className="max-w-[50vw] mb-4" />

                <div id='textFinalContainer' className='flex flex-col h-full justify-center px-[10vw]'>
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
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
    idText: string;
    data: ArrayElements[];
}

export const Price = ({
    id,
    idText,
    data,
}: VideoProps) => {

    const [dataGuest, setDataGuest] = useState<ArrayElements[]>([])

    const priceTarj = 160000

    useEffect(() => {
        const guest = data
        setDataGuest(guest)
    }, [data])

    const discount = dataGuest[0]?.payment_coverage

    const supabase = createBrowserSupabaseClient();

    const sendChanges = async () => {

        const { data, error } = await supabase
            .from('guests')
            .upsert(dataGuest)
            .select()

        if (error) {
            console.log(error.message)
        } else {
            alert("¡Gracias por confirmar!");
        }

    }

    return (
        <div
            id={id}
            className="w-full h-full flex flex-col justify-center items-center text-white px-6 pointer-events-auto"
        >
            <div id='finalAnimation' className="flex flex-col items-center justify-center opacity-0 invisible mb-4">
                <Image src={logoCasamiento} alt="Logo" className="max-w-[50dvw] mb-4" />
                {discount < 1 ? (
                    <div className='flex flex-col content-between'>
                        <h3 className='uppercase text-center font-bold text-base/7'>
                            Pre compra hasta <br /> el 9 de noviembre de 2026
                        </h3>
                    </div>
                ) : (
                    <h3 className='uppercase text-center font-bold text-base/7'>
                        Confirmar antes del 9 de noviembre de 2026
                    </h3>
                )}

            </div>

            <div id={idText} className="flex flex-col w-full max-w-md max-h-[50dvh] bg-white/5 p-4 rounded-xl backdrop-blur-sm  opacity-0 invisible">
                <p className="flex-none pb-4 font-bold text-center uppercase tracking-wider text-sm">
                    Confirmar asistencia
                </p>

                <div
                    className="flex-1 overflow-y-auto min-h-0 py-2 border-y border-white/10 custom-scrollbar"
                    data-lenis-prevent
                >
                    {dataGuest?.map(g => (
                        <div key={g.id} className="mb-6 last:mb-0 px-2">
                            <h4 className="mb-2 text-sm">{g.name} {g.lastname}</h4>
                            <AnswerComponent
                                id={g.id}
                                setDataGuest={setDataGuest}
                                confirm={g.confirm}
                            />
                        </div>
                    ))}
                </div>

                <div className="flex-none pt-4">
                    {discount < 1 &&
                        <p className="text-xs text-center mb-4 opacity-70">
                            Precio sugerido al público: ${priceTarj - priceTarj * (dataGuest[0]?.payment_coverage || 0)}
                        </p>
                    }

                    <button
                        className="w-full py-3 bg-[#960696] text-black font-bold rounded-lg uppercase text-xs tracking-widest hover:bg-gray-200 transition-colors"
                        onClick={() => sendChanges()}
                    >
                        Enviar respuesta
                    </button>
                </div>
            </div>
        </div>
    );
};
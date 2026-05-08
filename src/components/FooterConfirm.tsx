'use client'
import '@/src/styles/invitation.css'
import { useEffect, useState } from 'react';
import { AnswerComponent } from './AnswerComponent';
import { createBrowserSupabaseClient } from '@/app/lib/supabase/client';
import { VideoProps } from '@/src/components/Invitation';
import { guestsObj } from '@/app/page'

export const FooterConfirm = ({
    id,
    data,
}: VideoProps) => {

    const [dataGuest, setDataGuest] = useState<guestsObj[]>([])
    const [discount, setDiscount] = useState<number>(0)
    const [price, setPrice] = useState<string | null>(null)


    const priceTarj = 160000

    useEffect(() => {
        const guest = data[0].guests
        setDataGuest(guest)
        if (guest[0].payment_coverage) {
            setDiscount(guest[0].payment_coverage)
        }
    }, [data])

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

    useEffect(() => {
        const priceSet = new Intl.NumberFormat('es-ES').format(priceTarj - priceTarj * (discount || 0))
        setPrice(priceSet)
    }, [priceTarj])


    return (
        <div

            className="px-6 pointer-events-auto py-2 justify-items-center absolute bottom-0 w-full"
        >
            <div id={id} className="flex flex-col w-full max-w-200 max-h-[50dvh] bg-white/5 p-4 rounded-xl backdrop-blur-sm  opacity-0 invisible">
                <p className="flex-none text-white pb-4 font-bold text-center uppercase tracking-wider text-(length:--h5size)">
                    Confirmar asistencia
                </p>

                <div
                    className="flex-1 overflow-y-auto min-h-0 py-2 border-y border-white/10 custom-scrollbar lg:px-4"
                    data-lenis-prevent
                >
                    {dataGuest?.map(g => (
                        <div key={g.id} className="mb-5 last:mb-0 px-2 flex justify-between">
                            <h4 className="py-2 text-white text-(length:--h4size)">{g.name} {g.lastname}</h4>
                            <AnswerComponent
                                id={g.id}
                                setDataGuest={setDataGuest}
                                confirm={g.confirm}
                            />
                        </div>
                    ))}
                </div>

                <div className="flex-none py-4 text-white">
                    {discount < 1 &&
                        <p className="text-center mb-4 opacity-70">
                            Precio por tarjeta: ${price} *
                        </p>
                    }

                    <button
                        className="w-full py-3 bg-[#960696] text-white font-bold rounded-lg uppercase hover:bg-gray-200 transition-colors"
                        onClick={() => sendChanges()}
                    >
                        Enviar respuesta
                    </button>
                </div>
                <p className='text-[length:12px] lg:text-[length:16px] text-white'>
                    * Invitación sin obligación de compra, <b className='text-red-300'>pero considere que su presencia es el mejor regalo</b>. Las tarifas están sujetas a ajustes según la fecha de pago.
                </p>
            </div>
        </div>
    );
};
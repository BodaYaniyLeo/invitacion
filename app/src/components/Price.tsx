'use client'
import '@/app/src/styles/invitation.css'
import Image from 'next/image';
import logoCasamiento from '../assets/images/logoCasamiento.svg'
import { useEffect, useState } from 'react';
import { AnswerComponent } from './AnswerComponent';
import { createClient } from '@/app/lib/supabase';
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
        }

        console.log(data)
    }

    return (
        <div
            id={id}
            className="fixed w-full h-screen top-0 flex flex-col justify-center items-center opacity-0 invisible"
        >
            <div id='lala' className="flex flex-col items-center justify-center text-white p-6 toScale">
                <Image src={logoCasamiento} alt="Logo" className="sizeImg max-w-100" />
                {discount < 1 ?
                    <>
                        <h3 className='uppercase max-w-100 text-center font-bold w-full text-base/8 mt-10'>
                            Pre compra<br /> hasta el 9 de noviembre<br />de 2026
                        </h3>
                    </>
                    : <>
                        <h3 className='uppercase max-w-100 text-center font-bold w-full text-base/8 mt-10'>
                            Te esperamos!
                        </h3>
                    </>
                }
            </div>
            <div id={idText} className=' opacity-0 invisible'>
                <p>Confirmar asistencia</p>
                {dataGuest?.map(g =>
                    <div key={g.id}>
                        <p>{g.name} {g.lastname}</p>
                        <AnswerComponent
                            id={g.id}
                            setDataGuest={setDataGuest}
                            confirm={g.confirm}
                        />
                    </div>

                )}
                {discount < 1 &&
                    <p>Precio sugerido al publico ${priceTarj - priceTarj * dataGuest[0].payment_coverage}</p>
                }

                <button onClick={() => { sendChanges() }}>Enviar respuesta</button>
            </div>

        </div>
    )
};
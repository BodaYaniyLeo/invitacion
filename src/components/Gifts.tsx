"use client"

import { useEffect, useLayoutEffect, useState } from "react"
import { gsap } from 'gsap'
import Image, { StaticImageData } from "next/image"
import { ScrollTrigger } from "gsap/ScrollTrigger";
import '@/src/styles/invitation.css'
import { ArrayElements, typePay } from '@/app/page'


interface MenuProps {
    data: ArrayElements;
    infoPay: typePay[];
}

interface itineraryObj {
    id: string,
    image: StaticImageData | string,
    text: string,
    horario: string
}

export const Gifts = ({
    data,
    infoPay
}: MenuProps) => {

    const [discount, setDiscount] = useState<number>(0)
    const [price, setPrice] = useState<number>(0)
    const [textoCopiado, setTextoCopiado] = useState<string>('Texto a copiar');
    const [estadoBoton, setEstadoBoton] = useState<string>('Copiar');

    useEffect(() => {
        const guest = data.payment_coverage
        if (guest) {
            setDiscount(guest)
        }
    }, [data])

    useEffect(() => {
        const priceData = infoPay.find(s => s.id === "value")
        if (priceData) {
            setPrice(priceData.value)
        }
    }, [infoPay])

    useLayoutEffect(() => {

        gsap.registerPlugin(ScrollTrigger);

        const giftsTl = gsap.timeline({
            scrollTrigger: {
                trigger: "#gifts",
                start: 'top 66%',
                end: '+=133%',
                scrub: 0.5,
            }
        });

        giftsTl
            .addLabel("giftsInit")
            .to('#giftsText', {
                maskImage: "radial-gradient(at 20% -120vh, rgb(254,254,254) 0vh, rgba(0,0,0,0) 200vh)",
                webkitMaskImage: "radial-gradient(at 20% -120vh, rgb(254,254,254) 0vh, rgba(0,0,0,0) 200vh)",
                duration: 2.5
            }, 'giftsInit')
            .to('#giftsTextInner', {
                backgroundImage: 'radial-gradient(circle at 40.0899% 1.7982vh, rgb(255,179,135) 0%, rgb(252,82,68) 69.5%, rgb(156,47,106) 99.4%, rgba(32,31,66,0) 149.1%)',
                duration: 5
            }, 'giftsInit')
            .to('#giftsText', {
                autoAlpha: 0,
                duration: 0.6
            }, "giftsInit+=5")

    }, [])

    const copyInfo = async (copyText: string | undefined) => {
        if (!copyText) return
        try {
            await navigator.clipboard.writeText(copyText);
            setEstadoBoton('¡Copiado!');
            setTimeout(() => setEstadoBoton('Copiar'), 2000); // Vuelve al estado original
        } catch (err) {
            console.error('Error al copiar el texto: ', err);
        }
    };

    if (discount === 1) {
        return (
            <div
                id='gifts'
                className="z-10 flex flex-col items-center justify-center overflow-hidden -scroll-m-[50dvh]"
            >
                <div id='giftsText' className='flex flex-col lg:max-w-[80%] justify-center mx-4'>
                    <div id='giftsTextInner'>
                        <h2 className='text-(length:--h1size)'>Regalos</h2>
                        <p className='w-full mt-6 text-(length:--h3size)'>
                            El mejor regalo es tu presencia en nuestro gran día.
                            <br />
                            Queremos compartir y celebrar junto a las personas que más amamos.
                            <br />
                            Si de todas formas querés darnos un empujón para arrancar esta nueva aventura, nos ayudás un montón colaborando con nuestra luna de miel.
                            <br />
                            <div className="flex justify-between my-8">
                                <button className="
                                btn-send px-3 py-2 rounded-lg transition-all 
                                active:scale-[0.98] w-fit min-w-40" onClick={() => copyInfo(infoPay.find(s => s.id === "regalo")?.data.alias)}>
                                    Copiar alias
                                </button>
                                <br />
                                <br />
                                <button className="
                                btn-send px-3 py-2 rounded-lg transition-all 
                                active:scale-[0.98] w-fit min-w-40" onClick={() => copyInfo(infoPay.find(s => s.id === "regalo")?.data.cbu)}>
                                    Copiar CBU
                                </button>
                            </div>
                            Por favor, confirmar asistencia antes del 15 de noviembre de 2026.
                        </p>
                    </div>
                </div>


            </div>
        )
    } else {
        return (
            <div
                id='gifts'
                className="h-[100hv] z-10 flex flex-col items-center justify-center overflow-hidden "
            >
                <div id='giftsText' className='flex flex-col lg:max-w-[80%] justify-center mx-4'>
                    <div id='giftsTextInner'>
                        <h2 className='text-(length:--h1size)'>Info!</h2>
                        <p className='w-full mt-6 text-(length:--h3size)'>
                            El mejor regalo es tu presencia en nuestro gran día.
                            <br />
                            Queremos compartir y celebrar junto a las personas que más amamos.
                            <br />
                            Para confirmar tu asistencia, te solicitamos realizar la reserva de tu lugar. El valor de la tarjeta es de ${price - (price * discount)} por persona.
                            <br />
                            <br />
                            Por favor, confirmar asistencia antes del 15 de noviembre de 2026.
                            <div className="flex justify-between my-8">
                                <button className="
                                btn-send px-3 py-2 rounded-lg transition-all 
                                active:scale-[0.98] w-fit min-w-40"
                                    onClick={() => copyInfo(infoPay.find(s => s.id === "tarjeta")?.data.alias)}>
                                    Copiar alias
                                </button>
                                <button className="
                                btn-send px-3 py-2 rounded-lg transition-all 
                                active:scale-[0.98] w-fit min-w-40"
                                    onClick={() => copyInfo(infoPay.find(s => s.id === "tarjeta")?.data.cbu)}>
                                    Copiar CBU
                                </button>
                            </div>
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}

"use client"

import { useEffect, useLayoutEffect, useState } from "react"
import { gsap } from 'gsap'
import Image, { StaticImageData } from "next/image"
import { ScrollTrigger } from "gsap/ScrollTrigger";
import '@/src/styles/invitation.css'
import { ArrayElements } from '@/app/page'


interface MenuProps {
    data: ArrayElements;
}

interface itineraryObj {
    id: string,
    image: StaticImageData | string,
    text: string,
    horario: string
}

export const Gifts = ({
    data
}: MenuProps) => {

    const [discount, setDiscount] = useState<number>(0)

    const invitationPrice = 160000

    useEffect(() => {
        const guest = data.payment_coverage
        if (guest) {
            setDiscount(guest)
        }
    }, [data])

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

    if (discount === 1) {
        return (
            <div
                id='gifts'
                className="z-10 flex flex-col items-center justify-center overflow-hidden"
            >
                <div id='giftsText' className='flex flex-col lg:max-w-[80%] justify-center mx-4'>
                    <div id='giftsTextInner'>
                        <h2 className='text-(length:--h1size)'>Regalos</h2>
                        <p className='w-full mt-6 text-(length:--h3size)'>
                            "Nos miramos, dijimos '¿por qué no?' y... ¡acá estamos! Nos casamos y se viene un fiestón."
                            <br />
                            <br />
                            El mejor regalo es tu presencia en nuestro gran día. Queremos compartir y celebrar junto a las personas que más amamos.<br />
                            Si de todas formas querés darnos un empujón para arrancar esta nueva aventura, nos ayudás un montón colaborando con nuestra luna de miel.
                        </p>
                    </div>
                </div>
              

            </div>
        )
    } else if (discount === 0) {
        return (
            <div
                id='gifts'
                className="h-[100hv] z-10 flex flex-col items-center justify-center overflow-hidden"
            >
                <div id='giftsText' className='flex flex-col lg:max-w-[80%] justify-center mx-4'>
                    <div id='giftsTextInner'>
                        <h2 className='text-(length:--h1size)'>Tarjetas</h2>
                        <p className='w-full mt-6 text-(length:--h3size)'>
                            "Nos miramos, dijimos '¿por qué no?' y... ¡acá estamos! Nos casamos y se viene un fiestón."
                            <br />
                            El mejor regalo es tu presencia en nuestro gran día. Queremos compartir y celebrar junto a las personas que más amamos.
                            <br />
                            <br />
                            Para confirmar tu asistencia, te solicitamos realizar la reserva de tu lugar. El valor de la tarjeta es de ${invitationPrice} por persona.
                            <br />
                            Por favor, confirmar asistencia antes del 11 de noviembre de 2026.
                        </p>
                    </div>
                </div>

            </div>
        )
    } else {
        return (
            <div
                id='gifts'
                className="h-[100hv] z-10 flex flex-col items-center justify-center overflow-hidden"
            >
                <div id='giftsText' className='flex flex-col lg:max-w-[80%] justify-center mx-4'>
                    <div id='giftsTextInner'>
                        <h2 className='text-(length:--h1size)'>Tarjetas</h2>
                        <p className='w-full mt-6 text-(length:--h3size)'>
                            "Nos miramos, dijimos '¿por qué no?' y... ¡acá estamos! Nos casamos y se viene un fiestón."
                            <br />
                            El mejor regalo es tu presencia en nuestro gran día. Queremos compartir y celebrar junto a las personas que más amamos.
                            <br />
                            <br />
                            Para confirmar tu asistencia, te solicitamos realizar la reserva de tu lugar. El valor de la tarjeta es de ${invitationPrice / 2} por persona.
                            <br />
                            Por favor, confirmar asistencia antes del 11 de noviembre de 2026.
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}

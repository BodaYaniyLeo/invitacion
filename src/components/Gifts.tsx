"use client"

import { useEffect, useLayoutEffect, useState } from "react"
import { gsap } from 'gsap'
import { StaticImageData } from "next/image"
import { ScrollTrigger } from "gsap/ScrollTrigger";
import '@/src/styles/invitation.css'
import { ArrayElements, typePay } from '@/app/page'
import { CopyButtons } from "./CopyButtons";


interface MenuProps {
    data: ArrayElements;
    infoPay: typePay[];
}

export const Gifts = ({
    data,
    infoPay
}: MenuProps) => {

    const [discount, setDiscount] = useState<number>(0)
    const [price, setPrice] = useState<typePay>({ data: [], id: "", value: 0 })

    useEffect(() => {
        const guest = data.payment_coverage
        if (guest) {
            setDiscount(guest)
        }
    }, [data])

    useEffect(() => {
        let priceData
        if (discount === 1) {
            priceData = (infoPay.find(f => f.id === "regalo"))
        } else {
            priceData = (infoPay.find(f => f.id === "tarjeta"))
        }
        if (priceData) {
            setPrice(priceData)
        }

    }, [infoPay, discount])

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {

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
                }, "giftsInit+=5");

        });

        return () => ctx.revert();

    }, []);

    return (
        <div
            id='gifts'
            className="z-10 flex flex-col items-center justify-center max-w-[1000px] lg:justify-self-center"
        >
            <div id='giftsText' className='flex flex-col lg:max-w-[80%] justify-center mx-4'>
                <div id='giftsTextInner'>
                    <h2 className='text-(length:--h1size)'>{discount === 1 ? "Regalos" : "Info!"}</h2>
                    <p className='w-full mt-6 text-(length:--h3size)'>
                        El mejor regalo es tu presencia en nuestro gran día.
                        <br />
                        Queremos compartir y celebrar junto a las personas que más amamos.
                        <br />
                        <br />
                        {discount === 1
                            ? "Si de todas formas querés darnos un empujón para arrancar esta nueva aventura, nos ayudás un montón colaborando con nuestra luna de miel."
                            : `Para confirmar tu asistencia, te solicitamos realizar la reserva de tu lugar. El valor de la tarjeta es de $${price && price.value - (price.value * discount)} por persona.`
                        }
                        <br />
                        <br />
                        Por favor, confirmar asistencia antes del 15 de noviembre de 2026.
                    </p>
                    <br />
                    <div className="flex justify-around">
                        {price.data.map((p, index) => {
                            return (
                                <CopyButtons key={index} countPay={Object.values(p).join(' ')} buttonType={Object.keys(p).join(' ')} />
                            )
                        })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

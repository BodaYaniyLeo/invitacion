'use client'
import '@/src/styles/invitation.css'
import { useEffect, useLayoutEffect, useState } from 'react';
import { AnswerComponent } from './AnswerComponent';
import { VideoProps } from '@/src/components/Invitation';
import { guestsObj } from '@/app/page'
import { sendChanges } from '../helpers/sendAnswer';
import { gsap } from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const FooterConfirm = ({
    id,
    data,
}: VideoProps) => {

    const [dataGuest, setDataGuest] = useState<guestsObj[]>([])
    const [discount, setDiscount] = useState<number>(0)
    const [price, setPrice] = useState<string | null>(null)
    const [textButton, setTextButton] = useState<string>("Enviar respuesta")
    const [animateButton, setAnimateButton] = useState<boolean>(false)

    const priceTarj = 160000

    useEffect(() => {
        const guest = data.payment_coverage
        setDataGuest(data.guests)
        if (guest) {
            setDiscount(guest)
        }
    }, [data])

    useEffect(() => {
        const priceSet = new Intl.NumberFormat('es-ES').format(priceTarj - priceTarj * (discount || 0))
        setPrice(priceSet)
    }, [priceTarj])

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const logoFooterTl = gsap.timeline({
            scrollTrigger: {
                trigger: "#footerConfirm",
                start: "top 66%",
                end: "+=34%",
                scrub: 0.5,
            }
        });

        logoFooterTl
            .to("#confirmData", { autoAlpha: 1, y: 0, duration: 0.3 })

    }, [])

    return (
        <div className="px-6 pointer-events-auto py-2 justify-items-center w-full bg-[#111117] content-center mb-10 min-h-[45dvh]">
            <div id={id} className="flex flex-col w-full max-w-120 rounded-xl backdrop-blur-md opacity-0 invisible translate-y-4">
                <p className="title-confirm flex-none pb-4 font-bold text-center uppercase tracking-wider text-(length:--h4size)">
                    Confirmar asistencia
                </p>

                <div
                    className="flex-1 min-h-0 py-2 border-y border-white/10 custom-scrollbar lg:px-4"
                    data-lenis-prevent
                >
                    {dataGuest?.map(g => (
                        <div key={g.id} className="mb-5 last:mb-0 flex justify-between items-center gap-4">
                            <h2 className="guest-name py-2 text-(length:--h5size)">{g.name} {g.lastname}</h2>
                            <AnswerComponent
                                id={g.id}
                                setDataGuest={setDataGuest}
                                confirm={g.confirm}
                                status={"confirm"}
                            />
                        </div>
                    ))}
                </div>

                <button
                    className="btn-send px-3 py-2 font-bold rounded-lg uppercase 
                    transition-all active:scale-[0.98] w-fit self-end mt-4 min-w-40"
                    onClick={() => sendChanges({ guests: dataGuest, setTextButton, setAnimateButton })}
                >
                    <span
                        className={`${animateButton ? "opacity-0" : "opacity-100"} duration-500
                                    font-[family-name:var(--fontNormal)] 
                                    `}
                    >
                        {textButton}
                    </span>
                </button>
            </div>
        </div>
    );
};
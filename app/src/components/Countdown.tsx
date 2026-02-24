"use client"

import { useEffect, useLayoutEffect, useState } from "react"
import { gsap } from 'gsap'
import rings from "@/app/src/assets/images/countdown/ringsIcon1.svg"
import loadRing from "@/app/src/assets/images/countdown/loadRing.svg"
import auto from "@/app/src/assets/images/countdown/auto.webp"
import bolso from "@/app/src/assets/images/countdown/bolso.webp"
import bote from "@/app/src/assets/images/countdown/bote.webp"
import viejo from "@/app/src/assets/images/countdown/viejo.webp"
import bgAuto from "@/app/src/assets/images/countdown/bgAuto.webp"
import bgBolso from "@/app/src/assets/images/countdown/bgBolso.webp"
import bgBote from "@/app/src/assets/images/countdown/bgBote.webp"
import bgViejo from "@/app/src/assets/images/countdown/bgViejo.webp"
import Image from "next/image"

export const Countdown = () => {

    let itsToday: Date = new Date("2027-01-09T19:00:00")

    const [isMounted, setIsMounted] = useState(false)
    const [timeLeft, setTimeLeft] = useState<number>(0)

    useEffect(() => {

        setIsMounted(true)

        const time = setInterval(() => {
            setTimeLeft(+itsToday - Date.now())
        }, 1000);

        return () => clearInterval(time)

    }, [timeLeft])

    const dias = Math.floor(timeLeft / (24 * 60 * 60 * 1000)).toString();
    const horas = Math.floor((timeLeft / (60 * 60 * 1000)) % 24).toString().padStart(2, "0");;
    const minutos = Math.floor((timeLeft / (60 * 1000)) % 60).toString().padStart(2, "0");;
    const segundos = Math.floor((timeLeft / 1000) % 60).toString().padStart(2, "0");


    useLayoutEffect(() => {
        if (!isMounted) return;

        const images = [
            { bg: bgAuto.src, char: auto.src },
            { bg: bgBolso.src, char: bolso.src },
            { bg: bgBote.src, char: bote.src },
            { bg: bgViejo.src, char: viejo.src }]

        const ctx = gsap.context(() => {
            const tlTimer = gsap.timeline({
                repeat: -1,
                ease: "linear",
            });

            images.forEach(i => {

                tlTimer
                    .set("#backgroundLoading", {
                        backgroundImage: `url(${i.bg})`
                    })
                tlTimer
                    .set("#backgroundChar", {
                        backgroundImage: `url(${i.char})`,
                        x: 10
                    })

                    .to("#backgroundLoading", { autoAlpha: 1, scale: 1, duration: 2 })
                    .to("#backgroundChar", { autoAlpha: 1, duration: 2 }, "-=1.8")
                    .to("#backgroundChar", { x: 0, duration: 4 }, "<")
                    .to("#backgroundLoading", { autoAlpha: 0, duration: 2 })
                    .to("#backgroundChar", { autoAlpha: 0, duration: 2 }, "-=1.5")
            });

            gsap.to("#loadingRingContainer", {
                rotation: 360,
                repeat: -1,
                duration: 2,
                ease: "none",
                transformOrigin: "50% 50%",
                force3D: true
            });

        })

        return () => ctx.revert();
    }, [isMounted]);

    return (
        <>
            <div className="relative h-dvh w-full overflow-hidden">
                <div id="backgroundLoading" className="absolute bottom-0 h-dvh w-full bg-cover bg-center bg-no-repeat scale-110"></div>
                <div id="backgroundChar" className="absolute bottom-0 h-[80dvh] w-full bg-cover bg-bottom bg-no-repeat"></div>
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: "radial-gradient(ellipse 80% 50% at center, rgba(0,0,0,0) 10%, rgba(0,0,0,1) 100%)"
                    }}
                ></div>
                {isMounted
                    ? <div className="absolute top-[5dvh] h-[85dvh] flex flex-col w-full items-center justify-between">
                        <div className="flex">
                            <div className="text-center font-(family-name:--fontBold) text-[40px]">
                                {dias === "0" ?
                                    ""
                                    : dias === "1" ?
                                        <p>{dias} <span className="text-[24px]">día</span>,</p>
                                        : <p>{dias} <span className="text-[24px]">días</span>,</p>

                                }
                                <div className="flex align-bottom">
                                    <p>{horas}<span className="text-[24px]">hs</span>&nbsp;</p>
                                    <p>{minutos}<span className="text-[24px]">min</span>&nbsp;</p>
                                    <p>{segundos}<span className="text-[24px]">s</span></p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center">
                                <div id="loadingRingContainer" className="w-[24px] h-[24px] relative">
                                    <Image
                                        src={loadRing}
                                        alt=""
                                        id="loadingRing"
                                        className="w-[24px] absolute bottom-0"
                                    />
                                </div>
                                <p className="font-(family-name:--fontBold) text-[24px] ms-3">
                                    Loading wedding
                                </p>

                            </div>
                        </div>

                    </div>
                    : <div>Calculando los dias</div>
                }
            </div >
        </>
    )
}

"use client"

import { useEffect, useLayoutEffect, useState } from "react"
import { gsap } from 'gsap'
import iglesia from "@/src/assets/images/itinerary/church.svg"
import recepcion from "@/src/assets/images/itinerary/martini.svg"
import salon from "@/src/assets/images/itinerary/music.svg"
import civil from "@/src/assets/images/itinerary/ring.svg"
import Image from "next/image"
import { ScrollTrigger } from "gsap/ScrollTrigger";
import '@/src/styles/invitation.css'
import { ArrayElements, typeInfo } from "../types/types"


interface MenuProps {
    data: ArrayElements;
    infoDate: Array<typeInfo>;
}

export const Itinerary = ({
    data,
    infoDate
}: MenuProps) => {

    const imageMap: Record<string, any> = {
        iglesia: iglesia,
        recepcion: recepcion,
        salon: salon,
        civil: civil,
    };

    const ids = infoDate
        .sort((a, b) => a.id - b.id)
        .map(info => {
            return {
                id: info.id,
                moment: info.moment,
                image: imageMap[info.moment],
                text: info.place,
                horario: info.time + "hs"
            }
        });

    useLayoutEffect(() => {

        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {


            ids.forEach(id => {
                const tl = gsap.timeline({
                    paused: true,
                    scrollTrigger: {
                        trigger: `#${id.moment}`,
                        start: 'top 75%',
                        toggleActions: "play none none none",
                        once: true
                    }
                });

                tl.to(`#${id.moment}`, { autoAlpha: 1, scale: 1, duration: 2 });

                const tlBg = gsap.timeline({
                    paused: true,
                    scrollTrigger: {
                        trigger: `#${id.moment}`,
                        start: 'top 95%',
                        end: "bottom 5%",
                        scrub: 0.3
                    }
                });

                tlBg.to(`#${id.moment} .imageBg`, {
                    "--mask-size": "20vh",
                    ease: "none",
                });
            });
        });

        return () => ctx.revert();
    }, [ids]);

    return (
        <div id="itinerary" className='content-center lg:content-end h-dvh lg:h-auto lg:w-full'>
            <h2 className='text-center content-center text-white font-(family-name:--fontBold) text-(length:--h1size) max-h-[20dvh] lg:hidden'>Itinerario</h2>
            <div className="flex flex-1 flex-col lg:flex-row justify-self-center self-center lg:h-auto lg:w-full lg:justify-around">

                {ids.map(e =>
                    <div key={e.id} id={e.moment} className="flex flex-around lg:flex-col lg:max-w-[80px] lg:max-h-[80px] opacity-0 invisible lg:opacity-100 lg:visible my-[3dvh] scale-125 lg:scale-100">
                        <Image
                            src={e.image}
                            alt=""
                            className="imageBg h-[8dvh] lg:h-[100px] w-auto self-center"
                            style={{
                                backgroundImage: `radial-gradient(at 100% 0%,rgba(0, 0, 0, 0) 0vh, rgba(255, 255, 255, 0.1) var(--mask-size))`
                            }}
                        />
                        <div className="ms-4 lg:ms-0 content-center">
                            <p className="text-[30px] text-white md:text-center">
                                {e.horario}
                            </p>
                            <p className="lg:hidden text-white">{e.text}</p>
                        </div>
                    </div>
                )

                }
            </div>
        </div>
    )
}

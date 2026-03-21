"use client"

import { useEffect, useLayoutEffect, useState } from "react"
import { gsap } from 'gsap'
import church from "@/src/assets/images/itinerary/church.svg"
import martini from "@/src/assets/images/itinerary/martini.svg"
import music from "@/src/assets/images/itinerary/music.svg"
import ring from "@/src/assets/images/itinerary/ring.svg"
import coffe from "@/src/assets/images/itinerary/coffe.svg"
import Image, { StaticImageData } from "next/image"
import { ScrollTrigger } from "gsap/ScrollTrigger";
import '@/src/styles/invitation.css'
import { ArrayElements } from '@/app/page'


interface MenuProps {
    data: ArrayElements[];
}

interface itineraryObj {
    id: string,
    image: StaticImageData | string,
    text: string,
    horario: string
}

export const Itinerary = ({
    data
}: MenuProps) => {

    const ids = [
        {
            id: "church",
            image: church,
            text: "Ceremonia en parroquia",
            horario: "19hs"
        },
        {
            id: "martini",
            image: martini,
            text: "Salón Rincón Calina",
            horario: "20hs"
        },
        {
            id: "ring",
            image: ring,
            text: "Salón Rincón Calina",
            horario: "20:30hs"
        },
        {
            id: "music",
            image: music,
            text: "Salón Rincón Calina",
            horario: "21hs"
        },
        {
            id: "coffe",
            image: coffe,
            text: "Salón Rincón Calina",
            horario: "10hs"
        },
    ];

    const [idSelected, setIdSelected] = useState<itineraryObj[]>([])

    useEffect(() => {
        if (!data) return

        if (data[0].church && data[0].sleep) {
            setIdSelected(ids)
        } else if (data[0].church) {
            setIdSelected(ids.slice(0, 4))
        } else if (data[0].sleep) {
            setIdSelected(ids.slice(1, 5))
        } else {
            setIdSelected(ids.slice(1, 4))
        }

    }, [data])

    useLayoutEffect(() => {

        if (!idSelected.length) return

        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {


            idSelected.forEach(id => {
                const tl = gsap.timeline({
                    paused: true,
                    scrollTrigger: {
                        trigger: `#${id.id}`,
                        start: 'top 75%',
                        toggleActions: "play none none none",
                        once: true
                    }
                });

                tl.to(`#${id.id}`, { autoAlpha: 1, scale: 1, duration: 2 });

                const tlBg = gsap.timeline({
                    paused: true,
                    scrollTrigger: {
                        trigger: `#${id.id}`,
                        start: 'top 95%',
                        end: "bottom 5%",
                        scrub: 0.3
                    }
                });

                tlBg.to(`#${id.id} .imageBg`, {
                    "--mask-size": "20vh",
                    ease: "none",
                });
            });
        });

        return () => ctx.revert();
    }, [idSelected]);

    return (
        <div id="itinerary" className='h-lvh content-center lg:content-end'>
            <h2 className='text-center content-center text-white font-(family-name:--fontBold) text-(length:--h1size) h-[20lvh] lg:hidden'>Itinerario</h2>
            <div className="flex flex-1 flex-col justify-self-center self-center h-[80lvh] lg:h-auto">

                {idSelected.map(e =>
                    <div key={e.id} id={e.id} className="flex flex-around opacity-0 invisible my-[3lvh] scale-125">
                        <Image
                            src={e.image}
                            alt=""
                            className="imageBg h-[8lvh] lg:h-[140px] w-auto"
                            style={{
                                backgroundImage: `radial-gradient(at 100% 0%,rgba(0, 0, 0, 0) 0vh, rgba(255, 255, 255, 0.1) var(--mask-size))`
                            }}
                        />
                        <div className="ms-4 content-center">
                            <p className="text-[30px]">
                                {e.horario}
                                {e.id === "coffe" && <span className="text-[16px] ms-1">+1</span>}
                            </p>
                            <p>{e.text}</p>
                        </div>
                    </div>
                )

                }
            </div>
        </div>
    )
}

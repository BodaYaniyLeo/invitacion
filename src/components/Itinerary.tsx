"use client"

import { useEffect, useLayoutEffect, useState } from "react"
import { gsap } from 'gsap'
import iglesia from "@/src/assets/images/itinerary/church.svg"
import recepcion from "@/src/assets/images/itinerary/martini.svg"
import salon from "@/src/assets/images/itinerary/music.svg"
import civil from "@/src/assets/images/itinerary/ring.svg"
import Image, { StaticImageData } from "next/image"
import { ScrollTrigger } from "gsap/ScrollTrigger";
import '@/src/styles/invitation.css'
import { ArrayElements, typeInfo } from '@/app/page'


interface MenuProps {
    data: ArrayElements;
    infoDate: Array<typeInfo>;
}

interface itineraryObj {
    id: string,
    image: StaticImageData | string,
    text: string,
    horario: string
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

    const ids = infoDate.map(info => {
        return {
            id: info.id,
            image: imageMap[info.id],
            text: info.place,
            horario: info.time + "hs"
        }
    });

    const [idSelected, setIdSelected] = useState<itineraryObj[]>([])

    useEffect(() => {
        if (!data) return

        if (data.church && data.sleep) {
            setIdSelected(ids)
        } else if (data.church) {
            setIdSelected(ids.slice(0, 4))
        } else if (data.sleep) {
            setIdSelected(ids.slice(1, 5))
        } else {
            setIdSelected(ids.slice(1, 4))
        }

    }, [data])

    useLayoutEffect(() => {

        if (!idSelected.length || !idSelected.length && window.innerWidth > 991) return

        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {


            ids.forEach(id => {
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
    }, [ids]);

    return (
        <div id="itinerary" className='content-center lg:content-end h-lvh lg:h-auto lg:w-full'>
            <h2 className='text-center content-center text-white font-(family-name:--fontBold) text-(length:--h1size) max-h-[20lvh] lg:hidden'>Itinerario</h2>
            <div className="flex flex-1 flex-col lg:flex-row justify-self-center self-center lg:h-auto lg:w-full lg:justify-around">

                {ids.map(e =>
                    <div key={e.id} id={e.id} className="flex flex-around lg:flex-col opacity-0 invisible lg:opacity-100 lg:visible my-[3lvh] scale-125 lg:scale-100">
                        <Image
                            src={e.image}
                            alt=""
                            className="imageBg h-[8lvh] lg:h-[100px] w-auto self-center"
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

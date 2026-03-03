"use client"

import { useEffect, useState } from "react"
import { gsap } from 'gsap'
import Image, { StaticImageData } from "next/image"
import { ScrollTrigger } from "gsap/ScrollTrigger";
import model from "@/src/assets/images/dress/model.png"
import camisa1 from "@/src/assets/images/dress/camisa.png"
import camisa2 from "@/src/assets/images/dress/camisa2.png"
import panuelo from "@/src/assets/images/dress/panuelo.png"
import corbata from "@/src/assets/images/dress/corbata.png"
import mono from "@/src/assets/images/dress/mono.png"
import pantalon1 from "@/src/assets/images/dress/pantalon.png"
import pantalon2 from "@/src/assets/images/dress/pantalon2.png"
import saco1 from "@/src/assets/images/dress/saco.png"
import saco2 from "@/src/assets/images/dress/saco2.png"
import minus from "@/src/assets/images/dress/minus.png"
import '@/src/styles/invitation.css'

interface timeline {
    [key: string]: gsap.core.Timeline | null,
    church: gsap.core.Timeline | null,
    martini: gsap.core.Timeline | null,
    ring: gsap.core.Timeline | null,
    music: gsap.core.Timeline | null
}


interface Option {
    name: string,
    img: StaticImageData | string | null
}

interface Category {
    [key: string]: Option[];
}

export const DressCode = () => {

    const modelArray1: Category[] = [
        {
            Camisa: [
                { name: "Camisa lisa", img: camisa1 },
                { name: "Camisa cuadros", img: camisa2 }
            ]
        },
        {
            Saco:
                [
                    { name: "Saco gris", img: saco1 },
                    { name: "Saco negro", img: saco2 }
                ],
        },
        {
            Pantalón: [
                { name: "Pantalón gris", img: pantalon1 },
                { name: "Pantalón negro", img: pantalon2 }
            ]
        },
        {
            Accesorios: [
                { name: "Corbata", img: corbata },
                { name: "Moño", img: mono }
            ]
        },
        {
            Extras: [
                { name: "Pañuelo", img: panuelo },
                { name: "Sin pañuelo", img: null }
            ]
        },
    ];

    const [vestimenta, setVestimenta] = useState({
        Camisa: camisa1,
        Pantalón: pantalon1,
        Extras: null,
        Accesorios: mono,
        Saco: saco1
    })

    const [section, setSection] = useState<string | null>()

    useEffect(() => {
        modelArray1.forEach(e => {
            const id = Object.keys(e)[0]

            if (section === id) {
                gsap.to(`#${id}`, {
                    height: "auto",
                    duration: 0.5,
                    ease: "power2.out",
                    opacity: 1
                })
            } else {
                gsap.to(`#${id}`, {
                    height: 0,
                    duration: 0.5,
                    ease: "power2.out",
                    opacity: 1
                })
            }

        })

    }, [section])

    const changeClothes = (key: string, value: StaticImageData | null | string) => {
        setVestimenta(prev => ({
            ...prev, [key]: value
        }))
    }

    return (
        <div id="dresscode" className='h-lvh content-center'>
            <div className="relative h-full">
                <h2 className='text-center text-white font-(family-name:--fontBold) text-[40px] mb-4'>Código de vestimenta</h2>
                <div className="w-[40vw] ms-4 border">
                    <div className="text-center dressSelector px-1 py-2">
                        <h3 className="font-bold">Formal sport</h3>
                    </div>
                    <div className="flex justify-between px-1 border-y py-[2px]">
                        <h4 className="text-[#79b0cc]">Elige tu estilo</h4>
                    </div>
                    <div className="px-1">

                        {modelArray1.map((category, i) => {
                            const categoryName = Object.keys(category)[0];

                            const options = category[categoryName];

                            return (
                                <div key={i}>
                                    <button
                                        onClick={() => setSection(prev => prev === categoryName ? null : categoryName)}
                                        className="flex justify-between w-full"
                                    >
                                        <h3 className="font-bold">{categoryName}</h3>
                                        <div className="relative w-[4vw] self-center">
                                            <span className="block">
                                                <Image
                                                    src={minus}
                                                    alt=""
                                                />
                                            </span>
                                            <span className={`absolute top-0 left-0 w-[4vw] minus ${section === categoryName && "active"}`}>
                                                <Image
                                                    src={minus}
                                                    alt=""
                                                />
                                            </span>
                                        </div>
                                    </button>
                                    <div id={categoryName} className="h-0 overflow-hidden">
                                        {options.map((option) => (
                                            <button
                                                className="w-full text-left my-[2px]"
                                                onClick={() => changeClothes(categoryName, option.img)}
                                                key={option.name}
                                            >
                                                {option.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}

                    </div>
                </div>

                <div className="absolute left-[50vw] bottom-[0lvh] h-[75lvh]">
                    <div className="relative">
                        <Image
                            src={model}
                            alt=""
                            className="h-[75lvh] w-auto top-0 left-0"
                            loading="eager"
                        />
                        <Image
                            src={vestimenta.Camisa}
                            alt=""
                            className="h-[75lvh] w-auto absolute top-0 left-0  z-41"
                            loading="eager"
                        />
                        <Image
                            src={vestimenta.Accesorios}
                            alt=""
                            className="h-[75lvh] w-auto absolute top-0 left-0 z-42"
                            loading="eager"
                        />
                        <Image
                            src={vestimenta.Pantalón}
                            alt=""
                            className="h-[75lvh] w-auto absolute top-0 left-0 z-43"
                            loading="eager"
                        />
                        <Image
                            src={vestimenta.Saco}
                            alt=""
                            className="h-[75lvh] w-auto absolute top-0 left-0 z-44"
                            loading="eager"
                        />
                        {vestimenta.Extras &&
                            <Image
                                src={vestimenta.Extras}
                                alt=""
                                className="h-[75lvh] w-auto absolute top-0 left-0 z-45"
                                loading="eager"
                            />
                        }
                    </div>
                </div>


            </div>
        </div>
    )
}

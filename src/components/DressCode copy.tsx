"use client"

import { useEffect, useState } from "react"
import { gsap } from 'gsap'
import Image, { StaticImageData } from "next/image"
import minus from "@/src/assets/images/dress/minus.png"

import maniquis from "@/src/assets/images/dress/maniquis.png"
import chevL from "@/src/assets/images/dress/chevL.png"
import chevR from "@/src/assets/images/dress/chevR.png"

import blLunPant from "@/src/assets/images/dress/she/blLunPant.png"
import blPant from "@/src/assets/images/dress/she/blPant.png"
import blTs from "@/src/assets/images/dress/she/blTs.png"
import blueDress from "@/src/assets/images/dress/she/blueDress.png"
import bluePant from "@/src/assets/images/dress/she/bluePant.png"
import blueTs from "@/src/assets/images/dress/she/blueTs.png"
import greenDress from "@/src/assets/images/dress/she/greenDress.png"
import ltBlTs from "@/src/assets/images/dress/she/ltBlTs.png"
import ltCrPant from "@/src/assets/images/dress/she/ltCrPant.png"
import ltBlPant from "@/src/assets/images/dress/she/ltBlPant.png"

import camCl from "@/src/assets/images/dress/he/camCl.png"
import camGr from "@/src/assets/images/dress/he/camGr.png"
import camWh from "@/src/assets/images/dress/he/camWh.png"
import corbOt from "@/src/assets/images/dress/he/corbOt.png"
import corbRe from "@/src/assets/images/dress/he/corbRe.png"
import monoBl from "@/src/assets/images/dress/he/monoBl.png"
import monoGr from "@/src/assets/images/dress/he/monoGr.png"
import pantBl from "@/src/assets/images/dress/he/pantBl.png"
import pantCl from "@/src/assets/images/dress/he/pantCl.png"
import pantGr from "@/src/assets/images/dress/he/pantGr.png"
import sacoBl from "@/src/assets/images/dress/he/sacoBl.png"
import sacoBlF from "@/src/assets/images/dress/he/sacoBlF.png"
import sacoCl from "@/src/assets/images/dress/he/sacoCl.png"

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

interface VestimentaF {
    Vestido: StaticImageData | null | string;
    Blusa: StaticImageData | string;
    Pantalón: StaticImageData | string;
}

interface VestimentaM {
    Camisa: StaticImageData | string;
    Saco: StaticImageData | string;
    Pantalón: StaticImageData | string;
    Accesorios: StaticImageData | string | null;
}

export const DressCode = () => {

    const modelArrayM: Category[] = [
        {
            Camisa: [
                { name: "Camisa cuadros", img: camCl },
                { name: "Camisa verde", img: camGr },
                { name: "Camisa blanca", img: camWh }
            ]
        },
        {
            Saco:
                [
                    { name: "Saco negro", img: sacoBl },
                    { name: "Saco negro elegante", img: sacoBlF },
                    { name: "Saco claro", img: sacoCl }
                ],
        },
        {
            Pantalón: [
                { name: "Pantalón negro", img: pantBl },
                { name: "Pantalón claro", img: pantCl },
                { name: "Pantalón gris", img: pantGr }
            ]
        },
        {
            Accesorios: [
                { name: "Corbata", img: corbOt },
                { name: "Corbata roja", img: corbRe },
                { name: "Moño negro", img: monoBl },
                { name: "Moño gris", img: monoGr },
                { name: "Nada", img: null },
            ]
        }
    ];

    const modelArrayF: Category[] = [
        {
            Vestido: [
                { name: "Vestido verde", img: greenDress },
                { name: "Vestido azul", img: blueDress }
            ]
        },
        {
            Blusa:
                [
                    { name: "Blusa azul", img: blueTs },
                    { name: "Blusa verde", img: ltBlTs },
                    { name: "Blusa negra", img: blTs }
                ],
        },
        {
            Pantalón: [
                { name: "Pantalón azul", img: bluePant },
                { name: "Pantalón verde", img: ltBlPant },
                { name: "Pantalón crema", img: ltCrPant },
                { name: "Pantalón negro", img: blLunPant },
                { name: "Pantalón negro liso", img: blPant }
            ]
        },
    ];

    const [vestimentaM, setVestimentaM] = useState<VestimentaM>({
        Camisa: camCl,
        Pantalón: pantCl,
        Accesorios: null,
        Saco: sacoCl
    })

    const [vestimentaF, setVestimentaF] = useState<VestimentaF>({
        Vestido: null,
        Blusa: ltBlTs,
        Pantalón: ltBlPant,
    })

    const [sectionF, setSectionF] = useState<string | null>()
    const [sectionM, setSectionM] = useState<string | null>()


    useEffect(() => {
        modelArrayF.forEach(e => {
            const id = Object.keys(e)[0]

            if (sectionF === id) {
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

    }, [sectionF])

    useEffect(() => {
        modelArrayM.forEach(e => {
            const id = Object.keys(e)[0]

            if (sectionM === id) {
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

    }, [sectionM])

    const translateImg = (sign: string) => {
        gsap.to("#showcase", {
            x: `${sign}`,
            duration: 0.5,
            ease: "power2.out",
            opacity: 1
        })

    }

    const changeClothesF = (key: string, value: StaticImageData | null | string) => {
        if (key === "Vestido") {
            setVestimentaF(prev => ({
                ...prev, [key]: value
            }))
        } else {
            setVestimentaF(prev => ({
                ...prev,
                [key]: value,
                Vestido: null
            }))
        }
    }

    const changeClothesM = (key: string, value: StaticImageData | null | string) => {
        setVestimentaM(prev => ({
            ...prev, [key]: value
        }))

    }

    return (
        <div id="dresscode" className='overflow-hidden'>
            <div className="relative h-lvh  w-vw">
                <h2 className='text-center text-white font-(family-name:--fontBold) text-[40px] tracking-[-.04em] mt-[4lvh]'>Código de vestimenta</h2>
                <div id="showcase" className="absolute left-0 top-[20lvh] w-[200vw]">
                    <div className="absolute right-1/2 translate-x-1/2 text-center flex top-[4lvh] z-60">
                        <button
                            onClick={() => translateImg("-50%")}
                        >
                            <div className="flex w-[50vw] justify-center">
                                <h2 className="text-[50px] ">
                                    Leo
                                </h2>
                                <Image
                                    src={chevR}
                                    alt=""
                                    className="h-8 self-center mt-2"
                                />
                            </div>
                        </button>
                        <h2 className="text-center content-center">y</h2>
                        <button
                            onClick={() => translateImg("0%")}
                        >
                            <div className="flex w-[50vw] justify-center">
                                <Image
                                    src={chevL}
                                    alt=""
                                    className="h-8 self-center mt-2"
                                />
                                <h2 className="text-[50px]">
                                    Yani

                                </h2>
                            </div>

                        </button>
                    </div>


                    <div className="absolute w-[55vw] left-[4vw] top-1/4 border z-60 bg-[#00000090]">
                        <div className="text-center dressSelector px-1 py-2">
                            <h3 className="font-bold font-(family-name:--fontBold) text-[28px]">Formal sport</h3>
                        </div>
                        <div className="flex justify-between px-1 py-[2px] bg-black">
                            <h4 className="text-[#79b0cc] font-(family-name:--fontSemiBold)">Sugerencias</h4>
                        </div>
                        <div>
                            {modelArrayF.map((category, i) => {
                                const categoryName = Object.keys(category)[0];

                                const options = category[categoryName];

                                return (
                                    <div key={i}>
                                        <button
                                            onClick={() => setSectionF(prev => prev === categoryName ? null : categoryName)}
                                            className="flex justify-between w-full px-1"
                                        >
                                            <h3 className="font-bold font-(family-name:--fontSemiBold)">{categoryName}</h3>
                                            <div className="relative w-[4vw] self-center">
                                                <span className="block">
                                                    <Image
                                                        src={minus}
                                                        alt=""
                                                    />
                                                </span>
                                                <span className={`absolute top-0 left-0 w-[4vw] minus ${sectionF === categoryName && "active"}`}>
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
                                                    className="w-full text-left my-[2px] font-(family-name:--fontNormal) text-[14px] px-2"
                                                    onClick={() => changeClothesF(categoryName, option.img)}
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


                    <div className="absolute w-[55vw] right-[4vw] top-1/4 border z-60 bg-[#00000090]">
                        <div className="text-center dressSelector px-1 py-2">
                            <h3 className="font-bold font-(family-name:--fontBold) text-[28px]">Formal sport</h3>
                        </div>
                        <div className="flex justify-between px-1 py-[2px] bg-black">
                            <h4 className="text-[#79b0cc] font-(family-name:--fontSemiBold)">Sugerencias</h4>
                        </div>
                        <div>
                            {modelArrayM.map((category, i) => {
                                const categoryName = Object.keys(category)[0];

                                const options = category[categoryName];

                                return (
                                    <div key={i}>
                                        <button
                                            onClick={() => setSectionM(prev => prev === categoryName ? null : categoryName)}
                                            className="flex justify-between w-full px-1"
                                        >
                                            <h3 className="font-bold font-(family-name:--fontSemiBold)">{categoryName}</h3>
                                            <div className="relative w-[4vw] self-center">
                                                <span className="block">
                                                    <Image
                                                        src={minus}
                                                        alt=""
                                                    />
                                                </span>
                                                <span className={`absolute top-0 left-0 w-[4vw] minus ${sectionM === categoryName && "active"}`}>
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
                                                    className="w-full text-left my-[2px] font-(family-name:--fontNormal) text-[14px] px-2"
                                                    onClick={() => changeClothesM(categoryName, option.img)}
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


                    <div
                        className="inset-0 absolute z-31"
                        style={{
                            background: "radial-gradient(ellipse 80% 80% at center, rgba(0,0,0,0) 10%, rgba(0,0,0,1) 100%)"
                        }}
                    >

                    </div>
                    <Image
                        src={maniquis}
                        alt=""
                        className="inset-0 z-30"
                        loading="eager"

                    />

                    {!vestimentaF.Vestido &&
                        <>
                            <Image
                                src={vestimentaF.Blusa}
                                alt=""
                                className="h-full w-auto absolute top-0 right-1/2 z-41"
                                loading="eager"
                            />
                            <Image
                                src={vestimentaF.Pantalón}
                                alt=""
                                className="h-full w-auto absolute top-0 right-1/2 z-43"
                                loading="eager"
                            />
                        </>
                    }
                    {vestimentaF.Vestido &&
                        <Image
                            src={vestimentaF.Vestido}
                            alt=""
                            className="h-full w-auto absolute top-0 right-1/2 z-42"
                            loading="eager"
                        />
                    }


                    <Image
                        src={vestimentaM.Saco}
                        alt=""
                        className="h-full w-auto absolute top-0 left-1/2 z-47"
                        loading="eager"
                    />
                    <Image
                        src={vestimentaM.Camisa}
                        alt=""
                        className="h-full w-auto absolute top-0 left-1/2 z-44"
                        loading="eager"
                    />
                    <Image
                        src={vestimentaM.Pantalón}
                        alt=""
                        className="h-full w-auto absolute top-0 left-1/2 z-45"
                        loading="eager"
                    />
                    {vestimentaM.Accesorios &&
                        <Image
                            src={vestimentaM.Accesorios}
                            alt=""
                            className="h-full w-auto absolute top-0 left-1/2 z-46"
                            loading="eager"
                        />
                    }
                </div>


            </div>
        </div>
    )
}

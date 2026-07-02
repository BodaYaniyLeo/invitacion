"use client"

import { useState, useRef } from "react"
import { gsap } from 'gsap'
import Image from "next/image"

import bothIcon from "@/public/dress/both.svg"
import heIcon from "@/public/dress/he.svg"
import sheIcon from "@/public/dress/she.svg"
import fondo from "@/public/dress/fondoSalon.webp"

import '@/src/styles/invitation.css'
import { DressCodeHe } from "./DressCodeHe"
import { DressCodeShe } from "./DressCodeShe"

interface TonoItem {
    col: number;
    sat: string;
    bri: string;
}

export const DressCode = () => {
    const containerRef = useRef<HTMLDivElement>(null)
    const [maniquiSelect, setManiquiSelect] = useState<Record<string, string | null>>({ selected: null, noSelected: null })
    const [select, setSelect] = useState<boolean>(true)

    const [vestimentaShe, setVestimentaShe] = useState<Record<string, string | null>>({})
    const [vestimentaHe, setVestimentaHe] = useState<Record<string, string | null>>({})

    const [tonoShe, setTonoShe] = useState<Record<string, TonoItem>>({
        superior: { col: 25, sat: "55%", bri: "93%" },
        inferior: { col: 22, sat: "55%", bri: "70%" },
        vestido: { col: 0, sat: "55%", bri: "85%" },
        accesorios: { col: 0, sat: "55%", bri: "85%" }
    });

    const [tonoHe, setTonoHe] = useState<Record<string, TonoItem>>({
        camisa: { col: 0, sat: "55%", bri: "100%" },
        saco: { col: 220, sat: "55%", bri: "30%" },
        pantalon: { col: 220, sat: "55%", bri: "30%" },
        accesorios: { col: 0, sat: "55%", bri: "30%" }
    });

    const killPreviousTweens = (selectors: string[]) => {
        if (!containerRef.current) return;
        const q = gsap.utils.selector(containerRef.current);
        selectors.forEach(selector => {
            gsap.killTweensOf(q(selector));
        });
    };

    const widthOpposite = (idSelected: string, idNoSelected: string) => {
        if (!containerRef.current) return

        killPreviousTweens([
            `#maniqui${idNoSelected}`, `#selector${idNoSelected}`,
            `#maniqui${idSelected}`, `#salonBack`, `#selector${idSelected}`, `#iconChange`
        ]);

        const q = gsap.utils.selector(containerRef.current)
        const mask = `linear-gradient(to right, #111117 20%, transparent 50%), linear-gradient(to bottom, transparent, #111117 70%, #111117 0%, transparent 100%)`
        const tl = gsap.timeline({ defaults: { ease: "power2.out", overwrite: "auto" } })

        tl
            .to(q(`#maniqui${idNoSelected}, #selector${idNoSelected}`), {
                autoAlpha: 0,
                display: "none",
                duration: 0.2,
            })
            .to(q(`#maniqui${idSelected}`), {
                x: idSelected === "He" ? "-100%" : "0%",
                display: "block",
                autoAlpha: 1,
                duration: 0.3,
            })
            .to(q("#salonBack"), {
                maskImage: mask,
                WebkitMaskImage: mask,
                WebkitMaskComposite: 'source-in',
                autoAlpha: 1,
                display: "block",
                duration: 1,
            }, "<")
            .to(q(`#selector${idSelected}`), {
                display: "block",
                autoAlpha: 1,
                duration: 1.5,
            }, "-=0.3")
            .to(q("#iconChange"), {
                display: "flex",
                autoAlpha: 1,
                duration: 0.3
            }, "<")

        setManiquiSelect({
            selected: idSelected,
            noSelected: idNoSelected
        })
    }

    const resetToInitial = (idSelected: string, idNoSelected: string) => {
        if (!containerRef.current) return

        killPreviousTweens([
            `#iconChange`, `#selector${idSelected}`, `#selector${idNoSelected}`,
            `#salonBack`, `#maniquiHe`, `#maniquiShe`, `#maniqui${idNoSelected}`
        ]);

        const q = gsap.utils.selector(containerRef.current)
        const tl = gsap.timeline({ defaults: { ease: "power2.inOut", overwrite: "auto" } });

        tl
            .to(q("#iconChange"), {
                autoAlpha: 0,
                display: "none",
                duration: 0.2
            })
            .to(q(`#selector${idSelected}, #selector${idNoSelected}`), {
                autoAlpha: 0,
                display: "none",
                duration: 0.2,
            }, "<")
            .to(q("#salonBack"), {
                autoAlpha: 0,
                display: "none",
                duration: 0.4,
            })
            .to(q(`#maniquiHe, #maniquiShe`), {
                x: "0%",
                display: "block",
                autoAlpha: 1,
                duration: 0.4,
            }, "<")

        setManiquiSelect({ selected: null, noSelected: null });
        setTimeout(() => {
            setSelect(true);
        }, 600);
    };

    const changeManiqui = (hiManiqui: string | null, byeManiqui: string | null) => {
        if (!containerRef.current || !hiManiqui || !byeManiqui) return

        killPreviousTweens([
            `#maniqui${byeManiqui}`, `#selector${byeManiqui}`,
            `#maniqui${hiManiqui}`, `#selector${hiManiqui}`
        ]);

        const q = gsap.utils.selector(containerRef.current)
        const tl = gsap.timeline({ defaults: { ease: "power2.out", overwrite: "auto" } })

        tl
            .to(q(`#maniqui${byeManiqui}, #selector${byeManiqui}`), {
                autoAlpha: 0,
                display: "none",
                duration: 0.4,
            })
            .to(q(`#maniqui${hiManiqui}`), {
                x: hiManiqui === "He" ? "-100%" : "0%",
                display: "block",
                autoAlpha: 1,
                duration: 0.3,
            })
            .to(q(`#selector${hiManiqui}`), {
                display: "block",
                autoAlpha: 1,
                duration: 0.4,
            }, ">")

        setManiquiSelect({
            selected: hiManiqui,
            noSelected: byeManiqui
        })
    }

    const iconMap: Record<string, any> = {
        He: heIcon,
        She: sheIcon
    };

    return (
        <div
            id="dresscode"
            ref={containerRef}
            className="overflow-hidden h-dvh lg:h-auto w-screen flex flex-col relative lg:mt-[10dvh] bg-[#111117] max-w-[1000px] lg:justify-self-center"
        >
            <h2 className='text-center text-white font-(family-name:--fontBold) text-(length:--h1size) tracking-[-.04em] px-8'>
                Código de vestimenta
            </h2>
            <h4 className='text-center text-white font-(family-name:--fontBold) text-(length:--h2size)'>
                Formal sport
            </h4>

            <div className={`flex self-center w-full lg:w-1/2 ${select ? "opacity-100" : "opacity-0"} duration-500`}>
                <div className="w-1/2 text-center my-2 animate-bounce text-white my-4">
                    <p>Selecciona tu estilo</p>
                    <p>▼</p>
                </div>
                <div className="w-1/2 text-center my-2 animate-bounce text-white my-4">
                    <p>Selecciona tu estilo</p>
                    <p>▼</p>
                </div>
            </div>
            <div className="w-full relative h-full flex content-center overflow-hidden">

                <div id="iconChange" className="flex justify-around max-w-[150px] w-1/3 absolute bottom-10 right-[32px] lg:right-1/4 text-center z-40 opacity-0 invisible">
                    <div
                        role="button"
                        tabIndex={0}
                        onClick={() => changeManiqui(maniquiSelect.noSelected, maniquiSelect.selected)}
                        onKeyDown={(e) => e.key === 'Enter' && changeManiqui(maniquiSelect.noSelected, maniquiSelect.selected)}
                    >
                        {maniquiSelect.noSelected &&
                            <Image
                                src={iconMap[maniquiSelect.noSelected]}
                                alt="Cambiar maniquí"
                                className="w-auto h-[clamp(20px,12vw,60px)] cursor-pointer"
                            />
                        }
                    </div>

                    <div
                        className="cursor-pointer text-white"
                        role="button"
                        tabIndex={0}
                        onClick={() => resetToInitial(maniquiSelect.selected ?? "", maniquiSelect.noSelected ?? "")}
                        onKeyDown={(e) => e.key === 'Enter' && resetToInitial(maniquiSelect.selected ?? "", maniquiSelect.noSelected ?? "")}
                    >
                        <Image
                            src={bothIcon}
                            alt="Cambiar maniquí"
                            className="w-auto h-[clamp(20px,12vw,60px)] cursor-pointer"
                        />
                    </div>
                </div>


                <div
                    id="salonBack"
                    className="w-full lg:hidden absolute bottom-1/2 translate-y-2/5 left-0 z-0 opacity-0 invisible aspect-2/1 bg-red-500"
                >
                    <Image
                        src={fondo}
                        alt=""
                        className="inset-0 h-auto w-full z-30 object-contain"
                        loading="eager"
                    />
                </div>

                <DressCodeShe
                    widthOpposite={widthOpposite}
                    select={select}
                    setSelect={setSelect}
                    vestimenta={vestimentaShe}
                    setVestimenta={setVestimentaShe}
                    tono={tonoShe}
                    setTono={setTonoShe}
                />

                <DressCodeHe
                    widthOpposite={widthOpposite}
                    select={select}
                    setSelect={setSelect}
                    vestimenta={vestimentaHe}
                    setVestimenta={setVestimentaHe}
                    tono={tonoHe}
                    setTono={setTonoHe}
                />
            </div>
        </div>
    )
}
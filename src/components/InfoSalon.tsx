'use client'
import Image from 'next/image';
import '@/src/styles/invitation.css'
import arrowLeft from '../assets/images/salon/arrowLeft.webp'
import { useEffect, useState } from 'react';
import { guestsObj, typeInfo } from "../types/types";
import chevronR from '@/public/chevronR.svg'

interface InfoProps {
    scrollRef: React.RefObject<HTMLDivElement | null>
    handleBackInfo: () => void;
    dataGuest: Array<guestsObj>;
    setDataGuest: React.Dispatch<React.SetStateAction<guestsObj[]>>;
    infoDate: Array<typeInfo>
}

export const InfoSalon = ({
    scrollRef,
    handleBackInfo,
    dataGuest,
    setDataGuest,
    infoDate
}: InfoProps) => {

    const [advance, setAdvance] = useState<number>(0)
    const [isVisible, setIsVisible] = useState<boolean>(true)

    const [urlMaps, setUrlMaps] = useState<string>("")
    const [urlIframe, setUrlIframe] = useState<string>("")

    useEffect(() => {
        if (!infoDate || infoDate.length === 0) return;
        setUrlMaps(infoDate.find(f => f.id === "recepcion")?.url ?? "");
        setUrlIframe(infoDate.find(f => f.id === "civil")?.url ?? "");

    }, [infoDate]);

    useEffect(() => {
        const scrollSection = scrollRef.current
        if (!scrollSection) return

        const handleScroll = () => {
            const { scrollLeft, scrollWidth, clientWidth } = scrollSection
            const scrollMax = scrollWidth - clientWidth
            const percentage = (scrollLeft / scrollMax) * 100

            setAdvance(percentage)

            if (percentage > 10) {
                setIsVisible(false)
            }
        }

        scrollSection.addEventListener('scroll', handleScroll)

        return () => scrollSection.removeEventListener('scroll', handleScroll)

    }, [])

    return (
        <div
            id="lateralMaps"
            ref={scrollRef}
            className="fixed top-0 left-0 flex flex-row w-full items-center h-dvh bg-[#111117] overflow-x-scroll overflow-y-hidden shrink-0 py-[5dvh] opacity-0 invisible pointer-events-auto z-80"
        >
            <div id="header" className='fixed w-full top-0 left-0 flex justify-between px-[5dvh] pt-[3dvh] z-81 text-(length:--h5size)'>
                <button className='flex rounded-full bg-white p-4 text-black items-center size-fit h-9 lg:h-12'
                    onClick={() => { handleBackInfo(); }}
                >
                    <Image
                        src={arrowLeft}
                        alt=''
                        className='h-[18px] lg:h-[36px] w-auto self-center me-1'
                    />
                    <p className='text-[length:var(--psize)] leading-[1.2] font-(family-name:--fontNormal)'>
                        Atrás
                    </p>
                </button>
                <div className='rounded-full bg-[#ffffff15] px-6 text-black justify-center content-center size-fit w-[45vw] h-9 lg:hidden'>
                    <span className='bg-[#00000090] rounded-full h-[4px] block w-full'>
                        <span className='bg-white rounded-full h-[4px] block will-change-[width]'
                            style={{ width: `${advance}%` }}
                        >
                        </span>
                    </span>
                </div>
            </div>
            <div id='infoSalon' className='flex flex-col shrink-0 h-full'>
                <div className="pointer-events-auto flex flex-col lg:flex-row justify-center h-dvh lg:items-center ps-[5vw] mt-[3dvh]">
                    <div className='flex items-center lg:justify-between'>
                        <div className='w-[87vw] lg:w-[45vw] font-[family-name:var(--fontNormal)] px-[3vw] h-full flex flex-col justify-center'>
                            <div id='mapsSalon' className='bg-white w-[clamp(50vw,80vw,500px)] lg:w-[100%] h-fit max-h-[50dvh] aspect-4/3 p-2 mt-5 rotate-4'>
                                <iframe src={urlIframe || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d108977.04670347561!2d-64.27204423726164!3d-31.399445950511186!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9432985f478f5b69%3A0xb0a24f9a5366b092!2sC%C3%B3rdoba%2C%20Argentina!5e0!3m2!1ses!2ses!4v1783105568067!5m2!1ses!2ses"} style={{ border: 0, aspectRatio: "4/3", height: "100%", width: "100%" }} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                            </div>

                            <div className='mt-[5vh]'>
                                <h2 className='text-[#ffc2d0] text-[length:var(--h2size)] uppercase font-bold'>
                                    Como llegar al salón
                                </h2>
                                <p className='text-[#fff9cb] text-[length:var(--h3size)] leading-[1.2] uppercase font-bold'>
                                    Dirección: Ruta E-53 km 15, jurisdicción Unquillo
                                </p>
                                <a
                                    href={urlMaps || "#"} target='_blank'
                                    className='flex rounded-full bg-white px-4 py-2 text-black justify-center mt-5 size-fit text-(length:--h5size) lg:text-(length:--psize)'
                                >
                                    Ir a google maps
                                </a>
                            </div>
                            <div className={`absolute top-full right-[50%] flex ${isVisible ? 'opacity-100' : "opacity-0"} duration-500`}>
                                <p>Servicio de traslado</p>
                                <Image
                                    id='chevronR'
                                    src={chevronR}
                                    alt="Logo"
                                    className={`w-[24px] mx-auto z-90 text-white`}
                                />
                            </div>
                        </div>
                        <div className='w-[90vw] lg:w-[45vw] mx-[4vw] lg:mx-0 lg:px-[4vw] font-[family-name:var(--fontNormal)] self-end max-h-[80dvh] h-full flex flex-col lg:self-center'>
                            <h4 className='text-[#ffc2d0] text-[length:var(--h1size)] leading-[1.2] uppercase font-bold mb-2'>
                                Servicio de traslado
                            </h4>
                            <div className='flex flex-col mb-4'>
                                <p className='text-[#fff9cb] text-[length:var(--h2size)] leading-[1.2] font-bold'>
                                    Esta noche solo pensá en divertirte.
                                </p>
                            </div>
                            <p className='text-white text-[length:var(--h5size)] leading-[1.2] mb-4'>
                                {dataGuest.length === 1
                                    ? "Confirmá si querés contatar este servicio hasta un mes antes del evento. " : "Podrás confirmar quienes quieran contatar este servicio hasta un mes antes del evento. "}
                                Verás la información actualizado en este apartado. Recordá verificarlo!
                                <br />
                                Cualquier consulta, no dudes en escribirnos.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
};
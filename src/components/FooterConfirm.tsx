'use client'

import '@/src/styles/invitation.css'
import { useLayoutEffect, useRef, useState } from 'react';
import { AnswerComponent } from './AnswerComponent';
import { gsap } from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { VideoProps } from '../types/types';
import { CarIcon } from './CarIcon';
import { InputFood } from './InputFood';

export const FooterConfirm = ({
    dataGuest,
    setDataGuest,
}: VideoProps) => {

    const [visibleOptions, setVisibleOptions] = useState<number | null>(null)
    const containerRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {

            const logoFooterTl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 66%",
                    end: "+=34%",
                    scrub: 0.5,
                }
            });

            logoFooterTl.to("#confirmData", { autoAlpha: 1, y: 0, duration: 0.3 });

        }, containerRef);

        return () => ctx.revert();

    }, []);

    return (
        <div id="containerConfirm" ref={containerRef} className="px-6 pointer-events-auto py-2 justify-items-center w-full bg-[#111117] content-center mb-10 min-h-[45dvh] max-w-[1000px] lg:justify-self-center">
            <div id="confirmData" className="flex flex-col w-full max-w-120 rounded-xl backdrop-blur-md opacity-0 invisible translate-y-4">
                <p className="title-confirm flex-none pb-4 font-bold text-center uppercase tracking-wider text-(length:--h4size)">
                    Confirmar asistencia
                </p>

                <div
                    className="flex-1 min-h-0 py-2 border-y border-white/10 lg:px-4"
                >
                    {dataGuest?.map(g => {
                        return (
                            <div key={g.id} className="mb-4 last:mb-0">
                                <div className='flex justify-between items-center gap-4'>
                                    <h2 className="guest-name py-2 text-(length:--h5size)">{g.name} {g.lastname}</h2>
                                    <AnswerComponent
                                        id={g.id}
                                        dataGuest={dataGuest}
                                        setDataGuest={setDataGuest}
                                        confirm={g.confirm}
                                        status={"confirm"}
                                        setVisibleOptions={setVisibleOptions}
                                    />
                                    <button onClick={() => setVisibleOptions(prev => prev === g.id ? null : g.id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 12 12" className={`min-w-6 duration-500 ${g.confirm ? "opacity-100" : "opacity-10"} ${g.confirm && visibleOptions === g.id ? "-rotate-180" : "rotate-0"}`}>
                                            <path fill="currentColor" d="M2.22 4.47a.75.75 0 0 1 1.06 0L6 7.19l2.72-2.72a.75.75 0 0 1 1.06 1.06L6.53 8.78a.75.75 0 0 1-1.06 0L2.22 5.53a.75.75 0 0 1 0-1.06" />
                                        </svg>
                                    </button>
                                </div>
                                <div className={`flex flex-col justify-between gap-4 mt-2 overflow-hidden duration-500 ${g.confirm && visibleOptions === g.id ? "h-20" : "h-0"}`}>
                                    <InputFood
                                        id={g.id}
                                        setDataGuest={setDataGuest}
                                        lastAnswer={g.foodPreferents}
                                    />
                                    <CarIcon
                                        data={g}
                                        setDataGuest={setDataGuest}
                                    />

                                </div>
                            </div>
                        )
                    }
                    )}
                </div>
            </div>
        </div>
    );
};
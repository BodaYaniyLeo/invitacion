'use client'
import '@/src/styles/invitation.css'
import { useLayoutEffect, useRef, useState } from 'react';
import { AnswerComponent } from './AnswerComponent';
import { gsap } from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { VideoProps } from '../types/types';

export const FooterConfirm = ({
    dataGuest,
    setDataGuest,
}: VideoProps) => {

    const [price, setPrice] = useState<string | null>(null)
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
            <div id="confirmData" className="flex flex-col w-full max-w-120 rounded-xl backdrop-blur-md opacity-0 invisible translate-y-4"><p className="title-confirm flex-none pb-4 font-bold text-center uppercase tracking-wider text-(length:--h4size)">
                Confirmar asistencia
            </p>

                <div
                    className="flex-1 min-h-0 py-2 border-y border-white/10 lg:px-4"
                >
                    {dataGuest?.map(g => (
                        <div key={g.id} className="mb-5 last:mb-0 flex justify-between items-center gap-4">
                            <h2 className="guest-name py-2 text-(length:--h5size)">{g.name} {g.lastname}</h2>
                            <AnswerComponent
                                id={g.id}
                                dataGuest={dataGuest}
                                setDataGuest={setDataGuest}
                                confirm={g.confirm}
                                status={"confirm"}
                            />
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};
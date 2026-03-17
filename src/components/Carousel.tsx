"use client"

import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { gsap } from 'gsap'
import '@/src/styles/invitation.css'
import { ArrayElements, userCommentsType } from '@/app/page'
import { Observer } from 'gsap/all'
import pause from '@/public/pause.png'
import play from '@/public/play.png'
import Image from "next/image"

gsap.registerPlugin(Observer)

interface MenuProps {
    data: ArrayElements[];
    commentsData: userCommentsType[];
}

export const Carousel = ({
    data,
    commentsData
}: MenuProps) => {

    const [comments, setComments] = useState<userCommentsType[]>([])
    const [actualComment, setActualComment] = useState(0)
    const [paused, setPaused] = useState<boolean>(false)

    const containerRef = useRef<HTMLDivElement>(null)
    const isAnimating = useRef(false)

    useEffect(() => {
        const ordenComments = [...commentsData].sort((a, b) => {
            return a.id - b.id
        })

        setComments(ordenComments)
    }, [data])

    const total = comments.length;

    const getVisibleComments = () => {
        if (total === 0) return []
        const indices = [-2, -1, 0, 1, 2]
        return indices.map(offset => {
            const index = (actualComment + offset + total) % total
            return { ...comments[index], virtualId: `${comments[index].id}-${offset}` }
        })
    }

    const changeComment = (direction: number) => {

        if (isAnimating.current || total === 0) return;
        isAnimating.current = true;

        const cards = gsap.utils.toArray<HTMLElement>(containerRef.current!.children);
        const nextCenterIdx = direction > 0 ? 3 : 1;

        const tl = gsap.timeline({
            onComplete: () => {
                setActualComment(prev => (prev + direction + total) % total);

                requestAnimationFrame(() => {
                    gsap.set(containerRef.current, { x: 0 });
                    gsap.set(cards, { clearProps: "all" });
                    isAnimating.current = false;
                });
            }
        });

        tl.to(containerRef.current, {
            x: direction > 0 ? "-50vw" : "50vw",
            duration: 1.5,
            ease: "power2.inOut"
        }, 0);

        cards.forEach((card, idx) => {
            const isNextCenter = idx === nextCenterIdx;
            tl.to(card, {
                scale: isNextCenter ? 1.2 : 0.7,
                opacity: isNextCenter ? 1 : 0.5,
                zIndex: isNextCenter ? 10 : 1,
                duration: 1.5,
                ease: "power2.inOut"
            }, 0);
        });
    };

    useLayoutEffect(() => {
        if (total === 0) return

        const obs = Observer.create({
            target: containerRef.current,
            type: "touch,pointer",
            onLeft: () => changeComment(1),
            onRight: () => changeComment(-1),
            tolerance: 10,
            preventDefault: true
        })

        return () => obs.kill()
    }, [total, actualComment])

    useEffect(() => {

        const timer = setInterval(() => {
            if (!paused) {
                changeComment(1)
            }
        }, 3500);

        return () => clearInterval(timer)

    }, [paused, total, actualComment])

    return (
        <div className=" min-h-[50lvh] flex flex-col justify-around">
            <h2 className='text-center text-white font-(family-name:--fontBold) text-(length:--h2size) tracking-[-.04em] px-8'>
                Dejales tu mensaje a los novios...
            </h2>
            <div id="commentsContainer" className="w-full overflow-hidden flex items-center flex-1">
                <div
                    ref={containerRef}
                    className="flex items-center justify-center"
                    style={{
                        width: "250vw",
                        marginLeft: "-75vw"
                    }}
                >
                    {getVisibleComments().map((c, i) => {

                        return (
                            <div
                                key={c.virtualId}
                                className="w-[50vw] flex-shrink-0 flex flex-col justify-center items-center bg-black"
                                style={{
                                    transform: i === 2 ? 'scale(1.2)' : 'scale(0.7)',
                                    opacity: i === 2 ? 1 : 0.5,
                                    zIndex: i === 2 ? 10 : 1,
                                    willChange: "transform, opacity"
                                }}
                                onClick={() => {
                                    if (i === 1) {
                                        changeComment(-1)
                                    } else if (i === 3) {
                                        changeComment(1)
                                    }
                                }}
                            >
                                <p className="text-white text-center italic border-y w-full  text-[12px]">"{c.comment}"</p>
                                <div className="self-end w-1/2">
                                    <p
                                        className="font-(family-name:--textDesc) text-white/70 font-bold capitalize tracking-[0.2em] text-center"
                                    >{c.user}
                                    </p>
                                </div>
                            </div>
                        )
                    }
                    )}
                </div>
            </div>
            <div id="run" className="relative self-end w-6 h-6">
                <button
                    className={`${paused ? "z-1" : "paused z-0"} relative right-0`}
                    onClick={() => setPaused(false)}
                >
                    <Image
                        src={play}
                        alt=""
                    />
                </button>
                <button
                    className={`${paused ? "paused z-0" : " z-1"} absolute right-0`}
                    onClick={() => setPaused(true)}
                >
                    <Image
                        src={pause}
                        alt=""
                    />
                </button>
            </div>
        </div>
    )
} 
'use client'
import Image from 'next/image'
import React, { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import backHero from '../assets/images/backHero.svg'
import frontHero from '../assets/images/frontHero.svg'
import textHero from '../assets/images/logoHero.svg'
import logoCasamiento from '../assets/images/logoCasamiento.svg'
import '@/app/src/styles/invitation.css'
import { Section1 } from './Section1'
import { Section2 } from './Section2'
import { Section3 } from './Section3'

export const Invitation = () => {
    const mainContainerRef = useRef(null);

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        // Uso de gsap.context para asegurar que todo se limpie al desmontar el componente
        let ctx = gsap.context(() => {

            const heroTimeline = gsap.timeline({
                scrollTrigger: {
                    trigger: mainContainerRef.current,
                    start: 'top top',
                    end: '+=100%', // Duración total de la intro
                    scrub: 1,
                    pin: true,     // Clava la sección
                    invalidateOnRefresh: true,
                }
            });

            heroTimeline
                .to('#heroComplete', { scale: 1.1, duration: 2 })
                .to('#imgTextHero', { opacity: 0, duration: 0.8 }, 1)

                .to('#heroComplete', { opacity: 0, duration: 0.5 })
                .to('#heroMask', {
                    maskSize: "25vh",
                    webkitMaskSize: "25vh",
                    duration: 2
                }, 0.5)
                .to('#heroMask', { scale: 0.8 })

                .fromTo('#dateLogo',
                    {
                        webkitMaskImage: 'radial-gradient(circle at bottom center, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 0%)',
                        maskImage: 'radial-gradient(circle at bottom center, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 0%)',
                        autoAlpha: 0,
                    },
                    {
                        webkitMaskImage: 'radial-gradient(circle at bottom center, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)',
                        maskImage: 'radial-gradient(circle at bottom center, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)',
                        autoAlpha: 1,
                        scale: 0.8,
                    }, '<')

                .to('#heroMask', { display: 'none' }, '>')
                .to('#dateLogo h2', {
                    backgroundImage: 'radial-gradient(circle at 50% 60.0674vh, rgb(76, 0, 255) 0vh, rgb(49, 6, 150) 50vh, rgb(16, 0, 54) 90vh, rgba(32, 31, 66, 0) 124.981vh)',
                    opacity: 0.85
                }, '>')
                .to('#dateLogo', {
                    webkitMaskImage: 'radial-gradient(circle at top center, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 0%)',
                    maskImage: 'radial-gradient(circle at top center, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 0%)',
                    autoAlpha: 0
                }, '>')

                .fromTo('#textOrg',
                    {
                        webkitMaskImage: 'radial-gradient(circle at bottom center, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 40%)',
                        maskImage: 'radial-gradient(circle at bottom center, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 40%)',
                        autoAlpha: 0,
                    },
                    {
                        webkitMaskImage: 'radial-gradient(circle at bottom center, rgba(0,0,0,1) 90%, rgba(0,0,0,0) 100%)',
                        maskImage: 'radial-gradient(circle at bottom center, rgba(0,0,0,1) 90%, rgba(0,0,0,0) 100%)',
                        autoAlpha: 1,
                        scale: 0.8
                    })
                .to('#textOrg h2, #textOrg p', {
                    backgroundImage: 'radial-gradient(circle at 50% 60.0674vh, rgb(76, 0, 255) 0vh, rgb(49, 6, 150) 50vh, rgb(16, 0, 54) 90vh, rgba(32, 31, 66, 0) 124.981vh)',
                    opacity: 0.85
                }, '>')
                .to('#textOrg', { autoAlpha: 0 }, '>');

        }, mainContainerRef);

        return () => ctx.revert();
    }, []);

    return (
        <main className='bg-black'>
            <div ref={mainContainerRef} className="relative w-full h-screen overflow-hidden bg-black">

                <div id="heroMask" className="absolute inset-0 z-30 pointer-events-none">
                    <picture id='heroComplete' className='flex h-screen w-screen scale-110 object-cover justify-center relative'>
                        <Image src={backHero} alt="" className='h-screen w-auto object-cover z-1' />
                        <Image src={frontHero} alt="" className='h-screen w-auto absolute top-0 left-0 object-cover z-3 top-1/2 left-1/2 -translate-1/2' />
                        <Image src={textHero} alt="" className='absolute z-2 top-1/3 -translate-y-1/2 -translate-1/10 max-w-100 w-full max-h-1/4' id='imgTextHero' />
                    </picture>
                </div>

                <div id='dateLogo' className="absolute inset-0 z-20 opacity-0 flex flex-col items-center justify-center text-white p-6">
                    <Image src={logoCasamiento} alt="Logo" className="absolute z-2 top-1/3 left-1/2 translateResize sizeImg max-w-100" />
                    <h2 className='uppercase absolute z-2 top-1/2 left-1/2 translateResize max-w-100 text-center font-bold w-full text-base/8 mt-10'>
                        Disponible<br />el 1 de enero<br />de 2027
                    </h2>
                </div>

                <div id='textOrg' className="absolute inset-0 z-10 opacity-0 flex flex-col items-center justify-center text-center">
                    <div className='flex flex-col h-full justify-center'>
                        <h2>Córdoba, Argentina</h2>
                        <p className='w-full text-base/8 mt-6 text-[22px]'>
                            Yani y Leo siempre supieron que la vida podía sorprenderlos, pero mientras organizaban su gran día, los imprevistos no tardaron en aparecer. Entre risas, abrazos y momentos inesperados, se han apoyado el uno en el otro más que nunca… y ahora quieren que vos seas parte de esta aventura única, para celebrar juntos el amor que los une y que hace que cada instante valga la pena.
                        </p>
                    </div>
                </div>
            </div>

            <Section1 />
            <Section2 />
            <Section3 />
        </main>
    )
}
'use client'
import Image from 'next/image'
import React, { useLayoutEffect } from 'react'
import backHero from '../assets/images/backHero.svg'
import frontHero from '../assets/images/frontHero.svg'
import textHero from '../assets/images/logoHero.svg'
import logoCasamiento from '../assets/images/logoCasamiento.svg'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '@/app/src/styles/invitation.css'

export const Invitation = () => {


    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger)

        const heroAnimation = gsap.timeline({
            ease: "power2.out",
            scrollTrigger: {
                scrub: 1,
                start: "top top",
                end: " 800"
            }
        })

        heroAnimation
            .to('#heroComplete', { scale: 1 })
            .to('#imgTextHero', { opacity: 0 }, 0.15)
            .to('#heroComplete', { opacity: 0, duration: 0.15 }, 0.4)
            .to('#heroMask', { maskSize: "clamp(25vh, 25vh, 25vh)" }, 0.15)
            .to('#heroMask', { scale: 0.8 })
            .fromTo('#dateLogo',
                {
                    webkitMaskImage:
                        'radial-gradient(circle at bottom center, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 0%)',
                    maskImage:
                        'radial-gradient(circle at bottom center, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 0%)',
                    opacity: 0,
                },
                {
                    webkitMaskImage:
                        'radial-gradient(circle at bottom center, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)',
                    maskImage:
                        'radial-gradient(circle at bottom center, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)',
                    opacity: 1,
                    scale: 0.8
                }, '<')
            .to('#heroMask', { display: 'none' }, '>')
            .to('#dateLogo h2', {
                backgroundImage: 'radial-gradient(circle at 50% 60.0674vh, rgb(76, 0, 255) 0vh, rgb(49, 6, 150) 50vh, rgb(16, 0, 54) 90vh, rgba(32, 31, 66, 0) 124.981vh)',
                opacity: 0.85

            }, '>')

            .to('#dateLogo', {
                webkitMaskImage:
                    'radial-gradient(circle at top center, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 0%)',
                maskImage:
                    'radial-gradient(circle at top center, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 0%)',
                opacity: 0
            }, '>')
            .fromTo('#textOrg',
                {
                    webkitMaskImage:
                        'radial-gradient(circle at bottom center, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 40%)',
                    maskImage:
                        'radial-gradient(circle at bottom center, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 40%)',
                    opacity: 0,
                },
                {
                    webkitMaskImage:
                        'radial-gradient(circle at bottom center, rgba(0,0,0,1) 90%, rgba(0,0,0,0) 100%)',
                    maskImage:
                        'radial-gradient(circle at bottom center, rgba(0,0,0,1) 90%, rgba(0,0,0,0) 100%)',
                    opacity: 1,
                    scale: 0.8
                })
            .to('#textOrg h2, #textOrg p', {
                backgroundImage: 'radial-gradient(circle at 50% 60.0674vh, rgb(76, 0, 255) 0vh, rgb(49, 6, 150) 50vh, rgb(16, 0, 54) 90vh, rgba(32, 31, 66, 0) 124.981vh)',
                opacity: 0.85

            }, '>')

            .to('#textOrg', {
                opacity: 0
            }, '>')


        // const dateAnimation = gsap.timeline({
        //     ease: "power2.out",
        //     scrollTrigger: {
        //         scrub: 1,
        //         start: "250",
        //         end: " 850"
        //     }
        // })

        // dateAnimation
        //     .to('#dateLogo', {
        //         scale: 0.8
        //     })
        //     .fromTo('#dateLogo',
        //         {
        //             webkitMaskImage:
        //                 'radial-gradient(circle at bottom center, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 0%)',
        //             maskImage:
        //                 'radial-gradient(circle at bottom center, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 0%)',
        //             opacity: 0

        //         },
        //         {
        //             webkitMaskImage:
        //                 'radial-gradient(circle at bottom center, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)',
        //             maskImage:
        //                 'radial-gradient(circle at bottom center, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)',
        //             opacity: 1
        //         },)
        //     .to('#heroMask', { display: 'none' }, '>')
        //     .to('#dateLogo h3', {
        //         backgroundImage: 'radial-gradient(circle at 50% 60.0674vh, rgb(76, 0, 255) 0vh, rgb(49, 6, 150) 50vh, rgb(16, 0, 54) 90vh, rgba(32, 31, 66, 0) 124.981vh)',
        //         opacity: 0.8658

        //     }, '>')

        //     .to('#dateLogo', {
        //         webkitMaskImage:
        //             'radial-gradient(circle at top center, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 0%)',
        //         maskImage:
        //             'radial-gradient(circle at top center, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 0%)',
        //         opacity: 0
        //     }, '>')


    }, [])


    return (
        <>
            <div id="heroMask" className='fixed top-0 w-full h-screen'>
                <div className='fixed z-index-0 top-0'>
                    <picture
                        id='heroComplete'
                        className='flex h-screen w-screen scale-110 object-cover justify-center relative'
                    >
                        <Image
                            src={backHero}
                            alt="Picture of the author"
                            className='h-screen w-auto object-cover z-1'
                        />
                        <Image
                            src={frontHero}
                            alt="Picture of the author"
                            className='h-screen w-auto absolute top-0 left-0 object-cover z-3 top-1/2 left-1/2 -translate-1/2'
                        />
                        <Image
                            src={textHero}
                            alt="Picture of the author"
                            className='absolute z-2 top-1/3 -translate-y-1/2 -translate-1/10 max-w-100 w-full max-h-1/4'
                            id='imgTextHero'
                        />

                    </picture>
                </div>
            </div>
            <div className='fixed top-0 w-full h-screen' id='dateLogo'>
                <Image
                    src={logoCasamiento}
                    alt="Picture of the author"
                    className='absolute z-2 top-1/3 left-1/2 translateResize sizeImg max-w-100'
                />
                <h2 className='uppercase absolute z-2 top-1/2 left-1/2 translateResize max-w-100 text-center font-bold w-full text-base/8 mt-10'>
                    Disponible
                    <br />
                    el 1 de enero
                    <br />
                    de 2027
                </h2>
            </div>
            <div className='fixed top-0 w-full h-screen' id='textOrg'>
                <div className='flex flex-col h-full justify-center'>
                    <h2>Córdoba, Argentina</h2>
                    <p className='w-full text-base/8 mt-6 text-[22px]'>
                        Yani y Leo siempre supieron que la vida podía sorprenderlos, pero mientras organizaban su gran día, los imprevistos no tardaron en aparecer. Entre risas, abrazos y momentos inesperados, se han apoyado el uno en el otro más que nunca… y ahora quieren que vos seas parte de esta aventura única, para celebrar juntos el amor que los une y que hace que cada instante valga la pena.
                    </p>
                </div>
            </div>
        </>

    )
}

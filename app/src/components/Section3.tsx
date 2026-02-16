'use client'
import Image from 'next/image'
import React, { useLayoutEffect, useRef } from 'react'
import backHero from '../assets/images/backHero.svg'
import frontHero from '../assets/images/frontHero.svg'
import textHero from '../assets/images/logoHero.svg'
import logoCasamiento from '../assets/images/logoCasamiento.svg'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '@/app/src/styles/invitation.css'

export const Section3 = () => {

    const video3Ref = useRef<HTMLVideoElement>(null);

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const video3 = video3Ref.current;
        const mainTrigger = document.querySelector('#mainContainer');

        if (!video3) return;

        const setupTimeline = () => {
            const duration3 = video3.duration || 2;

            const heroTimeline = gsap.timeline({
                scrollTrigger: {
                    trigger: mainTrigger,
                    start: '67.5%',
                    end: '90%',
                    scrub: 1,
                    invalidateOnRefresh: true,
                }
            });

            heroTimeline

                .fromTo('#thirdVideoSec',
                    { autoAlpha: 0 },
                    { autoAlpha: 1 })
                .to(video3, {
                    currentTime: duration3,
                    onUpdate: () => {
                        if (video3.paused) () => video3.pause();
                    }
                }, '<')
                .fromTo('#thirdVideoSec',
                    { autoAlpha: 0},
                    { autoAlpha: 1 }, '<')
                .to(video3, {
                    currentTime: duration3,
                    onUpdate: () => {
                        if (video3.paused) () => video3.pause();
                    }
                }, '<')
                .to('#thirdVideoSec', { autoAlpha: 0 })
        };


        if (video3.readyState >= 1) {

        } else {
            video3.onloadedmetadata = setupTimeline;
        }
        setupTimeline();

    }, []);

    return (
        <div style={{ height: '100vh' }}>
            <div
                id="thirdVideoSec"
                className='fixed top-0 left-0 w-full h-screen'
                style={{ zIndex: 5 }}
            >
                <video
                    ref={video3Ref}
                    src="/videos/thirdVideo.mp4"
                    muted
                    playsInline
                    preload="auto"
                    className="w-full h-full object-cover"
                />
            </div>
        </div>
    )

}

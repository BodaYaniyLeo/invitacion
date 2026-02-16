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

export const Section2 = () => {

    const video2Ref = useRef<HTMLVideoElement>(null);

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const video2 = video2Ref.current;
        const mainTrigger = document.querySelector('#mainContainer');

        if (!video2) return;

        const setupTimeline = () => {
            const duration2 = video2.duration || 5;

            const heroTimeline = gsap.timeline({
                scrollTrigger: {
                    trigger: mainTrigger,
                    start: '45%',
                    end: '67.5%',
                    scrub: 1,
                    invalidateOnRefresh: true,
                }
            });

            heroTimeline

                .fromTo('#secondVideoSec',
                    { autoAlpha: 0, duration: 0.5 },
                    { autoAlpha: 1 })
                .to(video2, {
                    currentTime: duration2,
                    duration: 1,
                    onUpdate: () => {
                        if (video2.paused) () => video2.pause();
                    }
                }, '<')
                .fromTo('#secondVideoSec',
                    { autoAlpha: 0, duration: 0.5 },
                    { autoAlpha: 1 }, '<')
                .to(video2, {
                    currentTime: duration2,
                    duration: 1,
                    onUpdate: () => {
                        if (video2.paused) () => video2.pause();
                    }
                }, '<')
                .to('#secondVideoSec', { autoAlpha: 0 })

        };

        if (video2.readyState >= 1) {
            setupTimeline();
        } else {
            video2.onloadedmetadata = setupTimeline;
        }

        setupTimeline();

    }, []);

    return (
        <div style={{ height: '100vh' }}>
            <div
                id="secondVideoSec"
                className='fixed top-0 left-0 w-full h-screen'
                style={{ zIndex: 5 }}
            >
                <video
                    ref={video2Ref}
                    src="/videos/secondVideo.mp4"
                    muted
                    playsInline
                    preload="auto"
                    className="w-full h-full object-cover"
                />
            </div>
        </div>
    )

}

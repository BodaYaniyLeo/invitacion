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

export const Section1 = () => {

    const videoRef = useRef<HTMLVideoElement>(null);

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const video = videoRef.current;
        const mainTrigger = document.querySelector('#mainContainer');

        if (!video) return;

        const setupTimeline = () => {
            const duration = video.duration || 5;

            const heroTimeline = gsap.timeline({
                scrollTrigger: {
                    trigger: mainTrigger,
                    start: '22.5%',
                    end: '45%',
                    scrub: 1,
                    invalidateOnRefresh: true,
                }
            });

            heroTimeline
                .fromTo('#firstVideoSec',
                    { autoAlpha: 0, duration: 0.5 },
                    { autoAlpha: 1 })
                .to(video, {
                    currentTime: duration,
                    duration: 1,
                    onUpdate: () => {
                        if (video.paused) () => video.pause();
                    }
                }, '<')
                .fromTo('#firstVideoSec',
                    { autoAlpha: 0, duration: 0.5 },
                    { autoAlpha: 1 }, '<')
                .to(video, {
                    currentTime: duration,
                    duration: 1,
                    onUpdate: () => {
                        if (video.paused) () => video.pause();
                    }
                }, '<')
                .to('#firstVideoSec', { autoAlpha: 0 })
        };

        if (video.readyState >= 1) {
            setupTimeline();
        } else {
            video.onloadedmetadata = setupTimeline;
        }

    }, []);

    return (
        <div style={{ height: '100vh' }}>
            <div
                id="firstVideoSec"
                className='fixed top-0 left-0 w-full h-screen'
                style={{ zIndex: 5 }}
            >
                <video
                    ref={videoRef}
                    src="/videos/firstVideo.mp4"
                    muted
                    playsInline
                    preload="auto"
                    className="w-full h-full object-cover"
                />
            </div >
        </div>
    )

}

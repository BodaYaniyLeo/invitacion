'use client'
import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { HeroSection } from './HeroSection';
import { VideoSection } from './VideoSection';
import { TextLayer } from './TextLayer';

export const Invitation = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const video1Progress = useRef({ t: 0 });
    const video2Progress = useRef({ t: 0 });

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        let targetScroll = window.scrollY;
        let currentScroll = window.scrollY;
        let rafId: number;
        let touchStartY = 0;
        let lastTouchY = 0;
        let velocity = 0;
        const speed = 0.08;
        const touchMultiplier = 0.5;



        const onWheel = (e: WheelEvent) => {
            e.preventDefault();
            targetScroll += e.deltaY * 0.4;
            targetScroll = Math.max(0, Math.min(targetScroll, document.body.scrollHeight - window.innerHeight));
        };

        const onTouchStart = (e: TouchEvent) => {
            touchStartY = e.touches[0].clientY;
            lastTouchY = touchStartY;
            velocity = 0;
        };

        const onTouchMove = (e: TouchEvent) => {
            e.preventDefault();
            const touchY = e.touches[0].clientY;
            const delta = (lastTouchY - touchY) * touchMultiplier;

            velocity = delta;
            targetScroll += delta;
            targetScroll = Math.max(0, Math.min(targetScroll, document.body.scrollHeight - window.innerHeight));

            lastTouchY = touchY;
        };

        const onTouchEnd = (e: TouchEvent) => {
            velocity = 0;
            targetScroll = window.scrollY;
            currentScroll = window.scrollY;
        };

        const loop = () => {
            currentScroll += (targetScroll - currentScroll) * speed;
            window.scrollTo(0, currentScroll);
            rafId = requestAnimationFrame(loop);
        };

        window.addEventListener('wheel', onWheel, { passive: false });
        window.addEventListener('touchstart', onTouchStart, { passive: false });
        window.addEventListener('touchmove', onTouchMove, { passive: false });
        window.addEventListener('touchend', onTouchEnd);
        rafId = requestAnimationFrame(loop);

        const v1 = containerRef.current?.querySelector('#video1 video') as HTMLVideoElement;
        const v2 = containerRef.current?.querySelector('#video2 video') as HTMLVideoElement;

        gsap.ticker.add(() => {
            if (v1 && v1.readyState >= 2) v1.currentTime = video1Progress.current.t;
            if (v2 && v2.readyState >= 2) v2.currentTime = video2Progress.current.t;
        });

        let ctx = gsap.context(() => {
            const masterTl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top top',
                    end: 'bottom bottom',
                    scrub: true,
                    invalidateOnRefresh: true,
                    anticipatePin: 1,
                    pinSpacing: false,
                }
            });

            masterTl
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
                .to('#dateLogo h3', {
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
                        scale: 0.85
                    })
                .to('#textOrg h2, #textOrg p', {
                    backgroundImage: 'radial-gradient(circle at 50% 60.0674vh, rgb(76, 0, 255) 0vh, rgb(49, 6, 150) 50vh, rgb(16, 0, 54) 90vh, rgba(32, 31, 66, 0) 124.981vh)',
                    opacity: 0.85,
                    duration: 1
                }, '>')
                .to('#textOrg', { autoAlpha: 0 }, '>')

                .to('#heroSection', { opacity: 0, duration: 1 }, '-=1')

                .fromTo('#video1', { autoAlpha: 0 }, { autoAlpha: 1, duration: 1 }, '-=1')
                .to(video1Progress.current, { t: 2, ease: 'none', duration: 4.5 }, "-=2")
                .fromTo('#text1',
                    { y: '100%' },
                    { y: '-100%', duration: 3 },
                    '-=2.7'
                )
                .to('#video1', { autoAlpha: 0, duration: 0.6 }, '-=2.7')

                .fromTo('#video2', { autoAlpha: 0 }, { autoAlpha: 1, duration: 1 }, '-=1')
                .to(video2Progress.current, { t: 2, ease: 'none', duration: 3 }, "-=2")
                .fromTo('#text2',
                    { y: '100%' },
                    { y: '-100%', duration: 3 },
                    '-=0.8'
                )
                .to('#video2', { autoAlpha: 0, duration: 0.6 }, '-=2.7')

        }, containerRef);

        return () => {
            ctx.revert()
            window.removeEventListener('wheel', onWheel);
            window.removeEventListener('touchstart', onTouchStart);
            window.removeEventListener('touchmove', onTouchMove);
            window.removeEventListener('touchend', onTouchEnd);
            cancelAnimationFrame(rafId);
        };
    }, []);

    return (
        <div ref={containerRef} style={{ height: '400vh' }} className="bg-black">
            <HeroSection id="heroSection" />

            <TextLayer id="text1" title="Leo" subtitle="Una historia que apenas comienza..." text="Texto largo con lo que sea" />
            <TextLayer id="text2" title="Yani" subtitle="El momento que siempre soñamos." text="Texto largo con lo que sea" />


            <VideoSection id="video1" src="/videos/firstVideo_v2.mp4" zIndex={10} />
            <VideoSection id="video2" src="/videos/secondVideo_v2.mp4" zIndex={9} />
        </div>
    );
};
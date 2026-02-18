'use client'
import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ZHeroSection } from './ZHeroSection';
import { ZVideoSection } from './ZVideoSection';
import { ZTextLayer } from './ZTextLayer';

export const ZInvitation = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const video1Progress = useRef({ t: 0 });
    const video2Progress = useRef({ t: 0 });

    useLayoutEffect(() => {

        gsap.registerPlugin(ScrollTrigger);

        let targetScroll = window.scrollY;
        let currentScroll = window.scrollY;
        let rafId: number;
        let lastTouchY = 0;
        let velocity = 0;
        const speed = 0.08;
        const touchMultiplier = 0.8;

        const loop = () => {
            currentScroll += (targetScroll - currentScroll) * speed;
            window.scrollTo(0, currentScroll);
            rafId = requestAnimationFrame(loop);
        };
        const onWheel = (e: WheelEvent) => {
            e.preventDefault();
            targetScroll += e.deltaY * 1.8;
            targetScroll = Math.max(0, Math.min(targetScroll, document.body.scrollHeight - window.innerHeight));
        };

        const onTouchStart = (e: TouchEvent) => {
            lastTouchY = e.touches[0].clientY;
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

        const onTouchEnd = () => {
            const maxVelocity = 15;
            velocity = Math.sign(velocity) * Math.min(Math.abs(velocity), maxVelocity);
            const applyInertia = () => {
                if (Math.abs(velocity) < 2) { velocity = 0; return; }
                velocity *= 0.6;
                targetScroll += velocity;
                targetScroll = Math.max(0, Math.min(targetScroll, document.body.scrollHeight - window.innerHeight));
                requestAnimationFrame(applyInertia);
            };
            requestAnimationFrame(applyInertia);
        };

        window.addEventListener('wheel', onWheel, { passive: false });
        window.addEventListener('touchstart', onTouchStart, { passive: false });
        window.addEventListener('touchmove', onTouchMove, { passive: false });
        window.addEventListener('touchend', onTouchEnd);
        rafId = requestAnimationFrame(loop);

        let ctx = gsap.context(() => {
            const masterTl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top top',
                    end: '50% bottom',
                    scrub: 1,
                    invalidateOnRefresh: true,
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


            ScrollTrigger.create({
                trigger: containerRef.current,
                start: '43% bottom',
                end: '70% bottom',
                scrub: 0.1,
                invalidateOnRefresh: true,
                onEnter: () => { gsap.killTweensOf('#video1'); gsap.set('#video1', { zIndex: 11 }); gsap.to('#video1', { autoAlpha: 1, duration: 0.5 }); },
                onLeave: () => { gsap.killTweensOf('#video1'); gsap.to('#video1', { autoAlpha: 0, duration: 0.5, onComplete: () => { gsap.set('#video1', { zIndex: 8 }); } }); },
                onEnterBack: () => { gsap.killTweensOf('#video1'); gsap.set('#video1', { zIndex: 11 }); gsap.to('#video1', { autoAlpha: 1, duration: 0.5 }); },
                onLeaveBack: () => { gsap.killTweensOf('#video1'); gsap.to('#video1', { autoAlpha: 0, duration: 0.5, onComplete: () => { gsap.set('#video1', { zIndex: 8 }); } }); },
                animation: gsap.timeline().to(video1Progress.current, { t: 2, ease: 'none', duration: 4.5 }),
            });

            ScrollTrigger.create({
                trigger: containerRef.current,
                start: '70% bottom', // ← diferente al video1
                end: '100% bottom',
                scrub: 0.1,
                invalidateOnRefresh: true,
                onEnter: () => { gsap.killTweensOf('#video2'); gsap.set('#video2', { zIndex: 11 }); gsap.to('#video2', { autoAlpha: 1, duration: 0.5 }); },
                onLeave: () => { gsap.killTweensOf('#video2'); gsap.to('#video2', { autoAlpha: 0, duration: 0.5, onComplete: () => { gsap.set('#video2', { zIndex: 8 }); } }); },
                onEnterBack: () => { gsap.killTweensOf('#video2'); gsap.set('#video2', { zIndex: 11 }); gsap.to('#video2', { autoAlpha: 1, duration: 0.5 }); },
                onLeaveBack: () => { gsap.killTweensOf('#video2'); gsap.to('#video2', { autoAlpha: 0, duration: 0.5, onComplete: () => { gsap.set('#video2', { zIndex: 8 }); } }); },
                animation: gsap.timeline().to(video2Progress.current, { t: 2, ease: 'none', duration: 4.5 }),
            });

        }, containerRef);

        return () => {
            ctx.revert();
            window.removeEventListener('wheel', onWheel);
            window.removeEventListener('touchstart', onTouchStart);
            window.removeEventListener('touchmove', onTouchMove);
            window.removeEventListener('touchend', onTouchEnd);
            cancelAnimationFrame(rafId);
        };
    }, []);

    return (
        <div ref={containerRef} className="bg-black" style={{ height: '500vh' }}>
            <ZHeroSection id="heroSection" />
            <ZTextLayer id="text1" title="Leo" subtitle="Una historia que apenas comienza..." text="Texto largo con lo que sea" />
            <ZTextLayer id="text2" title="Yani" subtitle="El momento que siempre soñamos." text="Texto largo con lo que sea" />
            <ZVideoSection id="video1" src="/videos/firstVideo_v6.mp4" zIndex={9} progressRef={video1Progress} />
            <ZVideoSection id="video2" src="/videos/secondVideo_v6.mp4" zIndex={9} progressRef={video2Progress} />
        </div>
    );
};
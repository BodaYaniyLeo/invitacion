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
        const touchMultiplier = 1.2;

        const onWheel = (e: WheelEvent) => {
            e.preventDefault();
            targetScroll += e.deltaY * 1;
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

        const onTouchEnd = () => {
            const applyInertia = () => {
                if (Math.abs(velocity) < 0.5) return;

                velocity *= 0.72;
                targetScroll += velocity;
                targetScroll = Math.max(0, Math.min(targetScroll, document.body.scrollHeight - window.innerHeight));

                requestAnimationFrame(applyInertia);
            };
            requestAnimationFrame(applyInertia);
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
                    end: '50% bottom',
                    scrub: 1,
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

            const v1Tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: '40% bottom',
                    end: '70% bottom',
                    scrub: 1,
                    invalidateOnRefresh: true,
                    anticipatePin: 1,
                    pinSpacing: false,
                }
            });

            v1Tl
                .fromTo('#video1', { autoAlpha: 0 }, { autoAlpha: 1, duration: 1 }, '-=1')
                .to(video1Progress.current, { t: 2, ease: 'none', duration: 4.5 }, "-=1")
                .to('#video1', { autoAlpha: 0, duration: 0.5 }, '-=2.5')
            // .to('#text1', { autoAlpha: 0 })

            const v2Tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: '60% bottom',
                    end: '90% bottom',
                    scrub: 1,
                    invalidateOnRefresh: true,
                    anticipatePin: 1,
                    pinSpacing: false,
                }
            });

            v2Tl
                .fromTo('#video2', { autoAlpha: 0 }, { autoAlpha: 1, duration: 1 }, '=-0.2')
                .to(video2Progress.current, { t: 2, ease: 'none', duration: 4.5 }, "-=1")
                .to('#video2', { autoAlpha: 0, duration: 0.5 }, '-=0.4')
            // .to('#text1', { autoAlpha: 0 })

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
        <div ref={containerRef} className="bg-black">
            <div className='h-[100vh]'>
                <HeroSection id="heroSection" />
            </div>

            <div className='relative inset-0 z-[15]'>
                <div className='h-[520vh]'></div>
                <div className='h-[100vh]'>
                    <TextLayer id="text1" title="Leo" subtitle="Una historia que apenas comienza..." text="Texto largo con lo que sea" />
                </div>
                <div className='h-[340vh]'></div>
                <div className='h-[100vh]'>
                    <TextLayer id="text2" title="Yani" subtitle="El momento que siempre soñamos." text="Texto largo con lo que sea" />
                </div>
            </div>

            <div className='h-[100vh]'>
                <VideoSection id="video1" src="/videos/firstVideo_v6.mp4" zIndex={10} />
            </div>
            <div className='h-[100vh]'>
                <VideoSection id="video2" src="/videos/secondVideo_v6.mp4" zIndex={9} />
            </div>
        </div>
    );
};
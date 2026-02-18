'use client'
import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ZHeroSection } from './ZHeroSection';
import { ZVideoSection } from './ZVideoSection';
import { ZTextLayer } from './ZTextLayer';

const makeFrames = (prefix: string, ext: string, count: number): string[] =>
    Array.from({ length: count }, (_, i) =>
        `${prefix}${String(i + 1).padStart(4, '0')}${ext}`
    );

const VIDEO_DURATION = 2;
const FRAME_COUNT = 60;

// Rutas limpias para Next.js (carpeta public)
const video1Frames = makeFrames('/videos/frames/video1/firstVideoMobile_', '.webp', FRAME_COUNT);
const video2Frames = makeFrames('/videos/frames/video2/secondVideoMobile_', '.webp', FRAME_COUNT);
const video3Frames = makeFrames('/videos/frames/video3/thirdVideoMobile_', '.webp', FRAME_COUNT);

export const ZInvitation = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const v1Progress = useRef({ t: 0 });
    const v2Progress = useRef({ t: 0 });
    const v3Progress = useRef({ t: 0 });

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        let ctx = gsap.context(() => {

            const masterTl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top top',
                    end: '60% bottom',
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

            const tlV1 = gsap.timeline();
            tlV1.to('#video1', { autoAlpha: 1, duration: 0.3 })
                .to(v1Progress.current, { t: VIDEO_DURATION, ease: 'none', duration: 1 }, 0)
                .to('#video1', { autoAlpha: 0, duration: 0.4 }, '-=0.35');

            ScrollTrigger.create({
                trigger: containerRef.current,
                start: '55% bottom',
                end: '70% bottom',
                scrub: true,
                animation: tlV1,
            });

            // Video 2
            const tlV2 = gsap.timeline();
            tlV2.to('#video2', { autoAlpha: 1, duration: 0.1 })
                .to(v2Progress.current, { t: VIDEO_DURATION, ease: 'none', duration: 1 }, 0)
                .to('#video2', { autoAlpha: 0, duration: 0.1 });

            ScrollTrigger.create({
                trigger: containerRef.current,
                start: '70% bottom',
                end: '85% bottom',
                scrub: true,
                animation: tlV2,
            });

            // Video 3
            const tlV3 = gsap.timeline();
            tlV3.to('#video3', { autoAlpha: 1, duration: 0.1 })
                .to(v3Progress.current, { t: VIDEO_DURATION, ease: 'none', duration: 1 }, 0)
                .to('#video3', { autoAlpha: 0, duration: 0.1 });

            ScrollTrigger.create({
                trigger: containerRef.current,
                start: '85% bottom',
                end: '100% bottom',
                scrub: true,
                animation: tlV3,
            });
        }, containerRef);

        return () => {
            ctx.revert();
        };
    }, []);

    return (
        <div ref={containerRef} className="bg-black" style={{ height: '1000vh' }}>
            <ZHeroSection id="heroSection" />
            <div className='h-[500hv]'></div>
            <ZVideoSection id="video1" zIndex={10} progressRef={v1Progress} frames={video1Frames} duration={VIDEO_DURATION} />
            <ZVideoSection id="video2" zIndex={11} progressRef={v2Progress} frames={video2Frames} duration={VIDEO_DURATION} />
            <ZVideoSection id="video3" zIndex={12} progressRef={v3Progress} frames={video3Frames} duration={VIDEO_DURATION} />

            <ZTextLayer id="text1" title="Leo" subtitle="Historia" text="..." contH={150} />
            <ZTextLayer id="text2" title="Yani" subtitle="Sueño" text="..." contH={100} />
            <ZTextLayer id="text3" title="Ubicación" subtitle="Lugar" text="..." contH={100} />
        </div>
    );
};
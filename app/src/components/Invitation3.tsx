'use client'
import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { HeroSection } from './HeroSection';
import { VideoSection } from './VideoSection';
import { TextLayer } from './TextLayer';
import { VisitCalina } from './VisitCalina';
import { Price } from './Price';

type arrayData = {
    id: number;
    name: string;
    lastname: string;
    payment_coverage: number;
    state: string;
    confirm: boolean;
}

type dataInv = {
    data: arrayData[]
}

const makeFrames = (prefix: string, ext: string, count: number): string[] =>
    Array.from({ length: count }, (_, i) =>
        `${prefix}${String(i + 1).padStart(4, '0')}${ext}`
    );

const VIDEO_DURATION = 2;
const FRAME_COUNT = 120;

const video1Frames = makeFrames('/videos/frames/video1/firstVideoMobile_', '.webp', FRAME_COUNT);
const video2Frames = makeFrames('/videos/frames/video2/secondVideoMobile_', '.webp', 180);
const video3Frames = makeFrames('/videos/frames/video3/thirdVideoMobile_', '.webp', FRAME_COUNT);
const videoCalinaFrames = makeFrames('/videos/frames/calinaVideo/calinaVideo_', '.webp', FRAME_COUNT);

export const Invitation = ({
    data
}: dataInv) => {
    const mainRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const footerRef = useRef<HTMLDivElement>(null);

    const v1Progress = useRef({ t: 0 });
    const v2Progress = useRef({ t: 0 });
    const vCalinaProgress = useRef({ t: 0 });

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        let ctx = gsap.context(() => {

            const masterTl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top top',
                    end: '+=2500',
                    scrub: true,
                    pin: true,
                }
            });

            masterTl.set(['#video1', '#video2'], { autoAlpha: 0 });
            masterTl.set('#heroSection', { backdropFilter: "blur(30px)" });

            masterTl
                .set('#heroComplete', { transformOrigin: "50% 40%" })
                .to('#heroComplete', { scale: 1.1, duration: 2, ease: "none" })
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

                .to('#dateLogo h3', {
                    backgroundImage: 'radial-gradient(circle at 50% 60.0674vh, rgb(76, 0, 255) 0vh, rgb(49, 6, 150) 50vh, rgb(16, 0, 54) 90vh, rgba(32, 31, 66, 0) 124.981vh)',
                    duration: 1
                })

                .to('#heroMask', { display: 'none' }, '<')
                .to('#dateLogo', {
                    webkitMaskImage: 'radial-gradient(circle at top center, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 0%)',
                    maskImage: 'radial-gradient(circle at top center, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 0%)',
                    autoAlpha: 0
                }, "-=0.3")

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
                    })
                .to('#textOrg', { scale: 0.85, duration: 2 }, '<')
                .addLabel("transicionVideo")

                .to('#textOrg h2, #textOrg p', {
                    backgroundImage: 'radial-gradient(circle at 50% -30vh, #dfb7df 0, #960696 50vh, #570157 90vh, rgba(32, 31, 66, 0) 150vh)',
                    duration: 2
                }, '<')
                .to('#textOrg h2, #textOrg p', {
                    autoAlpha: 0,
                    duration: 0.5
                }, 'transicionVideo-=1')
                .to('#heroSection', { backdropFilter: "blur(0px)", duration: 0.15, ease: "power1.inOut" }, 'transicionVideo-=0.5')

                .addLabel("escenaVideo1")
                .to('#video1', { autoAlpha: 1, duration: 0.5 }, "transicionVideo-=1")
                .to(v1Progress.current, { t: VIDEO_DURATION, duration: 10, ease: "none" }, "transicionVideo-=3")

                .fromTo('#text1',
                    {
                        y: '100vh',
                    },
                    {
                        y: '-100vh',
                        opacity: 1,
                        duration: 4,
                        ease: "none"
                    }, "escenaVideo1")
                .addLabel("escenaVideo2")
                .to('#video1', { autoAlpha: 0, duration: 0.5 }, "escenaVideo1+=2")

                .to('#video2', { autoAlpha: 1, duration: 0.5 }, "-=4")
                .to(v2Progress.current, { t: VIDEO_DURATION, duration: 8, ease: "none" }, "<")

                .fromTo('#text2',
                    {
                        y: '100vh',
                    },
                    {
                        y: '-100vh',
                        opacity: 1,
                        duration: 4,
                        ease: "none"
                    }, "escenaVideo2-=1.2")
                .to('#video2', { autoAlpha: 0, duration: 0.5 }, "escenaVideo2+=0.8")

            gsap.to(vCalinaProgress.current, {
                t: VIDEO_DURATION,
                ease: "none",
                duration: 4,
                scrollTrigger: {
                    trigger: "#triggerCalina",
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            });

            const finalTl = gsap.timeline({
                scrollTrigger: {
                    trigger: "#footerPrice",
                    start: "top top",
                    end: "bottom bottom",
                    pin: true,
                    scrub: 1,
                }
            });

            finalTl
                .to(vCalinaProgress.current, { t: VIDEO_DURATION, duration: 2 }, 0)

                .to('#priceData', {
                    autoAlpha: 1,
                    pointerEvents: 'auto',
                    duration: 0.5
                })

                .to('#priceData .toScale', { scale: 0.8, duration: 1 })
                .to('#confirmData', { autoAlpha: 1, visibility: 'visible', y: 0, duration: 0.5 });

        }, mainRef);

        return () => {
            ctx.revert();
        };
    }, []);

    return (
        <div ref={mainRef}>
            <div ref={containerRef} className="w-dvw h-screen overflow-hidden">
                <HeroSection id="heroSection" />
                <VideoSection id="video1" progressRef={v1Progress} frames={video1Frames} duration={VIDEO_DURATION} video={'full'} />
                <VideoSection id="video2" progressRef={v2Progress} frames={video2Frames} duration={VIDEO_DURATION} video={'full'} />

                <div className="absolute inset-0 z-[100] flex items-center justify-center pointer-events-none">
                    <TextLayer id="text1" title="Leo" subtitle="Historia" text="..." />
                    <TextLayer id="text2" title="Yani" subtitle="Sueño" text="..." />
                </div>
            </div>

            <div id="triggerCalina" className="relative bg-black h-screen overflow-hidden">
                <VisitCalina
                    id="videoCalina"
                    progressRef={vCalinaProgress}
                    frames={videoCalinaFrames}
                    duration={VIDEO_DURATION}
                    video={'salon'}
                />

            </div>
            <div id="footerPrice" className="relative bg-black h-[120vh] overflow-hidden">
                <Price
                    id="priceData"
                    idText="confirmData"
                    data={data}
                />
            </div>
        </div>
    );
};
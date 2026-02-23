'use client'
import { useLayoutEffect, useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { HeroSection } from './HeroSection';
import { VideoSection } from './VideoSection';
import { TextLayer } from './TextLayer';
import { VisitCalina } from './VisitCalina';
import { Price } from './Price';
import { Intro } from './Intro'
import logoCalina from '../assets/images/visitCalina.svg'
import Image from 'next/image'
import { FinalLogo } from './FinalLogo'

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
    const presentation = useRef<HTMLDivElement>(null);
    const leoSection = useRef<HTMLDivElement>(null);
    const yaniSection = useRef<HTMLDivElement>(null);

    const v1Progress = useRef({ t: 0 });
    const v2Progress = useRef({ t: 0 });
    const vCalinaProgress = useRef({ t: 0 });

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add((time) => lenis.raf(time * 1000));
        gsap.ticker.lagSmoothing(0);

        return () => {
            lenis.destroy();
            gsap.ticker.remove(raf);
        };
    }, []);

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        let ctx = gsap.context(() => {

            const presentationTl = gsap.timeline({
                scrollTrigger: {
                    trigger: presentation.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true,
                    pin: true,
                    pinSpacing: false,
                }
            });

            presentationTl.set(['#video1', '#video2'], {
                autoAlpha: 0,
            });
            presentationTl.set(['#text', '#text'], {
                y: '100vh'
            })

            presentationTl
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


            const leoTl = gsap.timeline({
                scrollTrigger: {
                    trigger: "#leoContainer",
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true,
                    pin: leoSection.current,
                    pinSpacing: false,
                }
            });

            leoTl.set('#containerTextOrg', { backdropFilter: "blur(15px)", webkitBackdropFilter: "blur(15px)" });

            leoTl
                .fromTo('#containerTextOrg',
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
                .to('#textOrg h2, #textOrg p', {
                    backgroundImage: 'radial-gradient(circle at 50% -30vh, #dfb7df 0, #960696 50vh, #570157 90vh, rgba(32, 31, 66, 0) 150vh)',
                    duration: 2
                }, '<')
                .addLabel("transicionVideo")
                .to('#textOrg h2, #textOrg p', {
                    autoAlpha: 0,
                    duration: 0.6
                })
                .to('#containerTextOrg', {
                    webkitBackdropFilter: "blur(0px)",
                    backdropFilter: "blur(0px)",
                    duration: 0.6,
                    ease: "power1.inOut",
                }, "<")

                .to('#video1', { autoAlpha: 1, duration: 0.5 }, 'transicionVideo-=0.2')
                .addLabel("text1Appear")
                .to(v1Progress.current, {
                    t: VIDEO_DURATION, duration: 4, ease: "none",
                }, 'transicionVideo-=0.75')
                .to("#video1 canvas", {
                    WebkitMaskImage: "radial-gradient(circle at 95vw 0vh, rgb(0, 0, 0) 30vw, rgba(0, 0, 0, 0.15) 60vw)",
                    maskImage: "radial-gradient(circle at 95vw 0vh, rgb(0, 0, 0) 30vw, rgba(0, 0, 0, 0.15) 60vw)",
                    duration: 4
                }, "text1Appear+=0.5")
                .to('#video1', { autoAlpha: 0, duration: 1 }, "text1Appear+=1.7")

            const yaniTl = gsap.timeline({
                scrollTrigger: {
                    trigger: "#yaniContainer",
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true,
                    pin: yaniSection.current,
                    pinSpacing: false,
                }
            });

            yaniTl
                .to('#video2', { autoAlpha: 1, duration: 0.5 })
                .addLabel("text2Appear")
                .to(v2Progress.current, {
                    t: VIDEO_DURATION, duration: 4, ease: "none",
                }, '-=0.75')
                .to("#video2 canvas", {
                    WebkitMaskImage: "radial-gradient(circle at 95vw 0vh, rgb(0, 0, 0) 30vw, rgba(0, 0, 0, 0.15) 60vw)",
                    maskImage: "radial-gradient(circle at 95vw 0vh, rgb(0, 0, 0) 30vw, rgba(0, 0, 0, 0.15) 60vw)",
                    duration: 4
                }, "text2Appear+=0.2")
                .to('#video2', { autoAlpha: 0, duration: 1 }, "text2Appear+=2.2")
                .to('#text2', { autoAlpha: 0, duration: 1 }, "text2Appear+=3")


            const catalinaTl = gsap.timeline({
                scrollTrigger: {
                    trigger: "#triggerCalina",
                    start: "top top",
                    end: "bottom top",
                    scrub: 1,
                }
            });

            catalinaTl
                .to(vCalinaProgress.current, { t: VIDEO_DURATION, duration: 2 }, 0)

            const logoFooterTl = gsap.timeline({
                scrollTrigger: {
                    trigger: "#footerPrice",
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                    pin: true,
                }
            });

            logoFooterTl
                .set(["#finalAnimation", "#confirmData"], { y: "50%" })
                .to("#finalAnimation", { autoAlpha: 1 })
                .to("#finalAnimation", { scale: 0.8 })
                .to("#confirmData", { autoAlpha: 1 })
                .to(["#finalAnimation", "#confirmData"], { y: 0, duration: 1 })


        }, mainRef);

        return () => {
            ctx.revert();
        };
    }, []);

    return (
        <div ref={mainRef}>
            <div ref={presentation} className="w-full h-[300dvh]">
                <HeroSection id="heroSection" />
            </div>

            <div className="w-full h-[200dvh] relative" id="leoContainer">

                <div ref={leoSection} className="w-full h-dvh">
                    <Intro />
                    <VideoSection
                        id="video1"
                        progressRef={v1Progress}
                        frames={video1Frames}
                        duration={VIDEO_DURATION}
                        video={'full'}
                    />
                </div>

                <div className="absolute bottom-0 left-0 w-full h-dvh z-20 flex items-center justify-center pointer-events-none">
                    <TextLayer id="text1" title="Leo" subtitle="Historia" text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book." />
                </div>
            </div>

            <div className="w-full h-[200dvh] relative" id="yaniContainer">

                <div ref={yaniSection} className="w-full h-dvh">
                    <VideoSection
                        id="video2"
                        progressRef={v2Progress}
                        frames={video2Frames}
                        duration={VIDEO_DURATION}
                        video={'full'}
                    />
                </div>

                <div className="absolute bottom-0 left-0 w-full h-dvh z-20 flex items-center justify-center pointer-events-none">
                    <TextLayer id="text2" title="Yani" subtitle="Sueño" text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book." />
                </div>
            </div>

            <div id="triggerCalina" className="w-full h-[100lvh] content-center relative">
                <VisitCalina
                    id="videoCalina"
                    progressRef={vCalinaProgress}
                    frames={videoCalinaFrames}
                    duration={VIDEO_DURATION}
                    video={'salon'}
                />
            </div>

            <div id="footerPrice" className="relative h-[100dvh]">
                <Price
                    id="priceData"
                    idText="confirmData"
                    data={data}
                />
            </div>
        </div>
    );
};
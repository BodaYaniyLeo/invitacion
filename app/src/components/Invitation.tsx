'use client'
import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { HeroSection } from './HeroSection';
import { VideoSection } from './VideoSection';
import { TextLayer } from './TextLayer';
import { VisitCalina } from './VisitCalina';
import { Price } from './Price';
import { Intro } from './Intro'
import { useInvitationAnimations } from '../hooks/useInvitationAnimations'

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
            duration: 1.5,
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

    useInvitationAnimations({
        mainRef,
        presentation,
        leoSection,
        yaniSection,
        v1Progress,
        v2Progress,
        vCalinaProgress,
        VIDEO_DURATION
    });

    return (
        <div ref={mainRef} className='bg-black'>
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
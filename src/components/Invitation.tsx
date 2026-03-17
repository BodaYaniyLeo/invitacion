'use client'

import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import Lenis from 'lenis'
import { HeroSection } from './HeroSection';
import { VideoSection } from './VideoSection';
import { TextLayer } from './TextLayer';
import { VisitCalina } from './VisitCalina';
import { Price } from './Price';
import { Intro } from './Intro'
import { useInvitationAnimations } from '../hooks/useInvitationAnimations'
import { Countdown } from './Countdown'
import { FooterConfirm } from './FooterConfirm'
import { InfoSalon } from './InfoSalon'
import { MenuComponent } from './MenuComponent'

import { ArrayElements, userCommentsType, dataInv } from '@/app/page'

import { Itinerary } from './Itinerary';
import { DressCode } from './DressCode';
import { Carousel } from './Carousel';

export interface VideoProps {
    id: string;
    data: ArrayElements[];
    commentsData?: userCommentsType[];
}

const makeFrames = (prefix: string, ext: string, count: number): string[] =>
    Array.from({ length: count }, (_, i) =>
        `${prefix}${String(i + 1).padStart(4, '0')}${ext}`
    );

const VIDEO_DURATION = 2;
const FRAME_COUNT = 120;

const video1Frames = makeFrames('/videos/frames/video1/firstVideoMobile_', '.webp', FRAME_COUNT);
const video2Frames = makeFrames('/videos/frames/video2/secondVideoMobile_', '.webp', 180);
const videoFinalFrames = makeFrames('/videos/frames/videoFinal/finalVideoMobile_', '.webp', 110);
const videoCalinaFrames = makeFrames('/videos/frames/calinaVideo/calinaVideo_', '.webp', FRAME_COUNT);

const cacheEstatica: HTMLImageElement[] = [];

export const Invitation = ({
    data,
    commentsData
}: dataInv) => {
    const mainRef = useRef<HTMLDivElement>(null);
    const presentation = useRef<HTMLDivElement>(null);
    const leoSection = useRef<HTMLDivElement>(null);
    const yaniSection = useRef<HTMLDivElement>(null);
    const finalSection = useRef<HTMLDivElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null)

    const v1Progress = useRef({ t: 0 });
    const v2Progress = useRef({ t: 0 });
    const vFinalProgress = useRef({ t: 0 });
    const vCalinaProgress = useRef({ t: 0 });

    const [openMenu, setOpenMenu] = useState<boolean>(false)

    useEffect(() => {
        const allFrames = [...video1Frames, ...video2Frames, ...videoFinalFrames];

        allFrames.forEach((src) => {
            const img = new Image();
            img.src = src;
            cacheEstatica.push(img);
        });
    }, []);

    useEffect(() => {
        const priorityFrames = [video1Frames[0], video2Frames[0], videoCalinaFrames[0], videoFinalFrames[0]];

        const loadSequentially = async (array: string[]) => {
            for (const src of array) {
                await new Promise((resolve) => {
                    const img = new Image();
                    img.src = src;
                    img.onload = resolve;
                    img.onerror = resolve;
                });
            }
        };

        loadSequentially(priorityFrames).then(() => {
            loadSequentially(video1Frames);
            setTimeout(() => {
                loadSequentially([...video2Frames, ...videoCalinaFrames, ...videoFinalFrames]);
            }, 2000);
        });
    }, []);

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.5,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });

        const updateLenis = (time: number) => {
            lenis.raf(time * 1000);
        };

        gsap.ticker.add(updateLenis);
        gsap.ticker.lagSmoothing(0);

        return () => {
            lenis.destroy();
            gsap.ticker.remove(updateLenis);
        };
    }, []);

    const {
        infoSalonAnimation,
        menuCrossAnimation
    } = useInvitationAnimations({
        mainRef,
        presentation,
        leoSection,
        yaniSection,
        finalSection,
        v1Progress,
        v2Progress,
        vFinalProgress,
        vCalinaProgress,
        VIDEO_DURATION
    });

    const handleInfoSalon = () => {
        if (infoSalonAnimation.current) {
            infoSalonAnimation.current.restart();
            document.body.style.overflow = 'hidden';
            window.dispatchEvent(new CustomEvent('lock-scroll'));
        }
    }

    const handleBackInfo = () => {
        if (infoSalonAnimation.current) {
            infoSalonAnimation.current.reversed(true);

            document.body.style.overflow = '';
            window.dispatchEvent(new CustomEvent('unlock-scroll'));
        }
    }

    useEffect(() => {
        if (!menuCrossAnimation.current) return

        if (openMenu) {
            menuCrossAnimation.current.restart();
            window.dispatchEvent(new CustomEvent('lock-scroll'));
        } else {
            menuCrossAnimation.current.reversed(true);
            window.dispatchEvent(new CustomEvent('unlock-scroll'));
        }
    }, [openMenu])

    return (
        <div ref={mainRef} className='bg-black'>
            <button className='fixed top-5 right-5 w-12 h-12 z-70 rounded-full' onClick={() => setOpenMenu(prev => !prev)}>
                <div className='w-6 h-3 justify-self-center relative'>
                    <span id='panSup1' className='absolute bg-white w-3 h-1 block top-[6px] -translate-y-2 origin-center left-0'></span>
                    <span id='panSub1' className='absolute bg-white w-3 h-1 block bottom-[6px] translate-y-2 origin-center left-0'></span>
                    <span id='panSup2' className='absolute bg-white w-3 h-1 block top-[6px] -translate-y-2 origin-center right-0'></span>
                    <span id='panSub2' className='absolute bg-white w-3 h-1 block bottom-[6px] translate-y-2 origin-center right-0'></span>
                </div>
            </button>
            <div ref={presentation} className="w-full h-[300lvh]">
                <HeroSection id="heroSection" />
            </div>

            <div className="w-full h-[200lvh] relative" id="leoContainer">

                <div ref={leoSection} className="w-full h-lvh">
                    <Intro />
                    <VideoSection
                        id="video1"
                        progressRef={v1Progress}
                        frames={video1Frames}
                        duration={VIDEO_DURATION}
                        video={'full'}
                    />
                </div>

                <div className="absolute bottom-0 left-0 w-full h-lvh z-20 flex items-center justify-center pointer-events-none">
                    <TextLayer id="Leo" title="Leo" subtitle="Historia" text="Lorem Ipsum is simply dummy text of the printing and typesetting industry." />
                </div>
            </div>

            <div className="w-full h-[200lvh] relative" id="yaniContainer">

                <div ref={yaniSection} className="w-full h-lvh">
                    <VideoSection
                        id="video2"
                        progressRef={v2Progress}
                        frames={video2Frames}
                        duration={VIDEO_DURATION}
                        video={'full'}
                    />
                </div>

                <div className="absolute bottom-0 left-0 w-full h-lvh z-20 flex items-center justify-center pointer-events-none">
                    <TextLayer id="Yani" title="Yani" subtitle="Sueño" text="Lorem Ipsum is simply dummy text of the printing and typesetting industry." />
                </div>
            </div>

            <div id="triggerCalina" className="w-full h-[100lvh] content-center relative">
                <VisitCalina
                    id="videoCalina"
                    progressRef={vCalinaProgress}
                    frames={videoCalinaFrames}
                    duration={VIDEO_DURATION}
                    video={'salon'}
                    handleInfoSalon={handleInfoSalon}
                    setOpenMenu={setOpenMenu}
                />

                <Itinerary
                    data={data}
                />

                <DressCode />

                <Carousel
                    data={data}
                    commentsData={commentsData}
                />

                <Countdown />

                <div className="w-full h-[200lvh] relative" id="finalContainer">

                    <div ref={finalSection} className="w-full h-lvh">
                        <VideoSection
                            id="videoFinal"
                            progressRef={vFinalProgress}
                            frames={videoFinalFrames}
                            duration={VIDEO_DURATION}
                            video={'full'}
                        />
                    </div>
                </div>

                <div id="footerPrice" className="relative h-[100lvh] content-center">
                    <Price
                        id="priceData"
                        data={data}
                    />
                </div>

                <div id="footerConfirm" className="relative -mt-[30lvh]">
                    <FooterConfirm
                        id="confirmData"
                        data={data}
                    />
                </div>
            </div>
            <InfoSalon
                data={data}
                scrollRef={scrollRef}
                handleBackInfo={handleBackInfo}
            />

            <MenuComponent
                data={data}
                setOpenMenu={setOpenMenu}
            />
        </div >
    );
};
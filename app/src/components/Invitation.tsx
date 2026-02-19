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
const FRAME_COUNT = 60;

const video1Frames = makeFrames('/videos/frames/video1/firstVideoMobile_', '.webp', FRAME_COUNT);
const video2Frames = makeFrames('/videos/frames/video2/secondVideoMobile_', '.webp', FRAME_COUNT);
const video3Frames = makeFrames('/videos/frames/video3/thirdVideoMobile_', '.webp', FRAME_COUNT);
const videoCalinaFrames = makeFrames('/videos/frames/calinaVideo/calinaVideo_', '.webp', FRAME_COUNT);

export const Invitation = ({
    data
}: dataInv) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const v1Progress = useRef({ t: 0 });
    const v2Progress = useRef({ t: 0 });
    const v3Progress = useRef({ t: 0 });
    const vCalinaProgress = useRef({ t: 0 });

    const start1 = 40
    const start2 = 56
    const start3 = 82
    const startCalina = 77
    const startPrice = 86
    const end1 = 54
    const end2 = 78
    const end3 = 98
    const endCalina = 88
    const endPrice = 100
    const text1 = (start1 * 20) + 130
    const text2 = (start2 * 20) + 350
    const text3 = (start3 * 20) + 20
    const videoCalina = (startCalina * 20)
    const videoPrice = (startPrice * 20)

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

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

                .to('#heroSection', { opacity: 0, duration: 0.3 }, '-=1')

            const tlV1 = gsap.timeline({ paused: true });

            tlV1
                .to('#video1', { autoAlpha: 1, duration: 2, ease: 'none' }, "-=0.75")
                .to(v1Progress.current, { t: VIDEO_DURATION, ease: 'none', duration: 9 }, "<")
                .to('#video1', { autoAlpha: 0, duration: 1, ease: 'none' }, "-=0.5");

            ScrollTrigger.create({
                trigger: containerRef.current,
                start: `${start1}% bottom`,
                end: `${end1}% bottom`,
                scrub: true,
                animation: tlV1,
            });

            // Video 2
            const tlV2 = gsap.timeline({ paused: true });
            tlV2
                .to('#video2', { autoAlpha: 1, duration: 1, ease: 'none' }, 0.6)
                .to(v2Progress.current, { t: VIDEO_DURATION, ease: 'none', duration: 9 }, "-=0.5")
                .to('#video2', { autoAlpha: 0, duration: 1, ease: 'none' }, "-=1")

            ScrollTrigger.create({
                trigger: containerRef.current,
                start: `${start2}% bottom`,
                end: `${end2}% bottom`,
                scrub: true,
                animation: tlV2,
            });

            // Video Calina
            const tlVCalina = gsap.timeline();
            tlVCalina
                .to('#text2', { opacity: 0, duration: 3 }, 5)
                .to(vCalinaProgress.current, { t: 1, ease: 'none', duration: 4.5 })

            ScrollTrigger.create({
                trigger: containerRef.current,
                start: `${startCalina}% bottom`,
                end: `${endCalina}% bottom`,
                scrub: true,
                animation: tlVCalina,
            });

            const tlVFooter = gsap.timeline();
            tlVFooter
                .to('#priceData', { autoAlpha: 1, duration: 0.1 })
                .to('#priceData .toScale', { scale: 0.8 })
                .to('#priceData h3', {
                    backgroundImage: 'radial-gradient(circle at 50% 60.0674vh, rgb(76, 0, 255) 0vh, rgb(49, 6, 150) 50vh, rgb(16, 0, 54) 90vh, rgba(32, 31, 66, 0) 124.981vh)',
                }, '<')
                .to('#confirmData', { autoAlpha: 1, duration: 0.1 })
                .to('#priceData', { y: '-20%' }, "-=0.05")
                .to('#priceData p', {
                    backgroundImage: 'radial-gradient(circle at 50% 60.0674vh, rgb(76, 0, 255) 0vh, rgb(49, 6, 150) 50vh, rgb(16, 0, 54) 90vh, rgba(32, 31, 66, 0) 124.981vh)',
                }, '<')


            ScrollTrigger.create({
                trigger: containerRef.current,
                start: `${startPrice}% bottom`,
                end: `${endPrice}% bottom`,
                scrub: true,
                animation: tlVFooter,
            });

        }, containerRef);

        return () => {
            ctx.revert();
        };
    }, []);

    return (
        <div ref={containerRef} className="bg-black" style={{ height: '2000vh' }}>
            <HeroSection id="heroSection" />

            <VideoSection
                id="video1"
                zIndex={10}
                progressRef={v1Progress}
                frames={video1Frames}
                duration={VIDEO_DURATION}
                video={'full'}
            />

            <VideoSection
                id="video2"
                zIndex={11}
                progressRef={v2Progress}
                frames={video2Frames}
                duration={VIDEO_DURATION}
                video={'full'}
            />

            {/* <VideoSection
                id="video3"
                zIndex={12}
                progressRef={v3Progress}
                frames={video3Frames}
                duration={VIDEO_DURATION}
                video={'full'}
            /> */}


            {/* <TextLayer
                id="text1"
                title="Leo"
                subtitle="Historia"
                text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. "
                containerH={text1}
            />

            <TextLayer
                id="text2"
                title="Yani"
                subtitle="Sueño"
                text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. "
                containerH={text2}
            /> */}

            <VisitCalina
                id="videoCalina"
                zIndex={11}
                progressRef={vCalinaProgress}
                frames={videoCalinaFrames}
                duration={VIDEO_DURATION}
                video={'salon'}
                containerH={videoCalina}
            />

            <Price
                id="priceData"
                idText="confirmData"
                data={data}
            />

            {/* <TextLayer
                id="text3"
                title="Ubicación"
                subtitle="Lugar"
                text="..."
                containerH={text3}
            /> */}


        </div>
    );
};
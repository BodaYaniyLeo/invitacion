'use client'
import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export const Section1 = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        const video = videoRef.current;
        if (!video) return;

        console.log(video)

        let ctx = gsap.context(() => {
            const setupTimeline = () => {

                const duration = video.duration || 5;

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top top',
                        end: '+=100%',
                        scrub: 1,
                        pin: true,
                        invalidateOnRefresh: true,
                    }
                });

                tl.fromTo(video,
                    { autoAlpha: 0, currentTime: 0.65 },
                    { autoAlpha: 1, duration: 0.1 }
                )
                    .to(video, {
                        currentTime: duration,
                        ease: "none",
                    }, '<')
                    .to(sectionRef.current, { autoAlpha: 0, duration: 0.1 }, '-=0.35');
            };

            if (video.readyState >= 2) {
                setupTimeline();
            } else {
                video.addEventListener('loadeddata', setupTimeline);
            }
        });

        return () => {
            ctx.revert();
            video.removeEventListener('loadeddata', () => { });
        };
    }, []);

    return (
        <div className="w-full overflow-hidden relative h-[200vh]">
            <div ref={sectionRef}>
                <video
                    ref={videoRef}
                    src="/videos/firstVideo.mp4"
                    muted
                    playsInline
                    preload="auto"
                    className="h-screen w-full object-cover opacity-0"
                    style={{ willChange: "transform" }}
                />
            </div>
            <div className='absolute top-5 nameNovios px-[10vw] h-screen section-text'>
                <h2 className='mb-[25px]'>Leo</h2>
                <h4 className='text-[30px] mb-[12px]'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</h4>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
            </div>
        </div>
    )
}
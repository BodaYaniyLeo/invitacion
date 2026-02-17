'use client'
import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export const Section2 = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        const video = videoRef.current;
        if (!video) return;

        let ctx = gsap.context(() => {
            const setupTimeline = () => {
                const duration = video.duration || 2;
                console.log(duration)

                gsap.timeline({
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top top',
                        end: '+=100%',
                        scrub: 1,
                        pin: true,
                        invalidateOnRefresh: true,
                    }
                })
                    .fromTo(video, { currentTime: 0.65 }, { autoAlpha: 1, duration: 0.1 })
                    .to(video, {
                        currentTime: duration,
                        ease: "none",
                    }, '<')
                    .to(videoRef.current, { autoAlpha: 0, duration: 0.3}, '-=0.2');
            };

            if (video.readyState >= 1) {
                setupTimeline();
            } else {
                video.onloadedmetadata = setupTimeline;
            }
        });

        return () => ctx.revert();
    }, []);

    return (
        <div className="w-full overflow-hidden relative h-[200vh]">
            <div ref={sectionRef}>
                <video
                    ref={videoRef}
                    src="/videos/secondVideo.mp4"
                    muted
                    playsInline
                    preload="auto"
                    className="h-screen w-full object-cover opacity-0"
                    style={{ willChange: "transform" }}
                />
            </div>
            <div className='absolute top-5 nameNovios px-[10vw] h-screen section-text'>
                <h2 className='mb-[25px]'>Yani</h2>
                <h4 className='text-[30px] mb-[12px]'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</h4>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
            </div>
        </div>
    )
}
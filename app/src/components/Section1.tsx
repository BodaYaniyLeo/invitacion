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

        let ctx = gsap.context(() => {
            const setupTimeline = () => {
                const duration = video.duration || 2;
                console.log(duration)

                gsap.timeline({
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'bottom bottom',
                        end: '100%',
                        scrub: 1,
                        pin: true,
                        pinSpacing: false,
                        invalidateOnRefresh: true,
                    }
                })
                    .fromTo(video, { autoAlpha: 0, currentTime: 0.65 }, { autoAlpha: 1, duration: 0.15 })
                    .to(video, {
                        currentTime: duration,
                        ease: "none",
                    }, '<')
                    .to(video, { autoAlpha: 0, duration: 0.1 }, '-=0.05');
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
        <section ref={sectionRef} className="relative w-full h-screen bg-black overflow-hidden">
            <video
                ref={videoRef}
                src="/videos/firstVideo.mp4"
                muted
                playsInline
                preload="auto"
                className="object-cover h-screen"
                style={{ willChange: "transform" }}
            />
        </section>
    )
}
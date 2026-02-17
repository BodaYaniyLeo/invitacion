'use client'
import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export const Section3 = () => {
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
                        end: '+=400%',
                        scrub: 1,
                        pin: true,
                        invalidateOnRefresh: true,
                    }
                })
                    .fromTo(video, { autoAlpha: 0, currentTime: 0.65 }, { autoAlpha: 1, duration: 0.15 })
                    .to(video, {
                        currentTime: duration,
                        ease: "none",
                    }, '<')
                    .to(sectionRef.current, { autoAlpha: 0, duration: 0.1 }, '-=0.33');
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
                    src="/videos/thirdVideo.mp4"
                    muted
                    playsInline
                    preload="auto"
                    className="object-cover"
                    style={{ willChange: "transform" }}
                />
            </div>
        </div>
    )
}
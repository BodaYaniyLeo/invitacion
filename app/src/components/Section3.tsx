'use client'
import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '@/app/src/styles/invitation.css'

export const Section3 = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        const video = videoRef.current;
        if (!video) return;

        let ctx = gsap.context(() => {
            const setupTimeline = () => {
                const duration = video.duration || 5;

                gsap.timeline({
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top top',
                        end: '+=200%',
                        scrub: 1,
                        pin: true,
                        invalidateOnRefresh: true,
                    }
                })
                    .fromTo(video, { autoAlpha: 0 }, { autoAlpha: 1 })
                    .to(video, {
                        currentTime: duration,
                        ease: "none",
                    }, '<')
                    .to(sectionRef.current, { autoAlpha: 0 });
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
        <div ref={sectionRef} className="bg-neutral-950 w-full h-screen overflow-hidden">
            <video
                ref={videoRef}
                src="/videos/thirdVideo.mp4"
                muted
                playsInline
                preload="auto"
                className="w-full h-full object-cover"
                style={{ willChange: "transform" }}
            />
        </div>
    )

}

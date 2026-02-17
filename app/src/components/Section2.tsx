// 'use client'
// import { useLayoutEffect, useRef } from 'react'
// import { gsap } from 'gsap'
// import { ScrollTrigger } from 'gsap/ScrollTrigger'

// export const Section2 = () => {
//     const containerRef = useRef<HTMLDivElement>(null);
//     const videoRef = useRef<HTMLVideoElement>(null);
//     const contentRef = useRef<HTMLDivElement>(null);

//     useLayoutEffect(() => {
//         gsap.registerPlugin(ScrollTrigger);
//         const video = videoRef.current;
//         if (!video) return;

//         window.scrollTo(0, 0);

//         let ctx = gsap.context(() => {
//             const initAnimation = () => {
//                 const tl = gsap.timeline({
//                     scrollTrigger: {
//                         trigger: containerRef.current,
//                         start: "top top",
//                         end: "+=100%",
//                         scrub: 1,
//                         pin: true,
//                         pinSpacing: false,
//                         invalidateOnRefresh: true,
//                     }
//                 });

//                 tl
//                     .to(video, { autoAlpha: 1, duration: 0.1, currentTime: 0.65 })
//                     .to(video, {
//                         currentTime: video.duration,
//                         ease: "none"
//                     })
//                     .fromTo(contentRef.current,
//                         { y: '100%' },
//                         { y: '-100%' },
//                         0.35
//                     )
//                     .to(video, { autoAlpha: 0, duration: 0.05 }, '-=0.4')
//             };

//             if (video.readyState >= 3) {
//                 initAnimation();
//             } else {
//                 video.oncanplay = initAnimation;
//             }
//         });

//         return () => ctx.revert();
//     }, []); 

//     return (
//         <section ref={containerRef} className="relative w-full h-screen bg-black overflow-hidden">
//             <video
//                 ref={videoRef}
//                 src="/videos/secondVideo.mp4"
//                 muted
//                 playsInline
//                 preload="auto"
//                 className="absolute inset-0 w-full h-full object-cover opacity-0"
//             />

//             <div
//                 ref={contentRef}
//                 className="relative z-10 flex flex-col items-start h-screen px-[10vw] nameNovios section-text"
//             >
//                 <h2 className='mb-[25px]'>Yani</h2>
//                 <h4 className='text-[30px] mb-[12px]'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</h4>
//                 <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>

//             </div>
//         </section>
//     )
// }


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
                        end: '+=170%',
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
                    .to(sectionRef.current, { autoAlpha: 0, duration: 0.1 }, '-=0.35');
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
        <div className="w-full overflow-hidden relative h-[170vh]">
            <div ref={sectionRef}>
                <video
                    ref={videoRef}
                    src="/videos/secondVideo.mp4"
                    muted
                    playsInline
                    preload="auto"
                    className="object-cover h-screen w-full"
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
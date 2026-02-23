import { useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface HookProps {
    mainRef: React.RefObject<HTMLDivElement | null>
    presentation: React.RefObject<HTMLDivElement | null>
    leoSection: React.RefObject<HTMLDivElement | null>
    yaniSection: React.RefObject<HTMLDivElement | null>
    v1Progress: React.MutableRefObject<{ t: number }>
    v2Progress: React.MutableRefObject<{ t: number }>
    vCalinaProgress: React.MutableRefObject<{ t: number }>
    VIDEO_DURATION: number
}

export const useInvitationAnimations = ({
    mainRef,
    presentation,
    leoSection,
    yaniSection,
    v1Progress,
    v2Progress,
    vCalinaProgress,
    VIDEO_DURATION
}: HookProps) => {


    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        ScrollTrigger.config({
            ignoreMobileResize: true
        });


        let ctx = gsap.context(() => {

            const presentationTl = gsap.timeline({
                scrollTrigger: {
                    trigger: presentation.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 0.3,
                    pin: true,
                    pinSpacing: false,
                }
            });

            presentationTl.set(['#video1', '#video2'], {
                autoAlpha: 0,
            });

            presentationTl
                .to('#heroComplete', { scale: 1.1, duration: 2, ease: "none" })
                .to('#imgTextHero', { opacity: 0, duration: 0.8 }, 1)

                .to('#heroComplete', { opacity: 0, duration: 0.5 })
                .to('#heroMask', {
                    maskSize: "50%",
                    webkitMaskSize: "50%",
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
                    scrub: 0.3,
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
                    scrub: 0.3,
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
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 0.3,
                }
            });

            catalinaTl
                .to(vCalinaProgress.current, { t: VIDEO_DURATION, duration: 2 }, 0)

            const logoFooterTl = gsap.timeline({
                scrollTrigger: {
                    trigger: "#footerPrice",
                    start: "top top",
                    end: "bottom top",
                    scrub: 0.3,
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
    }, [VIDEO_DURATION]);
}

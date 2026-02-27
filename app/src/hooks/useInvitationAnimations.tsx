import { useLayoutEffect, useRef } from 'react'
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

    const lastWidth = useRef(typeof window !== 'undefined' ? window.innerWidth : 0);
    const infoSalonAnimation = useRef<gsap.core.Timeline | null>(null);

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        ScrollTrigger.config({
            ignoreMobileResize: true
        });

        const handleResize = () => {
            const currentWidth = window.innerWidth;
            if (currentWidth !== lastWidth.current) {
                lastWidth.current = currentWidth;
                ScrollTrigger.refresh();
            }
        };

        window.addEventListener("resize", handleResize);

        let ctx = gsap.context(() => {

            const presentationTl = gsap.timeline({
                scrollTrigger: {
                    trigger: presentation.current,
                    start: 'top top',
                    end: '+=300%',
                    scrub: 0.3,
                    pin: true,
                    pinSpacing: false,
                    anticipatePin: 1,
                }
            });

            presentationTl
                .addLabel("heroAnimation")
                .to('#heroComplete', { scale: 1.1, ease: "none", duration: 0.7 }, "heroAnimation")
                .to('#imgTextHero', { opacity: 0, duration: 0.4 }, "heroAnimation")
                .to('#heroComplete', { opacity: 0, duration: 0.4 }, "heroAnimation+=0.3")
                .to('#heroMask', {
                    maskSize: "60vw",
                    webkitMaskSize: "60vw",
                    duration: 0.7
                }, "heroAnimation")

                .addLabel("coordinationItems")
                .to('#heroMask', {
                    scale: 0.8,
                    duration: 2,
                }, "coordinationItems")
                .to('#dateLogo', {
                    webkitMaskImage: 'radial-gradient(circle at bottom center, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)',
                    maskImage: 'radial-gradient(circle at bottom center, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)',
                    autoAlpha: 1,
                    scale: 0.8,
                    duration: 2,
                }, "coordinationItems")
                .to('#dateLogo h3', {
                    backgroundImage: 'radial-gradient(circle at 50% -30vh, rgb(255, 214, 135) 0px, rgb(252, 82, 67) 50vh, rgb(157, 47, 106) 90vh, rgba(32, 31, 66, 0) 150vh)',
                    duration: 2,
                    ease: "power1.inOut",
                }, "coordinationItems-=1")

                .to('#heroMask', { display: 'none' }, "-=1.0")
                .to('#dateLogo', {
                    webkitMaskImage: 'radial-gradient(circle at top center, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 0%)',
                    maskImage: 'radial-gradient(circle at top center, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 0%)',
                    duration: 0.4,
                }, "-=0.4")


            const leoTl = gsap.timeline({
                scrollTrigger: {
                    trigger: "#leoContainer",
                    start: 'top top',
                    end: '+=150%',
                    scrub: 0.3,
                    pin: leoSection.current,
                    pinSpacing: false,
                    anticipatePin: 1,
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
                .addLabel("transicionVideo")
                .to('#textOrg', { scale: 0.8, duration: 3.5 }, 'transicionVideo')
                .to('#textOrg', {
                    maskImage: "radial-gradient(at 50% 0vh, rgb(0,0,0) 120vh, rgba(0,0,0,0) 200vh)",
                    webkitMaskImage: "radial-gradient(at 50% 0vh, rgb(0,0,0) 120vh, rgba(0,0,0,0) 200vh)",
                    duration: 2.5
                }, 'transicionVideo')
                .to('#textOrgInner', {
                    backgroundImage: 'radial-gradient(circle at 40.0899% 1.7982vh, rgb(255,179,135) 0%, rgb(252,82,68) 69.5%, rgb(156,47,106) 99.4%, rgba(32,31,66,0) 149.1%)',
                    duration: 2.5
                }, 'transicionVideo')
                .to('#textOrg', {
                    autoAlpha: 0,
                    duration: 0.6
                }, "transicionVideo+=3")
                .to('#containerTextOrg', {
                    webkitBackdropFilter: "blur(0px)",
                    backdropFilter: "blur(0px)",
                    duration: 3,
                    ease: "power1.inOut",
                }, "transicionVideo+=1.5")

                .to('#video1', { autoAlpha: 1, duration: 0.5 }, 'transicionVideo+=2.5')
                .addLabel("text1Appear")
                .to(v1Progress.current, {
                    t: VIDEO_DURATION, duration: 8, ease: "none",
                }, 'transicionVideo')
                .to("#video1 canvas", {
                    WebkitMaskImage: "radial-gradient(circle at 95vw 0vh, rgb(0, 0, 0) 30vw, rgba(0, 0, 0, 0.15) 60vw)",
                    maskImage: "radial-gradient(circle at 95vw 0vh, rgb(0, 0, 0) 30vw, rgba(0, 0, 0, 0.15) 60vw)",
                    duration: 4
                }, "text1Appear")
                .to('#video1', { autoAlpha: 0, duration: 1 }, "text1Appear+=2.8")

            const yaniTl = gsap.timeline({
                scrollTrigger: {
                    trigger: "#yaniContainer",
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 0.3,
                    pin: yaniSection.current,
                    pinSpacing: false,
                    anticipatePin: 1,
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
                .to("#bgCalina", { autoAlpha: 1, duration: 3 }, "-=1")
                .to("#bgCalina", { autoAlpha: 0, duration: 3 }, "-=1")


            const logoFooterTl = gsap.timeline({
                scrollTrigger: {
                    trigger: "#footerPrice",
                    start: "top top",
                    end: "bottom top",
                    scrub: 0.3,
                    pin: true,
                    anticipatePin: 1,
                }
            });

            logoFooterTl
                .to("#finalAnimation", { display: "flex" }, 0.2)
                .to('#textFinal', {
                    backgroundImage: 'radial-gradient(circle at 50% 47.9747vh, rgb(255, 212, 128) 0vh, rgb(236, 69, 111) 50vh, rgb(122, 33, 102) 90vh, rgba(32, 31, 66, 0) 122.785vh)',
                    duration: 4
                }, '<')
                .to("#finalAnimation", { scale: 0.8, duration: 4 }, "<")
                .to("#confirmData", { autoAlpha: 1 })

        }, mainRef);

        const animationSalon = gsap.timeline({ paused: true });

        animationSalon.set("#infoSalon", { x: "90%", autoAlpha: 0 })

        animationSalon
            .to("#lateralMaps", { zIndex: 9 })
            .to("#lateralMaps", { autoAlpha: 1, duration: 0.3 })
            .to("#infoSalon, #photoSalon", { autoAlpha: 1, duration: 0.3 }, "<")
            .to("#infoSalon", { x: 0, duration: 0.3 }, "<")
            .to("#photoSalon", { x: "-90%", duration: 0.3 }, "<")
            .to("#mapsSalon, #photoSalon", { rotateZ: -4, duration: 0.3 }, "<")
            .to("#header", { opacity: 1, duration: 0.3 })

        infoSalonAnimation.current = animationSalon;

        return () => {
            window.removeEventListener("resize", handleResize);
            ctx.revert();
            animationSalon.revert();
        };

    }, [VIDEO_DURATION]);

    return {
        infoSalonAnimation
    };

}

import { useEffect } from "react"
import { gsap } from "gsap"

export const useAccordionAnimation = (modelArray: any[], activeSection: string | null | undefined) => {
    useEffect(() => {
        modelArray.forEach(e => {
            const id = Object.keys(e)[0]
            if (activeSection === id) {
                gsap.to(`#${id}`, { height: "auto", duration: 0.4, ease: "power2.out", opacity: 1 })
            } else {
                gsap.to(`#${id}`, { height: 0, duration: 0.4, ease: "power2.out", opacity: 1 })
            }
        })
    }, [activeSection, modelArray])
}
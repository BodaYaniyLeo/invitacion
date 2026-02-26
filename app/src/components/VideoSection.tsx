'use client'
import { useEffect, useRef, useState } from 'react'

interface VideoProps {
    id: string;
    progressRef: React.MutableRefObject<{ t: number }>;
    frames: string[];
    duration: number;
    video: string;
}

export const VideoSection = ({
    id,
    progressRef,
    frames,
    duration,
    video
}: VideoProps) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [isReady, setIsReady] = useState(false);
    const lastWidth = useRef(typeof window !== 'undefined' ? window.innerWidth : 0);

    useEffect(() => {

        const canvas = canvasRef.current;
        if (!canvas || frames.length === 0) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const setCanvasDimensions = () => {
            if (video === 'full') {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            } else {
                const containerWidth = canvas.parentElement?.offsetWidth || window.innerWidth;
                canvas.width = containerWidth;
                canvas.height = containerWidth * 0.75;
            }
        };

        setCanvasDimensions();

        const images: HTMLImageElement[] = frames.map((src) => {
            const img = new Image();
            img.src = src;
            return img;
        });

        images[0].onload = () => setIsReady(true);

        let rafId: number;
        let lastIndex = -1;

        const drawCover = (img: HTMLImageElement) => {
            const imgRatio = img.naturalWidth / img.naturalHeight;
            const canvasRatio = canvas.width / canvas.height;
            let dw, dh, ox, oy;

            if (imgRatio > canvasRatio) {
                dh = canvas.height; dw = dh * imgRatio;
                ox = (canvas.width - dw) / 2; oy = 0;
            } else {
                dw = canvas.width; dh = dw / imgRatio;
                ox = 0; oy = (canvas.height - dh) / 2;
            }
            ctx.drawImage(img, ox, oy, dw, dh);
        };

        const renderLoop = () => {
            const progress = Math.min(Math.max(progressRef.current.t / duration, 0), 1);
            const frameIndex = Math.floor(progress * (images.length - 1));

            if (frameIndex !== lastIndex) {
                const img = images[frameIndex];
                if (img && img.complete) {
                    drawCover(img);
                    lastIndex = frameIndex;
                }
            }
            rafId = requestAnimationFrame(renderLoop);
        };

        rafId = requestAnimationFrame(renderLoop);


        const handleResize = () => {
            const currentWidth = window.innerWidth;
            const currentHeight = window.innerHeight;

            if (currentWidth !== lastWidth.current || video === 'full') {

                if (video === 'full') {
                    canvas.width = currentWidth;
                    canvas.height = currentHeight;
                } else {
                    const containerWidth = canvas.parentElement?.offsetWidth || currentWidth;
                    canvas.width = containerWidth;
                    canvas.height = containerWidth * 0.75;
                }

                lastWidth.current = currentWidth;
                lastIndex = -1;
            }
        };

        window.addEventListener('resize', handleResize);
        return () => {
            cancelAnimationFrame(rafId);
            window.removeEventListener('resize', handleResize);
        };
    }, [frames, duration, progressRef]);

    return (
        <div
            id={id}
            className={`inset-0 transition-opacity overflow-hidden ${video === 'full'
                ? 'pointer-events-none'
                : 'pointer-events-auto'
                }`}
            style={{
                opacity: video === 'full' ? 0 : 1,
                visibility: video === 'full' ? 'hidden' : 'visible'
            }}
        >
            <canvas
                ref={canvasRef}
                className={`${video === 'full'
                    ? 'h-lvh pointer-events-none'
                    : 'pointer-events-auto'
                    }`}
                style={{
                    display: isReady ? 'block' : 'none',
                    WebkitMaskImage: "radial-gradient(circle at 105vw 50vh, rgb(0, 0, 0) 100vw, rgb(0, 0, 0) 150vw)",
                    maskImage: "radial-gradient(circle at 105vw 50vh, rgb(0, 0, 0) 100vw, rgb(0, 0, 0) 150vw)",
                    WebkitMaskRepeat: "no-repeat",
                    maskRepeat: "no-repeat",
                    ...(video !== 'full' && { aspectRatio: "4/3" })
                }}
            />
        </div>
    );
};
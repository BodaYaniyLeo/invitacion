'use client'
import { useEffect, useRef } from 'react'

interface VideoProps {
    id: string;
    src: string;
    zIndex: number;
    progressRef: React.MutableRefObject<{ t: number }>;
}

export const ZVideoSection = ({ id, src, zIndex, progressRef }: VideoProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        if (!video || !canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let rafId: number;
        let lastTime = -1;
        let lastProgress = 0;
        let scrollVelocity = 0;
        let isSeeking = false;

        const drawLoop = () => {
            rafId = requestAnimationFrame(drawLoop);

            const targetTime = progressRef.current.t;

            // Mide la velocidad del scroll (cuánto cambió el progreso)
            scrollVelocity = Math.abs(targetTime - lastProgress);
            lastProgress = targetTime;

            // Si el scroll es muy rápido, dibujá el frame actual sin seekear
            // Si es lento o moderado, seekeá normalmente
            if (!isSeeking) {
                if (scrollVelocity > 0.05) {
                    // Scroll rápido — seek agresivo, acepta saltos de frames
                    video.currentTime = targetTime;
                } else if (Math.abs(video.currentTime - targetTime) > 0.016) {
                    // Scroll lento — seek preciso frame por frame
                    isSeeking = true;
                    video.currentTime = targetTime;
                    video.addEventListener('seeked', () => {
                        isSeeking = false;
                    }, { once: true });
                }
            }

            // Dibujá siempre el frame disponible, sin esperar el seek
            if (video.readyState >= 2 && video.currentTime !== lastTime) {
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                lastTime = video.currentTime;
            }
        };

        const onReady = () => {
            video.currentTime = video.duration;
            video.addEventListener('seeked', () => {
                video.currentTime = 0;
                rafId = requestAnimationFrame(drawLoop);
            }, { once: true });
        };

        if (video.readyState >= 4) {
            onReady();
        } else {
            video.addEventListener('canplaythrough', onReady, { once: true });
        }

        const onResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', onResize);

        return () => {
            cancelAnimationFrame(rafId);
            window.removeEventListener('resize', onResize);
        };
    }, [progressRef]);

    return (
        <div
            id={id}
            className="fixed top-0 left-0 w-full h-screen"
            style={{ zIndex, visibility: 'hidden' }}
        >
            <video
                ref={videoRef}
                src={src}
                muted
                playsInline
                preload="auto"
                style={{ display: 'none' }}
            />
            <canvas
                ref={canvasRef}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
        </div>
    );
};
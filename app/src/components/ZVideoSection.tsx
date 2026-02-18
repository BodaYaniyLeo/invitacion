'use client'
import { useEffect, useRef, useState } from 'react'

interface VideoProps {
    id: string;
    zIndex: number;
    progressRef: React.MutableRefObject<{ t: number }>;
    frames: string[];
    duration: number;
}

export const ZVideoSection = ({ id, zIndex, progressRef, frames, duration }: VideoProps) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [isReady, setIsReady] = useState(false);

    console.log(progressRef.current)

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || frames.length === 0) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Ajustar tamaño
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Carga de imágenes
        const images: HTMLImageElement[] = frames.map((src) => {
            const img = new Image();
            img.src = src;
            return img;
        });

        // Asegurar que la primera imagen esté lista
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
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            lastIndex = -1;
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
            className="fixed top-0 left-0 w-full h-screen pointer-events-none"
            style={{ 
                zIndex, 
                opacity: 0,
                visibility: 'hidden'
            }}
        >
            <canvas
                ref={canvasRef}
                style={{ 
                    width: '100%', 
                    height: '100%',
                    display: isReady ? 'block' : 'none' 
                }}
            />
        </div>
    );
};
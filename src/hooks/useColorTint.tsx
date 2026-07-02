import { useEffect, useState } from "react";

export function useColorTint(imageSrc: string | null | undefined, color: string) {
    const [tintedImage, setTintedImage] = useState<string>("");

    useEffect(() => {
        if (!imageSrc) {
            setTintedImage("");
            return;
        }

        const img = window.Image ? new window.Image() : document.createElement('img');
        img.crossOrigin = "anonymous";
        img.src = imageSrc;

        img.onload = () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            canvas.width = img.naturalWidth || 80;
            canvas.height = img.naturalHeight || 80;

            ctx.drawImage(img, 0, 0);

            ctx.globalCompositeOperation = "multiply";

            ctx.fillStyle = color;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.globalCompositeOperation = "destination-in";
            ctx.drawImage(img, 0, 0);

            setTintedImage(canvas.toDataURL());
        };
    }, [imageSrc, color]);

    return tintedImage;
}
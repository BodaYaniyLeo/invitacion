'use client'

interface TextLayerProps {
    id: string;
    title: string;
    subtitle: string;
    text: string;
}

export const TextLayer = ({ id, title, subtitle, text }: TextLayerProps) => {
    return (
        <div 
            id={id} 
            className="fixed inset-0 z-[15] flex flex-col  px-[10vw] pointer-events-none section-text"
        >
            <div className="max-w-2xl text-white nameNovios">
                <h2>
                    {title}
                </h2>
                <h4 className="text-xl font-light leading-relaxed opacity-80 shadow-black drop-shadow-lg">
                    {subtitle}
                </h4>
                <p className="text-xl font-light leading-relaxed opacity-80 shadow-black drop-shadow-lg">
                    {text}
                </p>
            </div>
        </div>
    );
};
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
            className="w-vw h-lvh content-end nameNovios -scroll-mt-[50px]"
        >
            <div className="drop-shadow-2xl px-8">
                <h2 className="font-black italic uppercase leading-none text-(length:--h1size)">{title}</h2>
                <h4 className="text-blue-400 tracking-[0.4em] uppercase text-(length:--h2size)">{subtitle}</h4>
                <p className="text-gray-200 font-light leading-relaxed text-(length:--h4size)">{text}</p>
            </div>
        </div>
    );
};
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
            className="w-dvw h-dvh content-end nameNovios"
        >
            <div className="text-white drop-shadow-2xl px-8">
                <h2 className="text-6xl md:text-8xl font-black italic uppercase mb-6 leading-none">{title}</h2>
                <h4 className="text-blue-400 tracking-[0.4em] uppercase mb-4 text-sm md:text-lg">{subtitle}</h4>
                <p className="text-lg md:text-2xl text-gray-200 font-light max-w-lg mx-auto leading-relaxed">{text}</p>
            </div>
        </div>
    );
};
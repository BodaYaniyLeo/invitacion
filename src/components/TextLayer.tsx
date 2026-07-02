import { ArrayElements, ObjText } from "@/app/page";
import { useEffect, useState } from "react";

interface Props {
    id: string,
    data: ArrayElements

}

export const TextLayer = ({ id, data }: Props) => {

    const [subText, setSubText] = useState<ObjText>({ sub: "", text: "" })

    useEffect(() => {
        if (!data) return

        if (id === "Yani" && data.yani) {
            setSubText(data.yani)
        } else if (id === "Leo" && data.leo) {
            setSubText(data.leo)
        }

    }, [data])

    return (
        <div
            id={id}
            className="w-full h-dvh content-end nameNovios -scroll-mt-[50px]"
        >
            <div className="drop-shadow-2xl px-8">
                <h4 className="text-blue-400 tracking-[0.4em] text-(length:--h3size)">
                    {subText.sub ? subText.sub : id === "Yani" ? "La novia" : "El novio"}
                </h4>
                <h2 className="font-black italic uppercase leading-none text-[length:clamp(30px,15vw,80px)]">{id}</h2>
                <p className="text-gray-200 font-light leading-relaxed text-(length:--h4size)">
                    {subText.text ? subText.text : id === "Yani"
                        ? "La de la sonrisa pintada y el brillo en sus ojos. Una artista entre números y cuentas. Siempre con las valijas listas para planear un nuevo destino… aunque, si hay una buena comida de por medio, todo está resuelto. Disfruta de los pequeños grandes momentos, de las charlas compartidas y de crear recuerdos junto a las personas que más quiere. ¡Familiera por donde la mires! Viajera, detallista y amante de las cosas simples de la vida. Si hay familia cerca, una buena charla y algo rico para comer… no la moves mas de ahí."
                        : "Un tipo común que ha tenido la suerte de despertar cada dia con sus 5 sentidos intactos y con una profesión que le genera la misma adrenalina de siempre. Seguidor de la musica, el fútbol, autos, motos, tecnología, economía y política. Un combo muy distinto al de la novia, pero suficiente para enamorarla."}</p>
            </div>
        </div>
    );
};
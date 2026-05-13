import { ArrayElements, ObjText } from "@/app/page";
import { useEffect, useState } from "react";

interface Props {
    id: string,
    data: ArrayElements[]

}

export const TextLayer = ({ id, data }: Props) => {

    const [subText, setSubText] = useState<ObjText>({ sub: "", text: "" })

    useEffect(() => {
        if (!data) return

        if (id === "Yani") {
            setSubText(data[0].yani)
        } else if (id === "Leo") {
            setSubText(data[0].leo)
        }

    }, [data])

    console.log(subText)


    return (
        <div
            id={id}
            className="w-full h-lvh content-end nameNovios -scroll-mt-[50px]"
        >
            <div className="drop-shadow-2xl px-8">
                <h4 className="text-blue-400 tracking-[0.4em] text-(length:--h3size) capitalize">{subText.sub}</h4>
                <h2 className="font-black italic uppercase leading-none text-[length:clamp(10lvh,7vw,80px)]">{id}</h2>
                <p className="text-gray-200 font-light leading-relaxed text-(length:--h4size) capitalize">{subText.text}</p>
            </div>
        </div>
    );
};
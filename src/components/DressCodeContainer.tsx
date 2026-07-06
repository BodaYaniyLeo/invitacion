"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import minus from "@/public/dress/minus.png"
import { optionDress } from "../helpers/optionDress"
import { ArrayCategory, DressProps } from "../types/types"
import { useAccordionAnimation } from "../hooks/useAccordionAnimation"
import { useColorTint } from "../hooks/useColorTint"
import { EyeIcon } from "./EyeIcon"
import { IconAcc } from "./IconAcc"

interface TonoItem {
    col: number;
    sat: string;
    bri: string;
}

const CONFIG_CAPAS: Record<string, { className: string; zIndex: number }> = {
    superior: { className: "top-0 left-1/2 -translate-x-1/2", zIndex: 42 },
    inferior: { className: "bottom-0 left-1/2 -translate-x-1/2", zIndex: 43 },
    vestido: { className: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2", zIndex: 42 },
    camisa: { className: "top-0 left-1/2 -translate-x-1/2", zIndex: 41 },
    saco: { className: "top-0 left-1/2 -translate-x-1/2", zIndex: 44 },
    pantalon: { className: "bottom-0 left-1/2 -translate-x-1/2", zIndex: 42 },
    accesorios: { className: "top-0 left-1/2 -translate-x-1/2", zIndex: 43 }
}

const CapaPrendaTintada = ({ src, capa, tono }: { src: string; capa: string; tono?: TonoItem }) => {
    const colorString = tono ? `hsl(${tono.col}, ${tono.sat}, ${tono.bri})` : '';
    const imagenTintada = useColorTint(tono ? src : null, colorString);
    const sourceFinal = tono ? imagenTintada : src;

    if (!sourceFinal) return null;

    const config = CONFIG_CAPAS[capa] || { className: "top-0 left-1/2 -translate-x-1/2", zIndex: 40 };

    return (
        <img
            key={sourceFinal}
            src={sourceFinal}
            alt={capa}
            className={`w-full h-auto absolute ${config.className} object-contain pointer-events-none animate-[fadeIn_0.4s_ease-out-in] transition-all duration-300`}
            style={{ zIndex: config.zIndex }}
        />
    );
};

export const DressCodeContainer = ({
    widthOpposite,
    select,
    setSelect,
    vestimenta,
    setVestimenta,
    tono,
    setTono,
    gender,
    initialCategories,
    maniquiImg
}: DressProps) => {
    const [modelArray, setModelArray] = useState<ArrayCategory[]>([])
    const [activeSection, setActiveSection] = useState<string | null>(null)
    const [acc, setAcc] = useState<string | null>(null)

    const [modoVisual, setModoVisual] = useState<"vestido" | "dos-piezas" | "traje-completo" | "casual">(() => {
        if (gender === "she") {
            return initialCategories.includes('vestido') ? "vestido" : "dos-piezas"
        }
        return initialCategories.includes('saco') ? "traje-completo" : "casual"
    })

    useEffect(() => {
        const fetchImages = async () => {
            const data = await optionDress(initialCategories, gender)
            setModelArray(data)
        }
        fetchImages()
    }, [initialCategories, gender])

    useEffect(() => {
        if (modelArray.length > 0 && Object.keys(vestimenta).length === 0) {
            const defaultState: Record<string, string | null> = {}

            initialCategories.forEach(cat => {
                const foundObj = modelArray.find(item => item[cat])
                const options = foundObj?.[cat]
                if (options && options.length > 0) {
                    defaultState[cat] = options[0].url
                } else {
                    defaultState[cat] = null
                }
            })

            setVestimenta(defaultState)
        }
    }, [modelArray, initialCategories])

    useAccordionAnimation(modelArray, activeSection)

    const handleClothesChange = (category: string, url: string | null) => {
        setVestimenta(prev => ({ ...prev, [category]: url }))

        if (gender === "she") {
            if (category === "vestido") {
                setModoVisual("vestido")
            } else if (category === "superior" || category === "inferior") {
                setModoVisual("dos-piezas")
            }
        }

        if (gender === "he") {
            if (category === "saco") {
                setModoVisual("traje-completo")
            } else if (category === "camisa" || category === "pantalon") {
                setModoVisual("casual")
            }
        }
    }

    const genderId = gender === "she" ? "She" : "He"

    return (
        <div id={`dresscode${genderId}`} className='content-center w-1/2 align-self-center h-fit'>
            <style jsx global>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translate(-50%, -2%) scale(0.98); }
                    to { opacity: 1; transform: translate(-50%, 0) scale(1); }
                }
                #maniquiShe .animate-\\[fadeIn_0\\.4s_ease-out-in\\],
                #maniquiHe .animate-\\[fadeIn_0\\.4s_ease-out-in\\] {
                    transform-origin: center center;
                }
            `}</style>

            <div id={`selector${genderId}`} className="absolute w-1/2 right-[32px] top-1/8 border z-60 bg-[#00000090] opacity-0 invisible">
                <div className="text-center dressSelector px-1 py-2">
                    <h3 className="font-bold text-white">Sugerencias</h3>
                </div>
                <div className="py-1 bg-[#111117]">
                    {modelArray.map((category, i) => {
                        const categoryName = Object.keys(category)[0]
                        const options = category[categoryName]

                        return (
                            <div key={i} className="overflow-hidden">
                                <button
                                    onClick={() => setActiveSection(prev => prev === categoryName ? null : categoryName)}
                                    className="flex justify-between w-full px-1 text-white"
                                >
                                    <h3 className="font-bold capitalize">{categoryName}</h3>
                                    <div className="relative self-center">
                                        <span className="block w-[4vw] max-w-6">
                                            <Image src={minus} alt="" />
                                        </span>
                                        <span className={`absolute top-0 left-0 w-[4vw] max-w-6 lg:w-auto minus ${activeSection === categoryName && "active"}`}>
                                            <Image src={minus} alt="" />
                                        </span>
                                    </div>
                                </button>
                                <div id={categoryName} className="overflow-hidden h-0">
                                    <div className="overflow-x-scroll flex w-full gap-2">
                                        {options?.map((option) => {
                                            if (gender === "she") {
                                                return (
                                                    <button
                                                        key={option.name}
                                                        className="shrink-0 text-white text-sm m-1 p-1"
                                                        onClick={() => handleClothesChange(categoryName, option.url)}
                                                    >
                                                        <img src={option.url} alt={option.name} className="w-12 h-auto object-contain" />
                                                    </button>
                                                )
                                            } else {
                                                if (categoryName === "accesorios") {
                                                    return (
                                                        <button
                                                            key={option.name}
                                                            className="shrink-0 text-white text-sm p-1"
                                                            onClick={() => { handleClothesChange(categoryName, option.url); setAcc(option.url) }}
                                                        >
                                                            <IconAcc
                                                                icon={option.name}
                                                                className="w-full h-auto object-contain"
                                                            />
                                                        </button>
                                                    )
                                                } else {
                                                    return (
                                                        <button
                                                            key={option.name}
                                                            className="shrink-0 text-white text-sm m-1 p-1"
                                                            onClick={() => handleClothesChange(categoryName, option.url)}
                                                        >
                                                            <img src={option.url} alt={option.name} className="w-12 h-auto object-contain" />
                                                        </button>
                                                    )
                                                }
                                            }
                                        })}
                                    </div>

                                    <div className="w-48 px-4 py-2 mx-auto text-center z-70 rounded-lg flex w-full">
                                        <div className="flex flex-col gap-2 w-full">
                                            <input
                                                type="range"
                                                min="0"
                                                max="360"
                                                value={tono[categoryName]?.col ?? 0}
                                                onChange={(e) => setTono(prev => ({
                                                    ...prev,
                                                    [categoryName]: { ...prev[categoryName], col: Number(e.target.value) }
                                                }))}
                                                className="w-full h-4 rounded-lg appearance-none cursor-pointer"
                                                style={{
                                                    background: 'linear-gradient(to right, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)'
                                                }}
                                            />
                                            <input
                                                type="range"
                                                min="0"
                                                max="100"
                                                value={parseInt(tono[categoryName]?.bri || "85")}
                                                onChange={(e) => setTono(prev => ({
                                                    ...prev,
                                                    [categoryName]: { ...prev[categoryName], bri: `${e.target.value}%` }
                                                }))}
                                                className="w-full h-4 rounded-lg appearance-none cursor-pointer"
                                                style={{
                                                    background: 'linear-gradient(to right, #000000 0%, #ffffff 100%)'
                                                }}
                                            />
                                        </div>
                                        {(categoryName === "saco" || categoryName === "accesorios") &&
                                            <div key={categoryName} className="m-auto">
                                                <button
                                                    className="w-fit text-sm ms-2 pt-1"
                                                    onClick={() => handleClothesChange(categoryName, (vestimenta[categoryName] ? null : categoryName === "accesorios" ? acc : "/dress/he/saco/saco.png"))}
                                                >
                                                    <EyeIcon
                                                        open={!vestimenta[categoryName]}
                                                        className="w-full h-auto object-contain"
                                                    />
                                                </button>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            <div id="showcase" className={`w-full flex relative ${gender === "she" ? "justify-end" : "justify-start"}`}>

                <div
                    id={`maniqui${genderId}`}
                    className="w-full relative items-center max-w-125 cursor-pointer"
                    onClick={() => {
                        if (!select) return;
                        widthOpposite(genderId, gender === "she" ? "He" : "She");
                        setSelect(false);
                    }}
                >
                    <Image src={maniquiImg} alt="Maniquí Base" className="w-full h-auto z-30 object-contain" loading="eager" />

                    {Object.entries(vestimenta).map(([capa, url]) => {
                        if (!url) return null

                        if (gender === "she") {
                            if (modoVisual === "vestido" && (capa === "superior" || capa === "inferior")) return null;
                            if (modoVisual === "dos-piezas" && capa === "vestido") return null;
                        }

                        if (gender === "he") {
                            if (modoVisual === "casual" && capa === "saco") return null;
                        }

                        return (
                            <CapaPrendaTintada
                                key={capa}
                                src={url}
                                capa={capa}
                                tono={tono[capa]}
                            />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
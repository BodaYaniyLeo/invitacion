"use client"
import { useState, useEffect } from "react"
import { useUpdate } from "../helpers/useUpdate"
import { ButtonAdmin } from "./ButtonAdmin"
import '@/src/styles/invitation.css'

export default function GroupConfig({ group, onGroupSaved }: any) {
    const [isOpen, setIsOpen] = useState(false)
    const [groupData, setGroupData] = useState(group)

    useEffect(() => {
        setGroupData(group);
    }, [group]);

    const updateField = (key: string, value: any) => {
        setGroupData((prev: any) => ({ ...prev, [key]: value }))
    }

    const handleSaveGroup = async ({ setTextButton, setAnimateButton }: any) => {
        const { guests, ...cleanGroupData } = groupData
        await useUpdate([cleanGroupData], setTextButton, setAnimateButton)
        onGroupSaved(groupData);
    }

    return (
        <div className="border border-gray-200 rounded-lg overflow-hidden bg-[hsl(200,5,12,1)] mb-4 shadow-sm">
            <button
                className="w-full flex justify-between items-center p-4 bg-[hsl(200,5,12,1)] hover:bg-[hsl(200,5,20,1)] transition-colors font-semibold"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex items-center gap-2">
                    <span className="text-lg w-4 text-center">{isOpen ? "−" : "+"}</span>
                    Grupo: {group.name}
                </div>
                <a className="text-sm text-blue-600 hover:underline font-normal flex items-center gap-1"
                    target="_blank" href={`https://casamientoyaniyleo.vercel.app/${group.name}`}
                    rel="noreferrer" onClick={(e) => e.stopPropagation()}>
                    Ver invitation
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M5 6a1 1 0 0 1 1-1h4a1 1 0 1 0 0-2H6a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3v-4a1 1 0 1 0-2 0v4a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6zm10-3a1 1 0 1 0 0 2h2.586l-6.293 6.293a1 1 0 0 0 1.414 1.414L19 6.414V9a1 1 0 1 0 2 0V4a1 1 0 0 0-1-1h-5z" />
                    </svg>
                </a>
            </button>

            <div className={`grid duration-500 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                <div className={`px-6 border-t border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-6 min-h-0 duration-500 ${isOpen ? "py-6" : "py-0"}`}>
                    <div className="flex flex-col gap-4">
                        <p className="font-semibold text-gray-100 border-b pb-1">General</p>
                        <div className="flex justify-between">
                            <label className="flex items-center gap-2 font-medium cursor-pointer text-sm">
                                <input type="checkbox" className="w-4 h-4 accent-blue-600"
                                    checked={groupData.church}
                                    onChange={(e) => updateField("church", e.target.checked)} />
                                ¿Asisten a la Iglesia?
                            </label>
                            <label className="flex flex-col text-sm font-medium gap-1 text-gray-400">
                                Descuento Tarjeta (%)
                                <div className="flex items-center gap-2">
                                    <input type="number" step="1" min="0" max="100" className="bg-[hsl(200,5,12,1)] focus:bg-[hsl(200,5,12,1)] border rounded p-2 outline-none w-24 focus:ring-2 focus:ring-blue-500 transition-all text-gray-100 focus:text-gray-100"
                                        value={Math.round((groupData.payment_coverage || 0) * 100)}
                                        onChange={(e) => updateField("payment_coverage", Number(e.target.value) / 100)} />
                                    <span>%</span>
                                </div>
                            </label>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 mb-2">
                        <p className="font-semibold text-gray-100 border-b pb-1">Traslados</p>
                        <label className="flex flex-col text-sm font-medium gap-1 text-gray-400">
                            URL Punto de Encuentro (Bus)
                            <input type="text" className="border rounded p-2 outline-none w-full bg-[hsl(200,5,12,1)] focus:bg-[hsl(200,5,12,1)] focus:ring-2 focus:ring-blue-500 transition-all text-gray-100 focus:text-gray-100"
                                value={groupData.instructionsTransfer?.url || ""}
                                onChange={(e) => updateField("instructionsTransfer", { ...groupData.instructionsTransfer, url: e.target.value })} />
                        </label>
                        <label className="flex flex-col text-sm font-medium gap-1 text-gray-400">
                            Instrucciones
                            <textarea className="border rounded p-2 outline-none w-full h-16 resize-none bg-[hsl(200,5,12,1)] focus:bg-[hsl(200,5,12,1)] focus:ring-2 focus:ring-blue-500 transition-all text-gray-100 focus:text-gray-100"
                                value={groupData.instructionsTransfer?.text || ""}
                                onChange={(e) => updateField("instructionsTransfer", { ...groupData.instructionsTransfer, text: e.target.value })} />
                        </label>
                    </div>

                    <div className="flex flex-col gap-4 mb-2">
                        <p className="font-semibold text-gray-100 border-b pb-1">Textos Yani</p>
                        <div className="flex gap-2">
                            <label className="flex flex-col text-sm font-medium gap-1 text-gray-400 flex-1">
                                Subtítulo
                                <input type="text" className="border rounded p-2 outline-none w-full bg-[hsl(200,5,12,1)] focus:bg-[hsl(200,5,12,1)] focus:ring-2 focus:ring-blue-500 transition-all text-gray-100 focus:text-gray-100"
                                    value={groupData.yani?.sub || ""}
                                    onChange={(e) => updateField("yani", { ...groupData.yani, sub: e.target.value })} />
                            </label>
                            <label className="flex flex-col text-sm font-medium gap-1 text-gray-400 flex-[2]">
                                Texto
                                <textarea className="border rounded p-2 outline-none w-full h-10 resize-none bg-[hsl(200,5,12,1)] focus:bg-[hsl(200,5,12,1)] focus:ring-2 focus:ring-blue-500 transition-all text-gray-100 focus:text-gray-100"
                                    value={groupData.yani?.text || ""}
                                    onChange={(e) => updateField("yani", { ...groupData.yani, text: e.target.value })} />
                            </label>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 mb-2">
                        <p className="font-semibold text-gray-100 border-b pb-1">Textos Leo</p>
                        <div className="flex gap-2">
                            <label className="flex flex-col text-sm font-medium gap-1 text-gray-400 flex-1">
                                Subtítulo
                                <input type="text" className="border rounded p-2 outline-none w-full bg-[hsl(200,5,12,1)] focus:bg-[hsl(200,5,12,1)] focus:ring-2 focus:ring-blue-500 transition-all text-gray-100 focus:text-gray-100"
                                    value={groupData.leo?.sub || ""}
                                    onChange={(e) => updateField("leo", { ...groupData.leo, sub: e.target.value })} />
                            </label>
                            <label className="flex flex-col text-sm font-medium gap-1 text-gray-400 flex-[2]">
                                Texto
                                <textarea className="border rounded p-2 outline-none w-full h-10 resize-none bg-[hsl(200,5,12,1)] focus:bg-[hsl(200,5,12,1)] focus:ring-2 focus:ring-blue-500 transition-all text-gray-100 focus:text-gray-100"
                                    value={groupData.leo?.text || ""}
                                    onChange={(e) => updateField("leo", { ...groupData.leo, text: e.target.value })} />
                            </label>
                        </div>
                    </div>

                    <div className="md:col-span-2">
                        <p className="font-semibold text-gray-100 border-b pb-1 mb-3">Mensajería</p>
                        <label className="flex flex-col text-sm font-medium gap-1 text-gray-400">
                            Texto de Invitación (WhatsApp)
                            <textarea className="border rounded p-2 outline-none w-full h-24 resize-none bg-[hsl(200,5,12,1)] focus:bg-[hsl(200,5,12,1)] focus:ring-2 focus:ring-green-500 transition-all text-gray-100 focus:text-gray-100"
                                value={groupData.textInvitation || ""}
                                onChange={(e) => updateField("textInvitation", e.target.value)} />
                        </label>
                    </div>

                    <div className="md:col-span-2 flex justify-end mt-2">
                        <ButtonAdmin action={handleSaveGroup} text="Enviar cambios" />
                    </div>
                </div>
            </div>
        </div>
    )
}
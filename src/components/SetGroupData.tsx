"use client"

import { useState } from "react"
import { ButtonAdmin } from "./ButtonAdmin"
import { PropsSetGroup } from "../types/types";

export const SetGroupData = ({ updateGroupField, groupData, handleSaveGroup }: PropsSetGroup) => {

    const [openGroup, setOpenGroup] = useState(false)

    return (
        <>
            <button className="font-bold text-left flex items-center gap-2" onClick={() => setOpenGroup(prev => !prev)}>
                <p className={`${openGroup ? "rotate-0" : "-rotate-90"} duration-500`}>▼</p> Modificar datos del grupo
            </button>
            <div className="grid mb-4 px-4">
                <div className={`grid transition-[grid-template-rows] duration-500 ease-in-out overflow-hidden ${openGroup ? "grid-rows-[1fr] mt-4" : "grid-rows-[0fr]"}`}>
                    <div className="min-h-0">
                        <div className='flex items-center gap-2'>
                            <p className='font-medium'>¿Iglesia?</p>
                            <input
                                type='checkbox'
                                checked={groupData.church}
                                onChange={(e) => updateGroupField("church", e.target.checked)}
                            />
                        </div>
                        <div>
                            <p className='font-medium mb-1'>Descuento tarjeta</p>
                            <label className="text-xs text-gray-500 flex flex-col w-fit">
                                Porcentaje de descuento
                                <input
                                    className="border rounded px-2 py-1 outline-none text-center w-15"
                                    type='number'
                                    value={groupData.payment_coverage}
                                    onChange={(e) => updateGroupField("payment_coverage", Number(e.target.value))}
                                />
                            </label>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <p className='font-medium mb-1'>Textos Yani</p>
                                <div className='flex gap-2'>
                                    <label className="text-xs text-gray-500 flex-1">Subtitulo
                                        <input className="border rounded px-2 py-1 outline-none w-full" type='text' value={groupData.yani.sub || ""} onChange={(e) => updateGroupField("yani", { ...groupData.yani, sub: e.target.value })} />
                                    </label>
                                    <label className="text-xs text-gray-500 flex-1">Texto
                                        <input className="border rounded px-2 py-1 outline-none w-full" type='text' value={groupData.yani.text || ""} onChange={(e) => updateGroupField("yani", { ...groupData.yani, text: e.target.value })} />
                                    </label>
                                </div>
                            </div>
                            <div>
                                <p className='font-medium mb-1'>Textos Leo</p>
                                <div className='flex gap-2'>
                                    <label className="text-xs text-gray-500 flex-1">Subtitulo
                                        <input className="border rounded px-2 py-1 outline-none w-full" type='text' value={groupData.leo.sub || ""} onChange={(e) => updateGroupField("leo", { ...groupData.leo, sub: e.target.value })} />
                                    </label>
                                    <label className="text-xs text-gray-500 flex-1">Texto
                                        <input className="border rounded px-2 py-1 outline-none w-full" type='text' value={groupData.leo.text || ""} onChange={(e) => updateGroupField("leo", { ...groupData.leo, text: e.target.value })} />
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="mb-4">
                            <p className='font-medium mb-1'>Traslados</p>
                            <div className='flex gap-2'>
                                <label className="text-xs text-gray-500 flex-1">URL punto de encuentro
                                    <input className="border rounded px-2 py-1 outline-none w-full" type='text' value={groupData.instructionsTransfer.url} onChange={(e) => updateGroupField("instructionsTransfer", { ...groupData.instructionsTransfer, url: e.target.value })} />
                                </label>
                                <label className="text-xs text-gray-500 flex-1">Instrucciones
                                    <textarea className="border rounded px-2 py-1 outline-none w-full" value={groupData.instructionsTransfer.text} onChange={(e) => updateGroupField("instructionsTransfer", { ...groupData.instructionsTransfer, text: e.target.value })} />
                                </label>
                            </div>
                        </div>

                        <div className="mb-4">
                            <p className='font-medium mb-1'>Mensaje de invitación</p>
                            <div className='flex gap-2'>
                                <label className="text-xs text-gray-500 flex-1">Texto Invitación
                                    <textarea className="border rounded px-2 py-1 outline-none w-full" value={groupData.textInvitation || ""} onChange={(e) => updateGroupField("textInvitation", e.target.value)} />
                                </label>
                            </div>
                        </div>

                        <ButtonAdmin action={handleSaveGroup} text={"Enviar cambios de Grupo"} />
                    </div>
                </div>
            </div>
        </>
    )
}

"use client"

import { useEffect, useState } from "react"
import { ArrayElements, DataAdminType, guestsObj, PayType } from "../types/types"
import { useUpdate } from "../helpers/useUpdate"
import { sendAdminData } from "../helpers/sendAdminData"
import { ButtonAdmin } from "./ButtonAdmin"
import { DataGuestAd } from "./DataGuestAd"
import { DataGuestQ } from "./DataGuestQ"
import '@/src/styles/invitation.css'
import { SetGroupData } from "./SetGroupData"

export const DataGuest = ({ group, price }: DataAdminType) => {
    const [openGroup, setOpenGroup] = useState(false)
    const [payment, setPayment] = useState<Array<PayType>>([])
    const [pendingChanges, setPendingChanges] = useState<Array<any>>([])

    const [groupData, setGroupData] = useState<any>({
        id: group?.id || 0,
        name: group?.name || "",
        church: group?.church || false,
        guests: group?.guests || [],
        yani: { sub: group?.yani?.sub || "", text: group?.yani?.text || "" },
        leo: { sub: group?.leo?.sub || "", text: group?.leo?.text || "" },
        payment_coverage: group?.payment_coverage || 0,
        instructionsTransfer: {
            url: group?.instructionsTransfer?.url || "",
            text: group?.instructionsTransfer?.text || ""
        },
        textInvitation: group?.textInvitation || ""
    })

    useEffect(() => {
        if (!group || !group.id) return

        setGroupData({
            id: group.id,
            name: group.name,
            church: group.church,
            guests: group.guests,
            yani: { sub: group.yani?.sub || "", text: group.yani?.text || "" },
            leo: { sub: group.leo?.sub || "", text: group.leo?.text || "" },
            payment_coverage: group.payment_coverage,
            instructionsTransfer: {
                url: group.instructionsTransfer?.url || "",
                text: group.instructionsTransfer?.text || ""
            },
            textInvitation: group.textInvitation || ""
        })

        setPayment(group.guests.map(g => ({ id: g.id, pay: g.pay })))
        setPendingChanges([])
    }, [group])

    const updateGroupField = (key: string, value: any) => {
        setGroupData((prev: ArrayElements) => ({
            ...prev,
            [key]: value
        }))
    }

    const handleSavePayments = async ({ setTextButton, setAnimateButton }: any) => {
        await sendAdminData({
            guests: pendingChanges,
            setTextButton,
            setAnimateButton,
            col: "pay"
        })
    }

    const handleSaveGroup = async ({ setTextButton, setAnimateButton }: any) => {
        const { guests, ...cleanGroupData } = groupData
        await useUpdate([cleanGroupData], setTextButton, setAnimateButton)
    }

    console.log(groupData)

    return (
        <div className="w-full border-b border-gray-200 py-2">
            <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-4 items-center w-full">
                <button className="font-bold text-left flex items-center gap-2" onClick={() => setOpenGroup(prev => !prev)}>
                    <p className={`${openGroup ? "rotate-0" : "-rotate-90"} duration-500`}>▼</p> Grupo: {group.name}
                </button>

                <DataGuestQ guests={group.guests} coverage={groupData.payment_coverage} payment={payment} price={price} groupName={group.name} />
            </div>

            <div className={`grid transition-[grid-template-rows] duration-500 ease-in-out overflow-hidden ${openGroup ? "grid-rows-[1fr] mt-4" : "grid-rows-[0fr]"}`}>
                <div className='min-h-0 px-4 rounded-lg'>
                    <div>
                        <SetGroupData
                            updateGroupField={updateGroupField}
                            groupData={groupData}
                            handleSaveGroup={handleSaveGroup}
                        />
                    </div>

                    <div className="mt-6 border-t pt-4">
                        <div className="grid grid-cols-[1fr_3fr] items-center font-bold border-b pb-2 text-sm text-gray-600">
                            <p>Nombre y apellido</p>
                            <div className="grid grid-cols-4 text-center">
                                <p>Asiste</p>
                                <p>Transfer</p>
                                <p>Preferencias menú</p>
                                <p>Pago?</p>
                            </div>
                        </div>

                        <div className="flex flex-col">
                            {[...group.guests]
                                .sort((a, b) => a.id - b.id)
                                .map((g: guestsObj) => (
                                    <div key={g.id} className="grid grid-cols-[1fr_3fr] items-center py-2 border-b border-gray-100 last:border-0">
                                        <div className="flex items-center gap-2">
                                            <p className="truncate font-medium">{g.name} {g.lastname}</p>
                                            {g.phone &&
                                                <div className="flex">
                                                    <a href={`https://wa.me/${g.phone}?text=${encodeURIComponent(group.textInvitation)}`} target="_blank" rel="noreferrer">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"><path fill="#25d366" d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2c-5.46 0-9.91 4.45-9.91 9.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91c0-2.65-1.03-5.14-2.9-7.01m-7.01 15.24c-1.48 0-2.93-.4-4.2-1.15l-.3-.18l-3.12.82l.83-3.04l-.2-.31a8.26 8.26 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24c2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c.02 4.54-3.68 8.23-8.22 8.23m4.52-6.16c-.25-.12-1.47-.72-1.69-.81c-.23-.08-.39-.12-.56.12c-.17.25-.64.81-.78.97c-.14.17-.29.19-.54.06c-.25-.12-1.05-.39-1.99-1.23c-.74-.66-1.23-1.47-1.38-1.72c-.14-.25-.02-.38.11-.51c.11-.11.25-.29.37-.43s.17-.25.25-.41c.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31c-.22.25-.86.85-.86 2.07s.89 2.4 1.01 2.56c.12.17 1.75 2.67 4.23 3.74c.59.26 1.05.41 1.41.52c.59.19 1.13.16 1.56.1c.48-.07 1.47-.6 1.67-1.18c.21-.58.21-1.07.14-1.18s-.22-.16-.47-.28" /></svg>
                                                    </a>
                                                </div>
                                            }
                                        </div>

                                        <div className="grid grid-cols-4 items-center text-center">
                                            <DataGuestAd assist={g.confirm} transfer={g.transfer} food={g.foodPreferents} />

                                            <div className="flex justify-center">
                                                {groupData.payment_coverage < 1 ? (
                                                    <input
                                                        type="checkbox"
                                                        checked={payment.find(f => f.id === g.id)?.pay || false}
                                                        onChange={(e) => {
                                                            const newPayValue = e.target.checked
                                                            setPayment(prev => prev.map(item => item.id === g.id ? { ...item, pay: newPayValue } : item))

                                                            setPendingChanges(prev => {
                                                                const filtered = prev.filter(item => item.id !== g.id)
                                                                const updatedGuest = { ...g, pay: newPayValue }
                                                                return [...filtered, updatedGuest]
                                                            })
                                                        }}
                                                    />
                                                ) : (
                                                    <span className="text-gray-400 text-sm">-</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <div className="mt-3 flex justify-end">
                            <ButtonAdmin action={handleSavePayments} text={"Guardar pagos"} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
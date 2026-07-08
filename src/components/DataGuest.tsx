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

    return (
        <div className="w-full border-b border-gray-200 py-2">
            <div className="grid grid-cols-[2fr_0.5fr_0.5fr_0.5fr_0.5fr_1.5fr] gap-4 items-center w-full">
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
                            <div className="grid grid-cols-5 text-center">
                                <p>Enviar invitación</p>
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
                                        </div>

                                        <div className="grid grid-cols-5 items-center text-center">
                                            <DataGuestAd assist={g.confirm} transfer={g.transfer} food={g.foodPreferents} phone={g.phone} textInv={group.textInvitation} />

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
                        {group.payment_coverage !== 1 &&
                            <div className="mt-3 flex justify-end">
                                <ButtonAdmin action={handleSavePayments} text={"Guardar pagos"} />
                            </div>
                        }

                    </div>
                </div>
            </div>
        </div>
    )
}
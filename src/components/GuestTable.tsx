"use client"
import { useState, useMemo } from "react"
import { sendAdminData } from "../helpers/sendAdminData"
import { ButtonAdmin } from "./ButtonAdmin"
import { SendInv } from "./SendInv"

export default function GuestTable({ guests, price, onPaymentsSaved }: any) {
    const [pendingChanges, setPendingChanges] = useState<any[]>([])

    const handleTogglePay = (guestId: number, newValue: boolean) => {
        const originalGuest = guests.find((g: any) => g.id === guestId)

        if (originalGuest && originalGuest.pay !== newValue) {
            setPendingChanges(prev => {
                const filtered = prev.filter(item => item.id !== guestId)
                return [...filtered, { id: guestId, pay: newValue }]
            })
        } else {
            setPendingChanges(prev => prev.filter(item => item.id !== guestId))
        }
    }

    const handleSavePayments = async ({ setTextButton, setAnimateButton }: any) => {
        const changesToSave = [...pendingChanges];

        await sendAdminData({ guests: pendingChanges, setTextButton, setAnimateButton, col: "pay", setPendingChanges, text: "Guardar Pagos" })

        onPaymentsSaved(changesToSave);
    }

    const sortedGuestsWithPayments = useMemo(() => {
        const sorted = [...guests].sort((a: any, b: any) => a.id - b.id);

        return sorted.map((g: any) => {
            const pending = pendingChanges.find((p: any) => p.id === g.id);
            const currentPay = pending ? pending.pay : (g.pay || false);
            const amountToPay = price - (g.groupCoverage * price);

            return {
                ...g,
                currentPay,
                amountToPay
            };
        });
    }, [guests, pendingChanges, price]);

    return (
        <div className="relative overflow-x-auto rounded-lg border">
            <table className="w-full text-sm text-left">
                <thead className="text-xs uppercase bg-[hsl(200,5,12,1)] text-gray-400">
                    <tr>
                        <th className="px-4 py-3 w-1/6">Invitado</th>
                        <th className="px-4 py-3 w-1/8">Grupo</th>
                        <th className="px-4 py-3 text-center w-fit">Asistencia</th>
                        <th className="px-4 py-3 text-center w-fit">Transfer / Bus</th>
                        <th className="px-4 py-3 w-1/5">Menú</th>
                        <th className="px-4 py-3 text-center w-fit">Pago</th>
                        <th className="px-4 py-3 text-center w-1/8">Mensaje</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedGuestsWithPayments.map((g: any) => (
                        <tr key={g.id} className="border-b last:border-0 hover:bg-[hsl(200,5,20,1)] transition-colors">
                            <td className="px-4 py-3 font-medium whitespace-nowrap">{g.name} {g.lastname}</td>
                            <td className="px-4 py-3 text-gray-500">{g.groupName}</td>
                            <td className="px-4 py-3 text-center">
                                {g.confirm === null ? <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-bold">Pendiente</span> :
                                    g.confirm ? <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-bold">Asiste</span> :
                                        <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-bold">No Asiste</span>}
                            </td>
                            <td className="px-4 py-3 text-center">{g.transfer ? '✅ Sí' : '❌ No'}</td>
                            <td className="px-4 py-3 text-gray-400 text-xs">{g.foodPreferents || "-"}</td>
                            <td className="px-4 py-3 text-center">
                                {g.groupCoverage < 1 ? (
                                    <div className="flex flex-col items-center">
                                        <input
                                            type="checkbox"
                                            className="w-4 h-4 cursor-pointer accent-blue-600"
                                            checked={g.currentPay}
                                            onChange={(e) => handleTogglePay(g.id, e.target.checked)}
                                        />
                                        <span className="text-[10px] text-gray-400 mt-1">${g.amountToPay.toLocaleString()}</span>
                                    </div>
                                ) : (
                                    <span className="text-gray-300 text-xs italic">Bonificado</span>
                                )}
                            </td>
                            <td className="px-2 py-1 text-center">
                                <SendInv id={g.id} phone={g.phone} textInvitation={g.textInvitation} slug={g.slug} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className={`fixed min-w-[160px] right-8 z-50 bg-[hsl(200,5,12,1)] p-4 rounded-xl shadow-2xl border flex items-center gap-4 animate-fade-in-up duration-500 ${pendingChanges.length > 0 ? "bottom-8" : "-bottom-30"}`}>
                <p className="text-sm font-semibold text-gray-100">{pendingChanges.length} pago(s) modificado(s)</p>
                <ButtonAdmin action={handleSavePayments} text="Guardar Pagos" />
            </div>
        </div>
    )
}
"use client"
import { useState, useMemo } from "react"
import GuestTable from "./GuestTable";
import GroupConfig from "./GroupConfig";

export default function DashboardClient({ initialGuests, groups, price }: any) {
    const [activeTab, setActiveTab] = useState<'guests' | 'groups'>('guests')
    const [searchTerm, setSearchTerm] = useState("")
    const [filterGroup, setFilterGroup] = useState("all")
    const [otherFilters, setOtherFilters] = useState<Record<string, any>>({})

    const filteredGuests = useMemo(() => {
        const searchLower = searchTerm.toLowerCase();
        const filterKeys = Object.keys(otherFilters);

        return initialGuests
            .filter((guest: any) => {
                const matchesName = `${guest.name} ${guest.lastname}`.toLowerCase().includes(searchLower)
                if (!matchesName) return false;

                const matchesGroup = filterGroup === "all" || guest.groupName === filterGroup
                if (!matchesGroup) return false;

                if (otherFilters.hasOwnProperty('pay') && otherFilters['pay'] === false) {
                    if (guest.groupCoverage === 1) return false;
                }

                return filterKeys.every(key => {
                    const valorFiltro = otherFilters[key];

                    if (key === 'phone' && valorFiltro === true) {
                        return !!guest.phone;
                    }
                    return guest[key] === valorFiltro;
                });
            })
            .sort((a: any, b: any) => a.id - b.id);
    }, [initialGuests, searchTerm, filterGroup, otherFilters])

    const handleCheckboxChange = (key: string, value: any) => {
        setOtherFilters(prev => {
            const copy = { ...prev };
            if (copy.hasOwnProperty(key) && copy[key] === value) {
                delete copy[key];
            } else {
                copy[key] = value;
            }
            return copy;
        });
    }

    const checkboxConfigs = [
        { label: "Confirmados", key: "confirm", value: true },
        { label: "No asisten", key: "confirm", value: false },
        { label: "Sin respuesta", key: "confirm", value: null },
        { label: "Traslado solicitado", key: "transfer", value: true },
        { label: "Menú especial", key: "foodPreferents", value: true },
        { label: "Pago realizado", key: "pay", value: true },
        { label: "Pendientes de pago", key: "pay", value: false },
        { label: "Con teléfono", key: "phone", value: true },
    ];

    return (
        <div className="bg-[hsl(200,5,12,1)] rounded-xl shadow-sm border border-gray-200 overflow-hidden text-white">
            <div className="flex border-b border-gray-200 bg-[hsl(200,5,12,1)]">
                <button
                    className={`px-6 py-4 font-semibold text-sm transition-colors ${activeTab === 'guests' ? 'border-b-2 border-white text-white' : 'text-gray-500 hover:text-gray-700'}`}
                    onClick={() => setActiveTab('guests')}
                >
                    Lista de Invitados
                </button>
                <button
                    className={`px-6 py-4 font-semibold text-sm transition-colors ${activeTab === 'groups' ? 'border-b-2 border-white text-white' : 'text-gray-500 hover:text-gray-700'}`}
                    onClick={() => setActiveTab('groups')}
                >
                    Configuración de Grupos
                </button>
            </div>

            <div className="p-6">
                {activeTab === 'guests' && (
                    <>
                        <div className="flex flex-col sm:flex-row gap-4 mb-3">
                            <input
                                type="text"
                                placeholder="Buscar por nombre..."
                                className="flex-1 border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <select
                                className="bg-[hsl(200,5,12,1)] border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                                value={filterGroup}
                                onChange={(e) => setFilterGroup(e.target.value)}
                            >
                                <option value="all">Todos los grupos</option>
                                {groups.map((g: any) => (
                                    <option key={g.id} value={g.name}>{g.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                            {checkboxConfigs.map((cfg, idx) => {
                                const isChecked = otherFilters.hasOwnProperty(cfg.key) && otherFilters[cfg.key] === cfg.value;
                                return (
                                    <label key={idx} className="flex items-center gap-2 cursor-pointer select-none">
                                        <input
                                            type="checkbox"
                                            className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
                                            checked={isChecked}
                                            onChange={() => handleCheckboxChange(cfg.key, cfg.value)}
                                        />
                                        {cfg.label}
                                    </label>
                                );
                            })}
                        </div>

                        <GuestTable guests={filteredGuests} price={price} />
                    </>
                )}

                {activeTab === 'groups' && (
                    <div className="flex flex-col gap-4">
                        {groups.map((group: any) => (
                            <GroupConfig key={group.id} group={group} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
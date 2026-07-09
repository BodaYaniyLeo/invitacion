import { loginAdmin } from "../actions";

export default function AdminLoginPage({ searchParams }: { searchParams: { error?: string } }) {
    return (
        <div className="w-full max-w-md mx-auto p-6 bg-[hsl(200,5,12,1)] rounded-xl shadow-md border border-gray-100">
            <div className="mb-6 text-center">
                <h2 className="text-2xl font-bold text-gray-400">Panel de Administración</h2>
                <p className="text-sm text-gray-500 mt-1">Ingresa tus credenciales para continuar</p>
            </div>

            <form action={loginAdmin} className="space-y-4">
                <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">
                        Correo Electrónico
                    </label>
                    <input
                        type="email"
                        name="email"
                        required
                        placeholder="admin@ejemplo.com"
                        className="w-full px-3 py-2.5 bg-[hsl(200,5,12,1)] border border-gray-200 rounded-lg text-sm text-gray-400 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                    />
                </div>

                <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">
                        Contraseña
                    </label>
                    <input
                        type="password"
                        name="password"
                        required
                        placeholder="••••••••"
                        className="w-full px-3 py-2.5 bg-[hsl(200,5,12,1)] border border-gray-200 rounded-lg text-sm text-gray-400 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                    />
                </div>

                <div className="pt-2">
                    <button
                        type="submit"
                        className="w-full py-3 px-4 bg-gray-900 hover:bg-gray-800 text-white font-bold text-sm uppercase tracking-wide rounded-lg shadow-sm hover:shadow transition-all duration-200 transform active:scale-[0.99]"
                    >
                        Ingresar al Panel
                    </button>
                </div>
            </form>
        </div>
    )
}
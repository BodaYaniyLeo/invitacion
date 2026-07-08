import { loginAdmin } from "../actions";

export default function AdminLoginPage({ searchParams }: { searchParams: { error?: string } }) {
    return (
        <div style={{ maxWidth: '400px', margin: 'auto', padding: '2rem' }}>
            <h1>Login de Administrador</h1>

            {searchParams.error && <p style={{ color: 'red' }}>{searchParams.error}</p>}

            <form action={loginAdmin}>
                <label>
                    Email:
                    <input type="email" name="email" required style={{ display: 'block', width: '100%', marginBottom: '1rem' }} />
                </label>

                <label>
                    Contraseña:
                    <input type="password" name="password" required style={{ display: 'block', width: '100%', marginBottom: '1rem' }} />
                </label>

                <button type="submit">Ingresar al Panel</button>
            </form>
        </div>
    )
}
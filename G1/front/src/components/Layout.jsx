import { NavLink, Outlet } from "react-router-dom";

export default function Layout() {
  const linkBase =
    "px-3 py-2 rounded hover:bg-blue-50 transition aria-[current=page]:bg-blue-100";
  const active = ({ isActive }) =>
    isActive ? `${linkBase} bg-blue-100` : linkBase;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <nav className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <NavLink to="/" className="text-xl font-bold text-blue-700">
              CarAdmin
            </NavLink>
            <div className="hidden sm:flex items-center gap-2">
              <NavLink to="/" className={active} aria-label="Ir para Home">
                Home
              </NavLink>

              {/* Veículos */}
              <NavLink
                to="/cars"
                className={active}
                aria-label="Listar veículos"
              >
                Veículos
              </NavLink>
              <NavLink
                to="/cars/new"
                className={active}
                aria-label="Cadastrar veículo"
              >
                Novo Veículo
              </NavLink>

              {/* Usuários */}
              <NavLink
                to="/users"
                className={active}
                aria-label="Gerenciar usuários"
              >
                Usuários
              </NavLink>
              <NavLink
                to="/users/new"
                className={active}
                aria-label="Cadastrar usuário"
              >
                Novo Usuário
              </NavLink>
            </div>
          </div>
        </nav>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        <Outlet />
      </main>

      <footer className="max-w-6xl mx-auto px-4 py-6 text-sm text-gray-500">
        © {new Date().getFullYear()} CarAdmin. Todos os direitos reservados.
      </footer>
    </div>
  );
}

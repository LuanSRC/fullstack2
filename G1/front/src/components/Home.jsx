import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Bem-vindo ao CarAdmin
        </h1>
        <p className="text-gray-600">
          Gerencie veículos e usuários de forma simples.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Veículos */}
        <Link
          to="/cars"
          className="block border rounded-lg bg-white hover:shadow transition p-4"
          aria-label="Ir para listagem de veículos"
        >
          <h2 className="text-lg font-semibold text-gray-800">
            Listar Veículos
          </h2>
          <p className="text-gray-600 mt-1">
            Visualize, edite e exclua veículos.
          </p>
        </Link>

        <Link
          to="/cars/new"
          className="block border rounded-lg bg-white hover:shadow transition p-4"
          aria-label="Ir para cadastro de novo veículo"
        >
          <h2 className="text-lg font-semibold text-gray-800">
            Cadastrar Veículo
          </h2>
          <p className="text-gray-600 mt-1">Adicione um novo veículo.</p>
        </Link>

        {/* Usuários */}
        <Link
          to="/users"
          className="block border rounded-lg bg-white hover:shadow transition p-4"
          aria-label="Ir para gerenciamento de usuários"
        >
          <h2 className="text-lg font-semibold text-gray-800">
            Gerenciar Usuários
          </h2>
          <p className="text-gray-600 mt-1">Liste, edite e exclua usuários.</p>
        </Link>

        <Link
          to="/users/new"
          className="block border rounded-lg bg-white hover:shadow transition p-4"
          aria-label="Ir para cadastro de novo usuário"
        >
          <h2 className="text-lg font-semibold text-gray-800">Novo Usuário</h2>
          <p className="text-gray-600 mt-1">Crie um usuário no sistema.</p>
        </Link>
      </div>
    </div>
  );
}

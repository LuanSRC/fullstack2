import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api.js";

export default function ListUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let active = true;
    setLoading(true);
    api
      .get("/users")
      .then((res) => {
        if (active) setUsers(res.data || []);
      })
      .catch(() => setError("Falha ao carregar a lista de usuários."))
      .finally(() => setLoading(false));
    return () => {
      active = false;
    };
  }, []);

  const handleDelete = async (id) => {
    const ok = window.confirm("Tem certeza que deseja excluir este usuário?");
    if (!ok) return;
    setDeletingId(id);
    const prev = users;
    setUsers((cur) => cur.filter((u) => u.id !== id));
    try {
      await api.delete(`/users/${id}`); // backend retorna 204
    } catch {
      setUsers(prev); // rollback
      alert("Não foi possível excluir. Tente novamente.");
    } finally {
      setDeletingId(null);
    }
  };

  const handleEdit = (id) => navigate(`/users/${id}/edit`);

  if (loading) return <p className="p-4">Carregando…</p>;
  if (error) return <p className="p-4 text-red-600">{error}</p>;

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Usuários</h1>
        <button
          onClick={() => navigate("/users/new")}
          className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Novo Usuário
        </button>
      </div>

      <section className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border-b border-gray-300 text-left font-semibold text-gray-700">
                ID
              </th>
              <th className="px-4 py-2 border-b border-gray-300 text-left font-semibold text-gray-700">
                Nome
              </th>
              <th className="px-4 py-2 border-b border-gray-300 text-left font-semibold text-gray-700">
                Email
              </th>
              <th className="px-4 py-2 border-b border-gray-300 text-left font-semibold text-gray-700">
                Tipo
              </th>
              <th className="px-4 py-2 border-b border-gray-300 text-left font-semibold text-gray-700">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="odd:bg-white even:bg-blue-50 hover:bg-blue-100 transition-colors"
              >
                <td className="px-4 py-2 border-b border-gray-200">
                  {user.id}
                </td>
                <td className="px-4 py-2 border-b border-gray-200">
                  {user.name}
                </td>
                <td className="px-4 py-2 border-b border-gray-200">
                  {user.email}
                </td>
                <td className="px-4 py-2 border-b border-gray-200">
                  {user.role || "-"}
                </td>
                <td className="px-4 py-2 border-b border-gray-200">
                  <div className="flex gap-2">
                    <button
                      aria-label={`Editar usuário ${user.id}`}
                      className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition disabled:opacity-60"
                      onClick={() => handleEdit(user.id)}
                      disabled={deletingId === user.id}
                    >
                      Editar
                    </button>
                    <button
                      aria-label={`Excluir usuário ${user.id}`}
                      className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition disabled:opacity-60"
                      onClick={() => handleDelete(user.id)}
                      disabled={deletingId === user.id}
                    >
                      {deletingId === user.id ? "Excluindo..." : "Excluir"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan="5" className="px-4 py-6 text-center text-gray-600">
                  Nenhum usuário encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </>
  );
}

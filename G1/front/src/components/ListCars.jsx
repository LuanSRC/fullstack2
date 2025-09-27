import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api.js";

export default function ListCars() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let active = true;
    setLoading(true);
    api
      .get("/cars")
      .then((res) => {
        if (active) setCars(res.data || []);
      })
      .catch(() => setError("Falha ao carregar a lista de veículos."))
      .finally(() => setLoading(false));
    return () => {
      active = false;
    };
  }, []);

  const handleDelete = async (id) => {
    const ok = window.confirm("Tem certeza que deseja excluir este carro?");
    if (!ok) return;
    setDeletingId(id);
    const prev = cars;
    setCars((cur) => cur.filter((c) => c.id !== id));
    try {
      await api.delete(`/cars/${id}`); // espera 204
    } catch (e) {
      setCars(prev); // rollback
      alert("Não foi possível excluir. Tente novamente.");
    } finally {
      setDeletingId(null);
    }
  };

  const handleEdit = (id) => navigate(`/cars/${id}/edit`);

  if (loading) return <p className="p-4">Carregando…</p>;
  if (error) return <p className="p-4 text-red-600">{error}</p>;

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">
          Veículos Registrados
        </h1>
        <button
          onClick={() => navigate("/cars/new")}
          className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Novo Veículo
        </button>
      </div>

      <section className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border-b border-gray-300 text-left font-semibold text-gray-700">
                Registro
              </th>
              <th className="px-4 py-2 border-b border-gray-300 text-left font-semibold text-gray-700">
                Nome
              </th>
              <th className="px-4 py-2 border-b border-gray-300 text-left font-semibold text-gray-700">
                Marca
              </th>
              <th className="px-4 py-2 border-b border-gray-300 text-left font-semibold text-gray-700">
                Modelo
              </th>
              <th className="px-4 py-2 border-b border-gray-300 text-left font-semibold text-gray-700">
                Ano
              </th>
              <th className="px-4 py-2 border-b border-gray-300 text-left font-semibold text-gray-700">
                Preço
              </th>
              <th className="px-4 py-2 border-b border-gray-300 text-left font-semibold text-gray-700">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car) => (
              <tr
                key={car.id}
                className="odd:bg-white even:bg-blue-50 hover:bg-blue-100 transition-colors"
              >
                <td className="px-4 py-2 border-b border-gray-200">{car.id}</td>
                <td className="px-4 py-2 border-b border-gray-200">
                  {car.name}
                </td>
                <td className="px-4 py-2 border-b border-gray-200">
                  {car.trade}
                </td>
                <td className="px-4 py-2 border-b border-gray-200">
                  {car.model}
                </td>
                <td className="px-4 py-2 border-b border-gray-200">
                  {car.year}
                </td>
                <td className="px-4 py-2 border-b border-gray-200">
                  R$ {car.price}
                </td>
                <td className="px-4 py-2 border-b border-gray-200">
                  <div className="flex gap-2">
                    <button
                      aria-label={`Editar carro ${car.id}`}
                      className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition disabled:opacity-60"
                      onClick={() => handleEdit(car.id)}
                      disabled={deletingId === car.id}
                    >
                      Editar
                    </button>
                    <button
                      aria-label={`Excluir carro ${car.id}`}
                      className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition disabled:opacity-60"
                      onClick={() => handleDelete(car.id)}
                      disabled={deletingId === car.id}
                    >
                      {deletingId === car.id ? "Excluindo..." : "Excluir"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {cars.length === 0 && (
              <tr>
                <td colSpan="7" className="px-4 py-6 text-center text-gray-600">
                  Nenhum veículo encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </>
  );
}

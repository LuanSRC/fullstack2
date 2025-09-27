import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import api from "../api/api.js";

export default function EditCar() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    trade: "",
    model: "",
    year: "",
    price: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    setLoading(true);
    api
      .get(`/cars/${id}`)
      .then((res) => {
        if (!active) return;
        const car = res.data;
        setForm({
          name: car.name ?? "",
          trade: car.trade ?? "",
          model: car.model ?? "",
          year: String(car.year ?? ""),
          price: String(car.price ?? ""),
        });
      })
      .catch((e) => {
        setError(
          e?.response?.status === 404
            ? "Carro não encontrado."
            : "Falha ao carregar o carro."
        );
      })
      .finally(() => setLoading(false));
    return () => {
      active = false;
    };
  }, [id]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.trade || !form.model) {
      alert("Preencha Nome, Marca e Modelo.");
      return;
    }
    setSaving(true);
    try {
      const payload = {
        name: form.name,
        trade: form.trade,
        model: form.model,
        year: form.year ? Number(form.year) : undefined,
        price: form.price ? Number(form.price) : undefined,
      };
      await api.put(`/cars/${id}`, payload);
      navigate("/cars");
    } catch (e2) {
      alert("Não foi possível salvar as alterações. Tente novamente.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="p-4">Carregando…</p>;
  if (error) {
    return (
      <div className="p-4">
        <p className="text-red-600 mb-4">{error}</p>
        <Link to="/cars" className="text-blue-600 underline">
          Voltar para a lista
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        Editar Veículo #{id}
      </h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm text-gray-700 mb-1">Nome</label>
          <input
            name="name"
            value={form.name}
            onChange={onChange}
            className="w-full border rounded px-3 py-2"
            placeholder="Ex.: Sedan Premium"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-1">Marca</label>
          <input
            name="trade"
            value={form.trade}
            onChange={onChange}
            className="w-full border rounded px-3 py-2"
            placeholder="Ex.: Honda"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-1">Modelo</label>
          <input
            name="model"
            value={form.model}
            onChange={onChange}
            className="w-full border rounded px-3 py-2"
            placeholder="Ex.: Civic"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-1">Ano</label>
          <input
            name="year"
            type="number"
            value={form.year}
            onChange={onChange}
            className="w-full border rounded px-3 py-2"
            placeholder="Ex.: 2020"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-1">Preço</label>
          <input
            name="price"
            type="number"
            step="0.01"
            value={form.price}
            onChange={onChange}
            className="w-full border rounded px-3 py-2"
            placeholder="Ex.: 85000"
          />
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-60"
            disabled={saving}
          >
            {saving ? "Salvando..." : "Salvar"}
          </button>
          <Link
            to="/cars"
            className="px-4 py-2 border rounded hover:bg-gray-50 transition"
          >
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  );
}

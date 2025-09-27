import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/api.js";

export default function CreateCar() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    trade: "",
    model: "",
    year: "",
    price: "",
  });
  const [saving, setSaving] = useState(false);

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
      await api.post("/cars", payload); // espera 201 + objeto criado
      navigate("/cars");
    } catch (e2) {
      alert("Não foi possível criar o veículo. Tente novamente.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        Cadastrar Veículo
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
            required
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
            required
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
            required
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
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition disabled:opacity-60"
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

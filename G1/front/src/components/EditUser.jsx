import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import api from "../api/api.js";

export default function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "", // em branco por segurança; só envia se preenchida
    role: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    setLoading(true);
    api
      .get(`/users/${id}`)
      .then((res) => {
        if (!active) return;
        const user = res.data;
        if (!user || typeof user !== "object" || user.id == null) {
          setError("Usuário não encontrado.");
          return;
        }
        setForm({
          name: user.name ?? "",
          email: user.email ?? "",
          password: "", // nunca preencher
          role: user.role ?? "",
        });
      })
      .catch((e) => {
        setError(
          e?.response?.status === 404
            ? "Usuário não encontrado."
            : "Falha ao carregar o usuário."
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

    if (!form.name || !form.email) {
      alert("Preencha Nome e Email.");
      return;
    }

    setSaving(true);
    try {
      const payload = {
        name: form.name,
        email: form.email,
        role: form.role || undefined, // mantém default do backend se vazio
        ...(form.password ? { password: form.password } : {}),
      };
      await api.put(`/users/${id}`, payload);
      navigate("/users");
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        "Não foi possível salvar as alterações. Tente novamente.";
      alert(msg);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="p-4">Carregando…</p>;
  if (error) {
    return (
      <div className="p-4">
        <p className="text-red-600 mb-4">{error}</p>
        <Link to="/users" className="text-blue-600 underline">
          Voltar para a lista
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        Editar Usuário #{id}
      </h1>

      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm text-gray-700 mb-1">Nome</label>
          <input
            name="name"
            value={form.name}
            onChange={onChange}
            className="w-full border rounded px-3 py-2"
            placeholder="Ex.: Maria Silva"
            autoComplete="name"
            disabled={saving}
          />
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-1">Email</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={onChange}
            className="w-full border rounded px-3 py-2"
            placeholder="exemplo@dominio.com"
            autoComplete="email"
            disabled={saving}
          />
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-1">
            Senha (opcional)
          </label>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={onChange}
            className="w-full border rounded px-3 py-2"
            placeholder="Deixe em branco para manter"
            autoComplete="new-password"
            disabled={saving}
          />
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-1">Role</label>
          <select
            name="role"
            value={form.role}
            onChange={onChange}
            className="w-full border rounded px-3 py-2 bg-white"
            disabled={saving}
          >
            <option value="">Selecione (opcional)</option>
            <option value="user">user</option>
            <option value="admin">admin</option>
          </select>
          {/* Se preferir campo livre, troque o <select> por <input name="role" ... /> */}
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
            to="/users"
            className="px-4 py-2 border rounded hover:bg-gray-50 transition"
          >
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  );
}

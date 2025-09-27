import { useState, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/api.js";

export default function CreateUser() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  const [saving, setSaving] = useState(false);

  const isValid = useMemo(() => {
    // Validação mínima coerente com o backend
    return Boolean(form.name && form.email && form.password);
  }, [form.name, form.email, form.password]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!isValid) {
      alert("Preencha Nome, Email e Senha.");
      return;
    }

    setSaving(true);
    try {
      const payload = {
        name: form.name,
        email: form.email,
        password: form.password,
        // envia role somente se preenchido (backend tem default? se tiver, mantém undefined)
        role: form.role || undefined,
      };

      await api.post("/users", payload); // esperado 201 + usuário criado (sem senha)
      navigate("/users");
    } catch (err) {
      // Tenta exibir a mensagem específica do backend (400/409/etc.)
      const msg =
        err?.response?.data?.message ||
        "Não foi possível criar o usuário. Tente novamente.";
      alert(msg);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Novo Usuário</h1>

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
          <label className="block text-sm text-gray-700 mb-1">Senha</label>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={onChange}
            className="w-full border rounded px-3 py-2"
            placeholder="••••••••"
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
          {/* Caso prefira campo livre:
              <input name="role" value={form.role} onChange={onChange} ... />
          */}
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition disabled:opacity-60"
            disabled={saving || !isValid}
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

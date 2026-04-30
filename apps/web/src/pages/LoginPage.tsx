import { useState } from "react";
import type { FormEvent } from "react";
import { login } from "../api/auth.api";

export function LoginPage() {
  const [email, setEmail] = useState("admin@vpscc.local");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await login(email, password);
      localStorage.setItem("accessToken", data.accessToken);
      window.location.href = "/dashboard";
    } catch {
      setError("Credenciales incorrectas");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-950">
      <div className="card w-full max-w-sm">
        {/* HEADER */}
        <div className="mb-6 text-center">
          <h1 className="text-xl font-semibold">VPS Control Center</h1>
          <p className="text-sm text-gray-400">Acceso al panel</p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          
          <div>
            <label className="text-sm text-gray-400">Email</label>
            <input
              type="email"
              className="input mt-1"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-sm text-gray-400">Password</label>
            <input
              type="password"
              className="input mt-1"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>

          {/* ERROR */}
          {error && (
            <p className="text-red-400 text-sm">{error}</p>
          )}

          {/* BUTTON */}
          <button
            type="submit"
            className="button w-full flex justify-center items-center"
            disabled={loading}
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}
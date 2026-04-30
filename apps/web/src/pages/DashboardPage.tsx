import { useEffect, useState } from "react";
import { getSystemStatus } from "../api/system.api";

/**
 * Normaliza cualquier valor a porcentaje 0–100
 */
function normalizePercent(raw: any): number {
  if (raw === null || raw === undefined) return 0;

  // Si viene como string tipo "39%"
  if (typeof raw === "string") {
    raw = raw.replace("%", "").trim();
  }

  const value = Number(raw);

  if (isNaN(value)) return 0;

  // Si viene como 0.39 → 39
  if (value <= 1) return value * 100;

  return Math.min(value, 100);
}

/**
 * Color semántico
 */
function getUsageColor(value: number) {
  if (value < 60) return "bg-green-500";
  if (value < 80) return "bg-yellow-500";
  return "bg-red-500";
}

export function DashboardPage() {
  const [status, setStatus] = useState<any>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSystemStatus()
      .then((data) => setStatus(data))
      .catch(() => setError("Error cargando el sistema"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="text-gray-400">Cargando datos...</p>;
  }

  if (error) {
    return <p className="text-red-400">{error}</p>;
  }

  // ✅ NORMALIZACIÓN AQUÍ (CLAVE)
  const memoryPercent = normalizePercent(status.memory.usedPercent);
  const diskPercent = normalizePercent(status.disk.usedPercent);

  return (
    <div>
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-xl font-semibold">Dashboard</h1>
        <p className="text-sm text-gray-400">
          Estado general del sistema
        </p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">

        {/* SERVIDOR */}
        <div className="card">
          <p className="text-sm text-gray-400">Servidor</p>
          <p className="text-lg font-semibold mt-2">
            {status.hostname}
          </p>
        </div>

        {/* TIEMPO ACTIVO */}
        <div className="card">
          <p className="text-sm text-gray-400">Tiempo activo</p>
          <p className="text-lg font-semibold mt-2">
            {status.uptime.human}
          </p>
        </div>

        {/* MEMORIA */}
        <div className="card">
          <p className="text-sm text-gray-400">Memoria</p>

          <p className="text-lg font-semibold mt-2">
            {status.memory.used} / {status.memory.total}
          </p>

          <div className="mt-3 h-2 bg-gray-800 rounded">
            <div
              className={`h-2 rounded transition-all duration-300 ${getUsageColor(memoryPercent)}`}
              style={{ width: `${memoryPercent}%` }}
            />
          </div>

          <p className="text-xs text-gray-400 mt-2">
            {memoryPercent.toFixed(1)}% usado
          </p>
        </div>

        {/* DISCO */}
        <div className="card">
          <p className="text-sm text-gray-400">Disco</p>

          <p className="text-lg font-semibold mt-2">
            {status.disk.used} / {status.disk.size}
          </p>

          <div className="mt-3 h-2 bg-gray-800 rounded">
            <div
              className={`h-2 rounded transition-all duration-300 ${getUsageColor(diskPercent)}`}
              style={{ width: `${diskPercent}%` }}
            />
          </div>

          <p className="text-xs text-gray-400 mt-2">
            {diskPercent.toFixed(1)}% usado
          </p>
        </div>

      </div>
    </div>
  );
}
import { useEffect, useState } from "react";
import { getAuditLogs } from "../api/audit.api";

type AuditEntry = {
  action: string;
  service: string | null;
  status: "SUCCESS" | "ERROR";
  message?: string | null;
  createdAt: string;
};

export function AuditPage() {
  const [logs, setLogs] = useState<AuditEntry[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function loadLogs() {
    try {
      setError("");
      setLoading(true);

      const data = await getAuditLogs();
      setLogs(data);
    } catch {
      setError("Error cargando auditoría");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadLogs();
  }, []);

  return (
    <section className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Auditoría</h1>
          <p className="text-sm text-gray-400">
            Registro de acciones del sistema
          </p>
        </div>

        <button
          onClick={loadLogs}
          disabled={loading}
          className="button"
        >
          {loading ? "Cargando..." : "Refrescar"}
        </button>
      </div>

      {/* ERROR */}
      {error && (
        <div className="bg-red-500/10 text-red-400 p-3 rounded">
          {error}
        </div>
      )}

      {/* TABLA */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            
            {/* HEADER */}
            <thead className="bg-gray-800 text-gray-400 text-left">
              <tr>
                <th className="px-4 py-3">Fecha</th>
                <th className="px-4 py-3">Acción</th>
                <th className="px-4 py-3">Servicio</th>
                <th className="px-4 py-3">Estado</th>
                <th className="px-4 py-3">Mensaje</th>
              </tr>
            </thead>

            {/* BODY */}
            <tbody className="divide-y divide-gray-800">
              {logs.map((log, i) => (
                <tr key={i} className="hover:bg-gray-800/50 transition">
                  
                  {/* FECHA */}
                  <td className="px-4 py-3 whitespace-nowrap text-gray-300">
                    {new Date(log.createdAt).toLocaleString()}
                  </td>

                  {/* ACCION */}
                  <td className="px-4 py-3 font-medium text-white">
                    {log.action}
                  </td>

                  {/* SERVICIO */}
                  <td className="px-4 py-3 text-gray-400">
                    {log.service ?? "-"}
                  </td>

                  {/* ESTADO */}
                  <td className="px-4 py-3">
                    <span
                      className={
                        log.status === "SUCCESS"
                          ? "px-2 py-1 text-xs rounded bg-green-500/10 text-green-400"
                          : "px-2 py-1 text-xs rounded bg-red-500/10 text-red-400"
                      }
                    >
                      {log.status}
                    </span>
                  </td>

                  {/* MENSAJE */}
                  <td className="px-4 py-3 text-gray-400 max-w-xs truncate">
                    {log.message ?? "-"}
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* EMPTY */}
        {logs.length === 0 && !loading && (
          <div className="p-6 text-center text-gray-500">
            No hay registros aún
          </div>
        )}
      </div>
    </section>
  );
}
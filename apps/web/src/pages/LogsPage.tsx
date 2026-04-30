import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { getLogs } from "../api/docker.api";

export function LogsPage() {
  const { service } = useParams();
  const [logs, setLogs] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [autoScroll, setAutoScroll] = useState(true);

  const logRef = useRef<HTMLDivElement>(null);

  async function loadLogs() {
    if (!service) return;

    try {
      const data = await getLogs(service);

      // ✅ FIX CLAVE
      setLogs(data.logs);

    } catch {
      setError("Error cargando logs");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadLogs();
  }, [service]);

  useEffect(() => {
    if (autoScroll && logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [logs, autoScroll]);

  if (loading) {
    return <p className="text-gray-400">Cargando logs...</p>;
  }

  if (error) {
    return <p className="text-red-400">{error}</p>;
  }

  return (
    <div>
      {/* HEADER */}
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-semibold">Logs</h1>
          <p className="text-sm text-gray-400">
            Servicio: {service}
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={loadLogs}
            className="button button-secondary"
          >
            Refrescar
          </button>

          <button
            onClick={() => setAutoScroll(!autoScroll)}
            className="button button-secondary"
          >
            {autoScroll ? "AutoScroll ON" : "AutoScroll OFF"}
          </button>
        </div>
      </div>

      {/* LOGS */}
      <div
        ref={logRef}
        className="card h-[500px] overflow-auto bg-black text-green-400 font-mono text-xs whitespace-pre-wrap"
      >
        {logs || "No logs disponibles"}
      </div>
    </div>
  );
}
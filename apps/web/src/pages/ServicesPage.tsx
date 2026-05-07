import { useEffect, useState } from "react";
import { getServices, restartService } from "../api/docker.api";
import { Link } from "react-router-dom";
import { Modal } from "../components/ui/Modal";
import { useToast } from "../hooks/useToast";

type ManagedService = {
  alias: string;
  container: string;
  status: "running" | "stopped";
};

export function ServicesPage() {
  const [services, setServices] = useState<ManagedService[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [restarting, setRestarting] = useState(false);

  const { showToast } = useToast();

  async function loadServices() {
    try {
      setError("");

      const data = await getServices();

      setServices(data);
    } catch {
      setError("Error cargando servicios");

      showToast("Failed to load services", "error");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadServices();
  }, []);

  async function confirmRestart() {
    if (!selectedService) return;

    const serviceName = selectedService;

    setRestarting(true);

    try {
      await restartService(serviceName);

      await loadServices();

      setSelectedService(null);

      showToast(
        `${serviceName} restarted successfully`,
        "success"
      );
    } catch {
      showToast(
        `Failed to restart ${serviceName}`,
        "error"
      );
    } finally {
      setRestarting(false);
    }
  }

  if (loading) {
    return (
      <p className="text-gray-400">
        Cargando servicios...
      </p>
    );
  }

  if (error) {
    return (
      <p className="text-red-400">
        {error}
      </p>
    );
  }

  return (
    <div>
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-xl font-semibold">
          Servicios
        </h1>

        <p className="text-sm text-gray-400">
          Gestión de contenedores Docker
        </p>
      </div>

      {/* LISTA */}
      <div className="grid gap-4">
        {services.map((service) => {
          const isRunning =
            service.status === "running";

          const isCurrentRestarting =
            restarting &&
            selectedService === service.alias;

          return (
            <div
              key={service.alias}
              className="
                card
                flex
                items-center
                justify-between
              "
            >
              {/* INFO */}
              <div>
                <p className="text-lg font-semibold">
                  {service.alias}
                </p>

                <p className="text-xs text-gray-500">
                  {service.container}
                </p>

                <span
                  className={`badge mt-2 ${
                    isRunning
                      ? "badge-green"
                      : "badge-red"
                  }`}
                >
                  {isRunning
                    ? "Running"
                    : "Stopped"}
                </span>
              </div>

              {/* ACTIONS */}
              <div className="flex items-center gap-3">
                <Link
                  to={`/logs/${service.alias}`}
                  className="
                    text-sm
                    text-blue-400
                    hover:underline
                  "
                >
                  Logs
                </Link>

                <button
                  onClick={() =>
                    setSelectedService(
                      service.alias
                    )
                  }
                  disabled={restarting}
                  className={`button ${
                    isRunning
                      ? "button-danger"
                      : "button-secondary"
                  } ${
                    restarting
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  {isCurrentRestarting
                    ? "Reiniciando..."
                    : "Reiniciar"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* MODAL */}
      <Modal
        isOpen={!!selectedService}
        title="Confirmar reinicio"
        onCancel={() =>
          !restarting &&
          setSelectedService(null)
        }
        onConfirm={confirmRestart}
        loading={restarting}
        confirmText="Reiniciar"
      >
        ¿Seguro que quieres reiniciar el servicio{" "}
        <strong>{selectedService}</strong>?
      </Modal>
    </div>
  );
}
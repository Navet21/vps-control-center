import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getServices, restartService } from '../api/docker.api';

type ManagedService = {
  alias: string;
  container: string;
  status: 'running' | 'stopped';
};

export function ServicesPage() {
  const [services, setServices] = useState<ManagedService[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function loadServices() {
    try {
      setLoading(true);
      const data = await getServices();
      setServices(data);
    } catch {
      setError('Error loading services');
    } finally {
      setLoading(false);
    }
  }

  async function handleRestart(alias: string) {
    const confirmed = window.confirm(`Restart ${alias}?`);

    if (!confirmed) return;

    try {
      await restartService(alias);
      await loadServices();
    } catch {
      alert('Error restarting service');
    }
  }

  useEffect(() => {
    loadServices();
  }, []);

  if (error) return <p>{error}</p>;

  return (
    <section>
      <h2>Services</h2>

      <button onClick={loadServices} disabled={loading}>
        {loading ? 'Loading...' : 'Refresh'}
      </button>

      <table
        style={{
          width: '100%',
          marginTop: '16px',
          borderCollapse: 'collapse',
        }}
      >
        <thead>
          <tr>
            <th>Alias</th>
            <th>Container</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {services.map((service) => (
            <tr key={service.alias}>
              <td>{service.alias}</td>

              <td>{service.container}</td>

              <td>
                <span
                  style={{
                    color:
                      service.status === 'running' ? 'green' : 'red',
                    fontWeight: 'bold',
                  }}
                >
                  {service.status}
                </span>
              </td>

              <td>
                <Link to={`/logs/${service.alias}`}>Logs</Link>

                {' '}

                <button
                  onClick={() => handleRestart(service.alias)}
                  style={{ marginLeft: '8px' }}
                >
                  Restart
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {services.length === 0 && !loading && (
        <p style={{ marginTop: '16px' }}>No services found</p>
      )}
    </section>
  );
}
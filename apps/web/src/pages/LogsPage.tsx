import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getLogs } from '../api/docker.api';

export function LogsPage() {
  const { service } = useParams();
  const [logs, setLogs] = useState('');
  const [error, setError] = useState('');

  async function loadLogs() {
    if (!service) return;

    try {
      const data = await getLogs(service);
      setLogs(data.logs);
    } catch {
      setError('Error loading logs');
    }
  }

  useEffect(() => {
    loadLogs();
  }, [service]);

  return (
    <section>
      <h2>Logs: {service}</h2>

      <button onClick={loadLogs}>Refresh logs</button>

      {error && <p>{error}</p>}

      <pre
        style={{
          marginTop: '16px',
          padding: '16px',
          background: '#111',
          color: '#eee',
          borderRadius: '8px',
          overflowX: 'auto',
          maxHeight: '600px',
        }}
      >
        {logs || 'No logs'}
      </pre>
    </section>
  );
}
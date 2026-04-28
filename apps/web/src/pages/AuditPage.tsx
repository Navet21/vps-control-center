import { useEffect, useState } from 'react';
import { getAuditLogs } from '../api/audit.api';

type AuditEntry = {
  action: string;
  service: string;
  success: boolean;
  timestamp: string;
};

export function AuditPage() {
  const [logs, setLogs] = useState<AuditEntry[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function loadLogs() {
    try {
      setLoading(true);
      const data = await getAuditLogs();
      setLogs(data);
    } catch {
      setError('Error loading audit logs');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadLogs();
  }, []);

  if (error) return <p>{error}</p>;

  return (
    <section>
      <h2>Audit Log</h2>

      <button onClick={loadLogs} disabled={loading}>
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
            <th>Time</th>
            <th>Action</th>
            <th>Service</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {logs.map((log, index) => (
            <tr key={index}>
              <td>{new Date(log.timestamp).toLocaleString()}</td>

              <td>{log.action}</td>

              <td>{log.service}</td>

              <td>
                <span
                  style={{
                    color: log.success ? 'green' : 'red',
                    fontWeight: 'bold',
                  }}
                >
                  {log.success ? 'success' : 'error'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {logs.length === 0 && !loading && (
        <p style={{ marginTop: '16px' }}>No audit logs yet</p>
      )}
    </section>
  );
}
import { useEffect, useState } from 'react';
import { getSystemStatus } from '../api/system.api';

export function DashboardPage() {
  const [status, setStatus] = useState<any>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    getSystemStatus()
      .then(setStatus)
      .catch(() => setError('Error loading system status'));
  }, []);

  if (error) return <p>{error}</p>;
  if (!status) return <p>Loading...</p>;

  return (
    <section>
      <h2>Dashboard</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
        <div>
          <strong>Hostname</strong>
          <p>{status.hostname}</p>
        </div>

        <div>
          <strong>Uptime</strong>
          <p>{status.uptime.human}</p>
        </div>

        <div>
          <strong>Memory</strong>
          <p>{status.memory.used} / {status.memory.total}</p>
          <p>{status.memory.usedPercent}% used</p>
        </div>

        <div>
          <strong>Disk</strong>
          <p>{status.disk.used} / {status.disk.size}</p>
          <p>{status.disk.usedPercent} used</p>
        </div>
      </div>
    </section>
  );
}
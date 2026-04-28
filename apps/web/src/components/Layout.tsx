import { Link, Outlet } from 'react-router-dom';

export function Layout() {
  return (
    <div style={{ minHeight: '100vh', fontFamily: 'Arial, sans-serif' }}>
      <header style={{ padding: '16px 24px', borderBottom: '1px solid #ddd' }}>
        <h1>VPS Control Center</h1>

        <nav style={{ display: 'flex', gap: '16px' }}>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/services">Services</Link>
          <Link to="/audit">Audit</Link>
        </nav>
      </header>

      <main style={{ padding: '24px' }}>
        <Outlet />
      </main>
    </div>
  );
}
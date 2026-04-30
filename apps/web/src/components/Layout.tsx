import { Outlet, Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { LayoutDashboard, Server, FileText, Menu } from "lucide-react";
import "../styles/layout.css";

export default function Layout() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const linkClass = (path: string) =>
    location.pathname.startsWith(path)
      ? "sidebar-link sidebar-link-active"
      : "sidebar-link";

  const logout = () => {
    localStorage.removeItem("accessToken");
    window.location.href = "/login";
  };

  return (
    <div className="bg-gray-950">

      {/* OVERLAY (MÓVIL) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed top-0 left-0 h-screen w-64 bg-gray-900 border-r border-gray-800
          transform transition-transform z-50
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <div className="flex flex-col h-full">

          {/* HEADER */}
          <div className="p-4 border-b border-gray-800">
            <h1 className="text-lg font-semibold">VPS Control</h1>
          </div>

          {/* NAV */}
          <nav className="flex flex-col gap-1 px-2 mt-2 overflow-y-auto">
            <Link
              to="/dashboard"
              onClick={() => setIsOpen(false)}
              className={linkClass("/dashboard")}
            >
              <div className="flex items-center gap-2">
                <LayoutDashboard size={18} />
                Dashboard
              </div>
            </Link>

            <Link
              to="/services"
              onClick={() => setIsOpen(false)}
              className={linkClass("/services")}
            >
              <div className="flex items-center gap-2">
                <Server size={18} />
                Services
              </div>
            </Link>

            <Link
              to="/audit"
              onClick={() => setIsOpen(false)}
              className={linkClass("/audit")}
            >
              <div className="flex items-center gap-2">
                <FileText size={18} />
                Audit
              </div>
            </Link>
          </nav>

          {/* FOOTER */}
          <div className="mt-auto p-4 border-t border-gray-800">
            <button onClick={logout} className="button w-full">
              Logout
            </button>
          </div>

        </div>
      </aside>

      {/* CONTENIDO */}
      <div className="md:ml-64 min-h-screen flex flex-col">

        {/* TOPBAR (solo móvil) */}
        <div className="md:hidden flex items-center p-4 border-b border-gray-800">
          <button
            onClick={() => setIsOpen(true)}
            className="p-2 text-gray-300"
          >
            <Menu size={20} />
          </button>

          <span className="ml-3 font-semibold">VPS Control</span>
        </div>

        {/* MAIN */}
        <main className="flex-1 p-6 w-full">
          <Outlet />
        </main>

      </div>
    </div>
  );
}
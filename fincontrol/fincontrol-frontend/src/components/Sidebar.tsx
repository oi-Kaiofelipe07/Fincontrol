import React from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, List } from "lucide-react";

const Sidebar: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const navLinks = [
    { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/transacoes", label: "Transações", icon: List },
  ];

  return (
    <aside className="w-64 min-h-screen bg-white shadow-md flex flex-col justify-between">
      {/* Logo e Navegação */}
      <div>
        <div className="p-6 text-2xl font-bold text-indigo-600">FinControl</div>
        <nav className="px-4">
          <ul className="space-y-2">
            {navLinks.map(({ to, label, icon: Icon }) => (
              <li key={to}>
                <Link
                  to={to}
                  className={`flex items-center p-2 rounded text-sm font-medium transition-colors ${
                    currentPath === to
                      ? "bg-indigo-100 text-indigo-600"
                      : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                  }`}
                >
                  <Icon className="w-5 h-5 mr-2" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;

import React from "react";
import { Link } from "react-router-dom";
import { LogOut, LayoutDashboard, List, Tag, User } from "lucide-react";

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-white shadow-md h-full flex flex-col justify-between">
      {/* Logo + Navegação */}
      <div>
        <div className="p-6 text-xl font-bold text-indigo-600">FinControl</div>
        <nav className="px-4">
          <ul className="space-y-2">
            <li>
              <Link
                to="/dashboard"
                className="flex items-center p-2 rounded hover:bg-indigo-100 text-gray-700"
              >
                <LayoutDashboard className="w-5 h-5 mr-2" />
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/transacoes"
                className="flex items-center p-2 rounded hover:bg-indigo-100 text-gray-700"
              >
                <List className="w-5 h-5 mr-2" />
                Transações
              </Link>
            </li>
            <li>
              <Link
                to="/categorias"
                className="flex items-center p-2 rounded hover:bg-indigo-100 text-gray-700"
              >
                <Tag className="w-5 h-5 mr-2" />
                Categorias
              </Link>
            </li>
            <li>
              <Link
                to="/perfil"
                className="flex items-center p-2 rounded hover:bg-indigo-100 text-gray-700"
              >
                <User className="w-5 h-5 mr-2" />
                Perfil
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Sair */}
      <div className="p-4 border-t">
        <button
        onClick={() => {
          localStorage.removeItem('accessToken')
          localStorage.removeItem('refreshToken')
          window.location.href = '/login'
        }}
        className="flex items-center text-red-500 hover:text-red-600"
      >
        <LogOut className="w-5 h-5 mr-2" />
        Sair
      </button>
      </div>
    </aside>
  );
};

export default Sidebar;

import React from "react";
import { useAuth } from "../contexts/useAuth";

const Header: React.FC = () => {
  const { logout } = useAuth();

  return (
    <header className="bg-blue-600 text-white p-4 shadow-md flex justify-between items-center">
      <h1 className="text-xl font-bold">FinControl</h1>
      <button
        onClick={logout}
        className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100"
      >
        Sair
      </button>
    </header>
  );
};

export default Header;

import React from "react";
import UserMenu from "./UserMenu";

const Header: React.FC = () => {
  return (
    <header className="bg-blue-600 text-white p-4 shadow-md flex justify-between items-center">
      <h1 className="text-xl font-bold">FinControl</h1>
      <UserMenu />
    </header>
  );
};

export default Header;

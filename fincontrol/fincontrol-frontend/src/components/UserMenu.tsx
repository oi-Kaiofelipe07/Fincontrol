import { jwtDecode } from "jwt-decode";
import { useAuth } from "../contexts/useAuth";

interface JwtPayload {
  email: string;
  exp: number;
  user_id: number;
}

const UserMenu = () => {
  const { logout } = useAuth();
  const token = localStorage.getItem("accessToken");
  let email = "";

  if (token) {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      email = decoded.email;
    } catch (err) {
      console.error("Erro ao decodificar token:", err);
    }
  }

  return (
    <div className="flex items-center gap-4">
      <span>{email}</span>
      <button
        onClick={logout}
        className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-100"
      >
        Sair
      </button>
    </div>
  );
};

export default UserMenu;

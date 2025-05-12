import { useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../contexts/useAuth";

const Login = () => {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        const response = await axios.post("http://localhost:8000/api/token/", {
        username: email,
        password: senha,
    });
        const { access, refresh } = response.data;
        localStorage.setItem("accessToken", access);
        localStorage.setItem("refreshToken", refresh);
        alert("Login bem-sucedido!");
        login(access, refresh);
        navigate('/dashboard');

    } catch  {
        alert("Erro ao fazer login. Verifique suas credenciais.");
    }
    };

    return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded shadow-md w-full max-w-sm"
        >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
            required
        />
        <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
            required
        />
        <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
            Entrar
        </button>
        <p className="mt-4 text-center">
            Não tem uma conta?{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
            Cadastre-se
            </Link>
        </p>
        </form>
    </div>
);
};

export default Login;

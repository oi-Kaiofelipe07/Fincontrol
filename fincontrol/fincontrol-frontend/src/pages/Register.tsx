import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [erro, setErro] = useState('');
    const [success, setSuccess] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const irParaLogin = () => {
      navigate('/login');
    };

    const handleRegister = async (e: React.FormEvent) => {
      e.preventDefault();
      setErro('');
      setSuccess('');

      if (username === '' || password === '') {
        setErro('Preencha todos os campos.');
        return;
      }
      if (password.length < 8) {
        setErro('A senha deve ter pelo menos 8 caracteres.');
        return;
      }

      try {
        await axios.post('https://fincontrol-sevd.onrender.com/api/register/', {
          username,
          password,
        });

        setSuccess('Usuário registrado com sucesso!');
        setUsername('');
        setPassword('');
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          const errorData = err.response?.data;

          if (typeof errorData === 'string') {
            setErro(errorData);
          } else if (typeof errorData === 'object' && errorData !== null) {
            const mensagens = Object.values(errorData).flat().join(' ');
            setErro(mensagens);
          } else {
            setErro('Erro ao registrar.');
          }
        } else {
          setErro('Erro inesperado.');
        }
      }
    };

    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <form onSubmit={handleRegister} className="bg-white p-8 rounded shadow-md w-full max-w-sm">
          <h2 className="text-2xl font-bold mb-6 text-center">Cadastro</h2>

          {erro && <p className="text-red-500 text-sm mb-4">{erro}</p>}
          {success && <p className="text-green-500 text-sm mb-4">{success}</p>}

          <input
            type="text"
            placeholder="Email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 mb-4 border rounded"
            required
          />

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 mb-2 border rounded"
            required
          />

          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="showPassword"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
              className="mr-2"
            />
            <label htmlFor="showPassword" className="text-sm">Mostrar senha</label>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          >
            Cadastrar
          </button>

          <p className="mt-4 text-center">
            Já tem uma conta?{' '}
            <Link to="/login" className="text-blue-500 hover:underline" onClick={irParaLogin}>
              Faça login
            </Link>
          </p>
        </form>
      </div>
    );
};

export default Register;

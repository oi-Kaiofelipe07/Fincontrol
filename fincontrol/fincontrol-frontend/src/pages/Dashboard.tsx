import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../contexts/useAuth";
import ResumoCards from "../components/ResumoCards";
import GraficoTransacoes from "../components/GraficoTransacoes";

type Transacao = {
  id: number;
  valor: number;
  tipo: "entrada" | "saida";
  created_at: string;
};

const Dashboard: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);

  const carregarTransacoes = useCallback(async () => {
    const token = localStorage.getItem("accessToken");
    try {
      const response = await axios.get("http://localhost:8000/api/transacoes/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Transações recebidas:", response.data);
      setTransacoes(response.data);
    } catch (error) {
      console.error("Erro ao carregar transações no Dashboard:", error);
    }
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      carregarTransacoes();
    }
  }, [isAuthenticated, navigate, carregarTransacoes]);

  return (
    <main className="flex-1 p-6 overflow-auto bg-gray-100">
      <ResumoCards />
      <GraficoTransacoes transacoes={transacoes} />
    </main>
  );
};

export default Dashboard;

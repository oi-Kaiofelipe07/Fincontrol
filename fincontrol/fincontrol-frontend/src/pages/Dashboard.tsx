import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../contexts/useAuth";
import ResumoCards from "../components/ResumoCards";
import GraficoTransacoes from "../components/GraficoTransacoes";
import GraficoResumo from "../components/GraficoResumo";
import ListaTransacoes from "../components/ListaTransacoes";
import type { Transacao } from "../types/Transacao";

type ResumoFinanceiro = {
  entradas: number;
  saidas: number;
  saldo: number;
};

const Dashboard: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  const [resumo, setResumo] = useState<ResumoFinanceiro>({
    entradas: 0,
    saidas: 0,
    saldo: 0,
  });

  const token = localStorage.getItem("accessToken");

  const carregarTransacoes = useCallback(async () => {
    try {
      const response = await axios.get("https://fincontrol-sevd.onrender.com/api/transacoes/?ordering=-created_at", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const dados = response.data.results || response.data;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const transacoesFormatadas: Transacao[] = dados.map((t: any) => ({
        id: t.id,
        valor: Number(t.valor),
        tipo: t.tipo,
        descricao: t.descricao ?? "",
        data: t.data ?? t.created_at ?? "",
        created_at: t.created_at ?? t.data ?? "",
      }));

      setTransacoes(transacoesFormatadas);
    } catch (error) {
      console.error("Erro ao carregar transações:", error);
    }
  }, [token]);

  const carregarResumo = useCallback(async () => {
    try {
      const response = await axios.get("https://fincontrol-sevd.onrender.com/api/resumo/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setResumo(response.data);
    } catch (error) {
      console.error("Erro ao carregar resumo financeiro:", error);
    }
  }, [token]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      carregarTransacoes();
      carregarResumo();
    }
  }, [isAuthenticated, navigate, carregarTransacoes, carregarResumo]);

  return (
    <main className="flex-1 p-6 overflow-auto bg-gray-100">
      <ResumoCards resumo={resumo} />
      <GraficoResumo resumo={resumo} />
      <h2 className="text-2xl font-bold my-4">Transações Recentes</h2>
      <GraficoTransacoes transacoes={transacoes} />
      <ListaTransacoes transacoes={transacoes} />
    </main>
  );
};

export default Dashboard;

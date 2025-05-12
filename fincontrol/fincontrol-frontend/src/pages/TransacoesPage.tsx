import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import NovaTransacaoForm from "../components/NovaTransacaoForm";
import GraficoTransacoes from "../components/GraficoTransacoes"; // importa o gráfico também

type Transacao = {
  id: number;
  valor: number;
  tipo: "entrada" | "saida";
  descricao: string;
  categoria: string;
  data: string;
  created_at: string; // novo campo necessário pro gráfico
};

const TransacoesPage = () => {
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  const token = localStorage.getItem("accessToken");

  const carregarTransacoes = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/transacoes/", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = response.data.results || response.data; // suporta paginação
      setTransacoes(data);
    } catch (error) {
      console.error("Erro ao carregar transações:", error);
    }
  }, [token]);

  useEffect(() => {
    carregarTransacoes();
  }, [carregarTransacoes]);

  return (
    <main className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Transações</h2>
      <NovaTransacaoForm onNovaTransacao={carregarTransacoes} />

      {transacoes.length === 0 ? (
        <p className="text-gray-500 mt-6">Nenhuma transação cadastrada ainda.</p>
      ) : (
        <>
          <GraficoTransacoes transacoes={transacoes} />
          <div className="mt-6 space-y-4">
            {transacoes.map((transacao) => (
              <div
                key={transacao.id}
                className={`p-4 rounded shadow ${
                  transacao.tipo === "entrada" ? "bg-green-100" : "bg-red-100"
                }`}
              >
                <p className="font-semibold">
                  {transacao.tipo === "entrada" ? "+" : "-"} R${" "}
                  {transacao.valor.toFixed(2)}
                </p>
                <p>{transacao.descricao}</p>
                <p className="text-sm text-gray-600">{transacao.categoria}</p>
                <p className="text-sm text-gray-500">
                  {new Date(transacao.data).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </main>
  );
};

export default TransacoesPage;

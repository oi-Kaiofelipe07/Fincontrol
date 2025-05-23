import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import NovaTransacaoForm from "../components/NovaTransacaoForm";
import GraficoTransacoes from "../components/GraficoTransacoes";

type Transacao = {
  id: number;
  valor: number;
  tipo: "entrada" | "saida";
  descricao: string;
  data: string;
  created_at: string;
};

const TransacoesPage = () => {
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  const [mostrarTodas, setMostrarTodas] = useState(false);
  const [todasTransacoes, setTodasTransacoes] = useState<Transacao[]>([]);
  const token = localStorage.getItem("accessToken");

  const carregarTransacoes = useCallback(async () => {
    try {
      const response = await axios.get(
        "https://fincontrol-sevd.onrender.com/api/transacoes/?ordering=-created_at",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

    const data = response.data.results || response.data;

    setTodasTransacoes(data);
    setTransacoes(data.slice(0, 5));
    } catch (error) {
      console.error("Erro ao carregar transações:", error);
    }
  }, [token]);

  useEffect(() => {
    carregarTransacoes();
  }, [carregarTransacoes]);

  const handleVerMais = () => {
    setTransacoes(todasTransacoes);
    setMostrarTodas(true);
  };

  return (
    <main className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Últimas Transações</h2>

      <NovaTransacaoForm onNovaTransacao={carregarTransacoes} />

      {transacoes.length === 0 ? (
        <p className="text-gray-500 mt-6">
          Nenhuma transação cadastrada ainda.
        </p>
      ) : (
        <>
          <GraficoTransacoes transacoes={todasTransacoes} />
          <div className="mt-6 space-y-4">
            {transacoes.map((transacao) => (
              <div
                key={transacao.id}
                className={`p-4 rounded shadow ${
                  transacao.tipo === "entrada"
                    ? "bg-green-100"
                    : "bg-red-100"
                }`}
              >
                <p className="font-semibold">
                  {transacao.tipo === "entrada" ? "+" : "-"} R${" "}
                  {Number(transacao.valor).toFixed(2)}
                </p>
                <p>{transacao.descricao}</p>
                <p className="text-sm text-gray-500">
                  {new Date(transacao.data).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>

          {!mostrarTodas && transacoes.length >= 5 && (
            <div className="mt-4 text-center">
              <button
                onClick={handleVerMais}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Ver mais
              </button>
            </div>
          )}
        </>
      )}
    </main>
  );
};

export default TransacoesPage;

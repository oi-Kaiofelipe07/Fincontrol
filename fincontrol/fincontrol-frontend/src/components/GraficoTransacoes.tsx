import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useMemo } from "react";
import type { Transacao } from "../types/Transacao"; // ✅ Import global

type Props = {
  transacoes: Transacao[];
};

const GraficoTransacoes = ({ transacoes }: Props) => {
const dadosAgrupados = useMemo(() => {
  if (!Array.isArray(transacoes) || transacoes.length === 0) return [];

  const agrupado: { [mes: string]: { entrada: number; saida: number } } = {};

  transacoes.forEach((t) => {
    const data = new Date(t.data);
    const mes = `${data.getFullYear()}-${String(data.getMonth() + 1).padStart(2, "0")}`;

    if (!agrupado[mes]) {
      agrupado[mes] = { entrada: 0, saida: 0 };
    }

    agrupado[mes][t.tipo] += Number(t.valor) || 0;
  });

  return Object.entries(agrupado)
    .map(([mes, valores]) => ({
      mes,
      entrada: valores.entrada,
      saida: valores.saida,
    }))
    .sort((a, b) => a.mes.localeCompare(b.mes));
}, [transacoes]);


  const formatCurrency = (value: number) =>
    value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  if (!dadosAgrupados.length) {
    return (
      <div className="bg-white p-4 rounded shadow-md mt-6 text-center text-gray-500">
        Nenhuma transação disponível para exibir o gráfico.
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded shadow-md mt-6">
      <h3 className="text-lg font-bold mb-4">Gráfico de Transações por Mês</h3>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={dadosAgrupados}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="mes" />
          <YAxis
            domain={[0, "auto"]}
            tickFormatter={(value) => formatCurrency(Number(value))}
          />
          <Tooltip formatter={(value: number) => formatCurrency(value)} />
          <Legend />
          <Bar dataKey="entrada" fill="#22c55e" name="Entradas" />
          <Bar dataKey="saida" fill="#ef4444" name="Saídas" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GraficoTransacoes;

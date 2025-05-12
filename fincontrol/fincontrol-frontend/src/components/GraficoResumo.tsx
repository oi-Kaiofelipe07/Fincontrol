import { useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";

type Transacao = {
  id: number;
  valor: number;
  tipo: "entrada" | "saida";
};

const GraficoResumo = () => {
  const [dados, setDados] = useState<{ entrada: number; saida: number }>({ entrada: 0, saida: 0 });

  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    if (!token) return;

    axios
      .get("http://localhost:8000/api/transacoes/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const entradas = res.data
          .filter((t: Transacao) => t.tipo === "entrada")
          .reduce((acc: number, t: Transacao) => acc + t.valor, 0);
        const saidas = res.data
          .filter((t: Transacao) => t.tipo === "saida")
          .reduce((acc: number, t: Transacao) => acc + t.valor, 0);

        setDados({ entrada: entradas, saida: saidas });
      })
      .catch((err) => console.error("Erro ao carregar dados para gráfico", err));
  }, [token]);

  const data = [
    { name: "Entradas", valor: dados.entrada },
    { name: "Saídas", valor: dados.saida },
  ];

  return (
    <div className="bg-white rounded shadow p-4 mt-6">
      <h3 className="text-lg font-bold mb-4">Resumo de Transações</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="valor" fill="#4F46E5" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GraficoResumo;

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

type ResumoFinanceiro = {
  entradas: number;
  saidas: number;
  saldo: number;
};

type Props = {
  resumo: ResumoFinanceiro;
};

const GraficoResumo: React.FC<Props> = ({ resumo }) => {
  const data = [
    { name: "Entradas", value: resumo.entradas },
    { name: "Saídas", value: resumo.saidas },
    { name: "Saldo", value: resumo.saldo },
  ];

  const COLORS = ["#16a34a", "#dc2626", "#4F46E5"];

  const formatCurrency = (value: number) =>
    value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  return (
    <div className="bg-white rounded shadow p-4 mt-6">
      <h3 className="text-lg font-bold mb-4">Resumo de Transações</h3>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={120}
            fill="#8884d8"
            label={({ name, value }) => `${name}: ${formatCurrency(value)}`}
          >
            {data.map((_entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value: number) => formatCurrency(value)} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GraficoResumo;

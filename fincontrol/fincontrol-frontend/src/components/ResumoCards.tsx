type ResumoFinanceiro = {
  entradas: number;
  saidas: number;
  saldo: number;
};

type Props = {
  resumo: ResumoFinanceiro;
};

const ResumoCards: React.FC<Props> = ({ resumo }) => {
  const { entradas, saidas, saldo } = resumo;

  const formatCurrency = (valor: number) =>
    valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-green-100 p-4 rounded shadow">
        <h3 className="text-lg font-semibold text-green-800">Entradas</h3>
        <p className="text-xl font-bold">{formatCurrency(entradas)}</p>
      </div>
      <div className="bg-red-100 p-4 rounded shadow">
        <h3 className="text-lg font-semibold text-red-800">Saídas</h3>
        <p className="text-xl font-bold">{formatCurrency(saidas)}</p>
      </div>
      <div className="bg-blue-100 p-4 rounded shadow">
        <h3 className="text-lg font-semibold text-blue-800">Saldo</h3>
        <p className="text-xl font-bold">{formatCurrency(saldo)}</p>
      </div>
    </div>
  );
};

export default ResumoCards;

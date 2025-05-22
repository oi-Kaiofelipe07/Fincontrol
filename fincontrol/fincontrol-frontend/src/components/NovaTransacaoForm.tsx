import { useState } from "react";
import axios from "axios";

type Props = {
  onNovaTransacao?: () => void;
};

const formatarParaReal = (valor: string) => {
  const somenteNumeros = valor.replace(/\D/g, "");
  const numero = parseFloat(somenteNumeros) / 100;

  if (isNaN(numero)) return "R$ 0,00";

  return numero.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });
};

const desformatarValor = (valorFormatado: string) => {
  return parseFloat(valorFormatado.replace(/\D/g, "")) / 100;
};

const NovaTransacaoForm: React.FC<Props> = ({ onNovaTransacao }) => {
  const [valor, setValor] = useState("R$ 0,00");
  const [tipo, setTipo] = useState("entrada");
  const [descricao, setDescricao] = useState("");
  const [data, setData] = useState(() => new Date().toISOString().split("T")[0]);

  const token = localStorage.getItem("accessToken");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:8000/api/transacoes/",
        {
          valor: desformatarValor(valor),
          tipo,
          descricao,
          data,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Transação cadastrada com sucesso!");
      setValor("R$ 0,00");
      setDescricao("");
      setData(new Date().toISOString().split("T")[0]);

      if (onNovaTransacao) onNovaTransacao();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
  if (err.response) {
    console.error("Erro ao cadastrar transação:", err.response.data);
    alert("Erro ao cadastrar transação: " + JSON.stringify(err.response.data));
  } else {
    console.error(err);
    alert("Erro desconhecido ao cadastrar transação.");
  }
}


  };

  const handleValorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const entrada = e.target.value;
    setValor(formatarParaReal(entrada));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded shadow-md max-w-md"
    >
      <h2 className="text-xl font-bold mb-4">Nova Transação</h2>

      <input
        type="text"
        placeholder="R$ 0,00"
        value={valor}
        onChange={handleValorChange}
        className="w-full p-2 mb-4 border rounded"
        required
      />

      <select
        value={tipo}
        onChange={(e) => setTipo(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      >
        <option value="entrada">Entrada</option>
        <option value="saida">Saída</option>
      </select>

      <input
        type="text"
        placeholder="Descrição"
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
        required
      />

      <input
        type="date"
        value={data}
        onChange={(e) => setData(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
        required
      />

      <button
        type="submit"
        className="bg-blue-600 text-white p-2 rounded w-full"
      >
        Cadastrar Transação
      </button>
    </form>
  );
};

export default NovaTransacaoForm;

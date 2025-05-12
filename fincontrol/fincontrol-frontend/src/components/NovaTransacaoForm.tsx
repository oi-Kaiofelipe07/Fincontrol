import { useState, useEffect } from "react";
import axios from "axios";

type Categoria = {
  id: number;
  nome: string;
};

type Props = {
  onNovaTransacao?: () => void;
};

// Função para formatar como R$
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

// Função para converter R$ para número decimal
const desformatarValor = (valorFormatado: string) => {
  return parseFloat(valorFormatado.replace(/\D/g, "")) / 100;
};

const NovaTransacaoForm: React.FC<Props> = ({ onNovaTransacao }) => {
  const [valor, setValor] = useState("R$ 0,00");
  const [tipo, setTipo] = useState("entrada");
  const [descricao, setDescricao] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    if (!token) return;
    axios
      .get("http://localhost:8000/api/categorias/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const data = res.data.results || res.data; // Suporte a paginação DRF
        setCategorias(data);
      })
      .catch((err) => console.error("Erro ao carregar categorias", err));
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:8000/api/transacoes/",
        {
          valor: desformatarValor(valor),
          tipo,
          descricao,
          categoria: categoriaId,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Transação cadastrada com sucesso!");
      setValor("R$ 0,00");
      setDescricao("");
      setCategoriaId("");

      if (onNovaTransacao) onNovaTransacao();
    } catch (err) {
      alert("Erro ao cadastrar transação.");
      console.error(err);
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
      />

      <select
        value={categoriaId}
        onChange={(e) => setCategoriaId(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
        required
      >
        <option value="">Selecione uma categoria</option>
        {categorias.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.nome}
          </option>
        ))}
      </select>

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

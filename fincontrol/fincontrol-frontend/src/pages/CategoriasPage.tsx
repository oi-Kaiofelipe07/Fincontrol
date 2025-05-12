import { useEffect, useState } from "react";
import { useCallback } from "react";
import axios from "axios";

type Categoria = {
  id: number;
  nome: string;
};

const CategoriasPage = () => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [novaCategoria, setNovaCategoria] = useState("");
  const token = localStorage.getItem("accessToken");


const carregarCategorias = useCallback(() => {
  axios
    .get("http://localhost:8000/api/categorias/", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      const data = res.data.results || res.data;
      setCategorias(data);
    })
    .catch((err) => console.error("Erro ao buscar categorias", err));
}, [token]);

  const adicionarCategoria = (e: React.FormEvent) => {
    e.preventDefault();

    if (!novaCategoria.trim()) return;

    axios
      .post(
        "http://localhost:8000/api/categorias/",
        { nome: novaCategoria },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => {
        setNovaCategoria("");
        carregarCategorias();
      })
      .catch((err) => console.error("Erro ao adicionar categoria", err));
  };

  const deletarCategoria = (id: number) => {
    axios
      .delete(`http://localhost:8000/api/categorias/${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => carregarCategorias())
      .catch((err) => console.error("Erro ao deletar categoria", err));
  };

  useEffect(() => {
    carregarCategorias();
  }, [carregarCategorias]);

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow-md mt-6">
      <h2 className="text-2xl font-bold mb-4">Categorias</h2>

      <form onSubmit={adicionarCategoria} className="mb-4">
        <input
          type="text"
          placeholder="Nova categoria"
          value={novaCategoria}
          onChange={(e) => setNovaCategoria(e.target.value)}
          className="w-full p-2 border rounded mb-2"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          Adicionar
        </button>
      </form>

      <ul className="divide-y">
        {categorias.map((cat) => (
          <li key={cat.id} className="py-2 flex justify-between items-center">
            <span>{cat.nome}</span>
            <button
              onClick={() => deletarCategoria(cat.id)}
              className="text-red-600 hover:underline"
            >
              Excluir
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoriasPage;

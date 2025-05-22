import type { FC } from "react";
import type { Transacao } from "../types/Transacao";

type Props = {
  transacoes: Transacao[];
};

const ListaTransacoes: FC<Props> = ({ transacoes }) => {
  return (
    <div className="bg-white p-6 rounded shadow-md max-w-md mt-6">
      <h2 className="text-xl font-bold mb-4">Últimas Transações</h2>
      <ul>
        {transacoes.length === 0 ? (
          <li className="text-gray-500">Nenhuma transação encontrada.</li>
        ) : (
          transacoes.map((t) => (
            <li key={t.id} className="mb-2 border-b pb-2">
              <strong>{t.descricao}</strong> - {t.tipo === "entrada" ? "+" : "-"}
              {Number(t.valor).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}{" "}
              <span className="text-gray-500 text-sm">({t.data})</span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default ListaTransacoes;

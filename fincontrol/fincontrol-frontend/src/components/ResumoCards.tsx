import React from 'react'

const ResumoCards: React.FC = () => {
  // Valores fixos como exemplo. Depois vamos puxar da API.
  const saldo = 1500.00;
  const entradas = 2500.00;
  const saidas = 1000.00;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      <div className="bg-white p-4 rounded shadow text-center">
        <h2 className="text-lg font-semibold text-gray-700">Saldo</h2>
        <p className="text-2xl font-bold text-green-600">R$ {saldo.toFixed(2)}</p>
      </div>
      <div className="bg-white p-4 rounded shadow text-center">
        <h2 className="text-lg font-semibold text-gray-700">Entradas</h2>
        <p className="text-2xl font-bold text-blue-600">R$ {entradas.toFixed(2)}</p>
      </div>
      <div className="bg-white p-4 rounded shadow text-center">
        <h2 className="text-lg font-semibold text-gray-700">Saídas</h2>
        <p className="text-2xl font-bold text-red-600">R$ {saidas.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default ResumoCards;

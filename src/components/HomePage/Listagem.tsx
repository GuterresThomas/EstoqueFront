'use client'

import { useEffect, useState } from 'react';

export default function ListaProdutos() {
    const [produtos, setProdutos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProdutos = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/estoque');
                if (!response.ok) {
                    throw new Error('Erro ao buscar produtos');
                }
                const data = await response.json();
                setProdutos(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProdutos();
    }, []);

    if (loading) {
        return <p>Carregando...</p>;
    }

    if (error) {
        return <p>Erro: {error}</p>;
    }

    return (
        <div className="flex justify-center items-center">
            <div className="w-full max-w-2xl p-4">
                {produtos.length === 0 ? (
                    <p>Nenhum produto encontrado</p>
                ) : (
                    <ul className="space-y-4">
                        {produtos.map((produto) => (
                            <li key={produto.id} className="p-4 border rounded-md shadow-sm">
                                <h2 className="text-xl font-bold">{produto.name}</h2>
                                <p>Quantidade: {produto.quantidade}</p>
                                <p>Editado em: {new Date(produto.editado_em).toLocaleString()}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

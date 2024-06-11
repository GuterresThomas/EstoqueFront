'use client'

import React, { useEffect, useState } from 'react';

export default function ListaProdutos() {
    const [produtos, setProdutos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [produtoSelecionado, setProdutoSelecionado] = useState(null);
    const [novaQuantidade, setNovaQuantidade] = useState('');

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

    const handleEditQuantidade = (id) => {
        const produto = produtos.find((produto) => produto.id === id);
        setProdutoSelecionado(produto);
        setModalOpen(true);
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/estoque/${produtoSelecionado.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ quantidade: novaQuantidade }),
            });

            if (!response.ok) {
                throw new Error('Erro ao editar quantidade do produto');
            }

            const updatedProduto = await response.json();
            
            // Atualize o produto na lista localmente para evitar outra chamada à API
            setProdutos((prevProdutos) => 
                prevProdutos.map((produto) => 
                    produto.id === updatedProduto.id ? updatedProduto : produto
                )
            );

            alert('Produto atualizado');
            setModalOpen(false);
            setNovaQuantidade('');

        } catch (error) {
            setError(error.message);
        }
    };

    if (loading) {
        return <p>Carregando...</p>;
    }

    if (error) {
        return <p>Erro: {error}</p>;
    }

    return (
        <div className="flex justify-center items-center">
            <div className="w-full max-w-2xl p-4">
                {Array.isArray(produtos) && produtos.length === 0 ? (
                    <p>Nenhum produto encontrado</p>
                ) : (
                    <ul className="space-y-4">
                        {Array.isArray(produtos) && produtos.map((produto) => (
                            <li key={produto.id} className="p-4 border rounded-md shadow-sm">
                                <h2 className="text-xl font-bold">{produto.name}</h2>
                                <p>Quantidade: {produto.quantidade}</p> 
                                <p>Editado em: {new Date(produto.editado_em).toLocaleString()}</p>
                                <button onClick={() => handleEditQuantidade(produto.id)}>Editar Quantidade</button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            {modalOpen && (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
                    <div className="bg-white p-4 rounded-md">
                        <h2 className="text-xl font-bold mb-2">Editar Quantidade</h2>
                        <label htmlFor="novaQuantidade" className="block mb-2">Nova Quantidade:</label>
                        <input type="number" id="novaQuantidade" value={novaQuantidade} onChange={(e) => setNovaQuantidade(e.target.value)} className="border rounded-md p-2 mb-2" />
                        <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded-md">Salvar</button>
                        <button onClick={() => setModalOpen(false)} className="bg-red-500 text-white px-4 py-2 rounded-md ml-2">Cancelar</button>
                    </div>
                </div>
            )}
        </div>
    );
}

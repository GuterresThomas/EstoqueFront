'use client'

import { useState } from 'react';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export default function FormularioProduto() {
    const [name, setName] = useState('');
    const [quantidade, setQuantidade] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const produto = {
            name,
            quantidade: parseInt(quantidade, 10),
        };

        try {
            const response = await fetch('http://localhost:3000/api/estoque', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(produto),
            });

            if (!response.ok) {
                throw new Error('Erro ao adicionar produto');
            }

            const data = await response.json();
            console.log('Produto adicionado com sucesso:', data);

            // Limpar os campos do formulário
            setName('');
            setQuantidade('');
        } catch (error) {
            console.error('Erro:', error);
        }
    };

    return (
        <div className="flex justify-center items-center">
            <div className="w-full max-w-md p-4">
                <form onSubmit={handleSubmit}>
                    <Label htmlFor="nome">Nome do produto</Label>
                    <Input
                        type="text"
                        id="nome"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Nome do produto"
                    />
                    <Label htmlFor="quantidade" className="mt-4">Quantidade</Label>
                    <Input
                        type="number"
                        id="quantidade"
                        value={quantidade}
                        onChange={(e) => setQuantidade(e.target.value)}
                        placeholder="Quantidade"
                    />
                    <Button className="mt-4 w-full" type="submit">
                        Adicionar Produto
                    </Button>
                </form>
            </div>
        </div>
    );
}

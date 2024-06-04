'use client'

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
 

export default function FormularioProduto() {
    
    
    return (
        <div className="ml-40 w-full">
            <div>    
                <Label htmlFor="nome">Nome</Label>
                <Input type="text" id="nome" placeholder="nome"/>
                <Label htmlFor="quantidade">Quantidade</Label>
                <Input type="number" id="quantidade" placeholder="quantidade"/>
                <Button className="mt-2">Adicionar Produto</Button>
            </div>
        </div>
    )
}
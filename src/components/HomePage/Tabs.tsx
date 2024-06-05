'use client'

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import  FormularioProduto  from './Formulario'
import  ListaProdutos  from './Listagem'
 

export default function TabsEstoque() {
    return (
        <div>
             <Tabs defaultValue="adicionar" className="">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="adicionar">Adicionar</TabsTrigger>
                    <TabsTrigger value="lista">Lista</TabsTrigger>
                </TabsList>
                <TabsContent value="adicionar">
                    <Card>
                    <CardHeader>
                        <CardTitle className="text-center">Adicionar Produto</CardTitle>
                        <CardDescription className="text-center">
                        Adicione o produto aqui:
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div>
                            <FormularioProduto/>
                        </div>
                    </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="lista">
                    <Card>
                    <CardHeader>
                        <CardTitle className="text-center">Lista de Produtos</CardTitle>
                        <CardDescription className="text-center">
                        Listagem do estoque interno?
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div>
                            <ListaProdutos/>
                        </div>
                    </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
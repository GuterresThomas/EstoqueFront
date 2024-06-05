import Image from "next/image";
import FormularioProduto from '../components/HomePage/Formulario'
import ListaProdutos from '../components/HomePage/Listagem'
import TabsEstoque from '../components/HomePage/Tabs'

export default function Home() {
  return (
    <main className="justify-center items-center p-2 m-3">
      <div className="justify-center items-center p-2 m-3">
        <TabsEstoque/>
      </div>
    </main>
  );
}

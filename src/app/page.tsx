import Image from "next/image";
import FormularioProduto from '../components/HomePage/Formulario'

export default function Home() {
  return (
    <main className="">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
       <FormularioProduto/>
      </div>
    </main>
  );
}

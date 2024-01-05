import Link from "next/link";
import Image from "next/image";
import heroImg from "../assets/hero.svg";

export default function Home() {
  return (
    <>
      <main className="flex items-center flex-col justify-center min-h-[calc(100vh-130px)]">
        <h2 className="font-medium text-2xl mb-2">Gerencie sua empresa</h2>
        <h1 className="font-bold text-3xl mb-8 text-blue-600 md:text-4xl">
          Atendimentos, clientes
        </h1>
        <Image
          src={heroImg}
          alt="Imagem hero do dev controle"
          width={600}
          className="max-w-sm md:max-w-xl"
        />
      </main>
      <footer
        className="text-right 
        mb-6
        mr-6
      "
      >
        <Link
          href="https://www.linkedin.com/in/igor-montezuma-dev/"
          target="blank"
        >
          <span className="font-bold hover:text-blue-400 duration-300">
            Desenvolvido por: Igor Montezuma
          </span>
        </Link>
      </footer>
    </>
  );
}

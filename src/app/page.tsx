import Image from "next/image";
import NavBarGlobal from "./components/NavBarHome";
import Link from "next/link";

export default function Home() {


  return (
    <div>
      <NavBarGlobal />
      <div className="flex gap-10 justify-center items-center py-14 px-8 my-6">
        <Image 
          src="https://i.postimg.cc/FR1h8trR/wired-outline-245-edit-document-hover-pinch.gif"
          alt="Ilustração de boas-vindas"
          width={118}
          height={118}
          className="rotate-6"
        />
        <Image 
          src="https://i.postimg.cc/MHK3dxqP/wired-outline-478-computer-display-hover-angle.gif"
          alt="Ilustração de boas-vindas"
          width={168}
          height={168}
          className="-rotate-6"
        />
        <Image 
          src="https://i.postimg.cc/YSrF4S3s/wired-outline-981-consultation-hover-conversation.gif"
          alt="Ilustração de boas-vindas"
          width={118}
          height={118}
          className="rotate-6"
        />
      </div>
      <div className="flex flex-col items-center text-center text-5xl font-Inter font-extrabold">
        <p>Um espaço criativo</p>
        <p>que transforma ideias</p>
      </div>
      <div className="flex flex-col my-6 text-center items-center justify-center text-md">
        Um espaço onde ideias se encontram, <br/>tarefas se simplificam e projetos ganham vida
      </div>
      <div className="flex justify-center mb-10">
        <div className="bg-blue-500 cursor-pointer text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition">
          Começar Agora
        </div>
      </div>
    </div>
  );
}

import axios from "axios";
import CardInfoAd from "./CardInfoAd";
import { ToastContainer, toast } from "react-toastify";

export interface AdsBanner {
  id: string;
  name: string;
  hourEnd: string;
  hourStart: string;
  useVoiceChannel: boolean;
  weekDays: string[];
  yearsPlaying: number;
}

export default function CardAd(props: AdsBanner) {
  const handleConectar = () => {
    axios(`http://localhost:3333/ads/${props.id}/discord`).then((response) => {
      navigator.clipboard.writeText(response.data.discord);
      toast.success("Discord copiado!");
    });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        hideProgressBar={false}
        newestOnTop={false}
        closeButton={false}
      />

      <ul className="text-white p-5 bg-[#2A2634] w-60 rounded-2xl flex flex-col">
        <>
          <CardInfoAd label="Nome" value={props.name} />

          <CardInfoAd
            label="Tempo de jogo"
            value={`${props.yearsPlaying} anos`}
          />

          <CardInfoAd
            label="Disponibilidade"
            value={`${props.weekDays.length} dias \u2022 ${props.hourStart} - ${props.hourEnd}`}
          />
          <div className="flex flex-row gap-3 mb-4">
            <CardInfoAd
              label="Chamada de áudio"
              value={props.useVoiceChannel ? "Sim" : "Não"}
              colorValue={
                props.useVoiceChannel ? "text-emerald-400" : "text-red-400"
              }
            />
          </div>
        </>
        <button
          onClick={handleConectar}
          className=" bg-violet-500 rounded p-1 flex items-center align-middle self-center"
        >
          Conectar
        </button>
      </ul>
    </>
  );
}

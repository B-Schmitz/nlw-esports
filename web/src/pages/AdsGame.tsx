import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import logoImg from "../assets/logo-nlw-esports.svg";
import CardAd from "../components/Card/CardAd";
import { ArrowArcLeft } from "phosphor-react";

interface AdsBanner {
  id: string;
  name: string;
  hourEnd: string;
  hourStart: string;
  useVoiceChannel: boolean;
  weekDays: string[];
  yearsPlaying: number;
}

export default function AdsGame() {
  const [ads, setAds] = useState<AdsBanner[]>([]);
  const { id } = useParams();

  let navigate = useNavigate();

  useEffect(() => {
    axios(`http://localhost:3333/games/${id}/ads`).then((response) => {
      console.log(response.data)
      setAds(response.data);
    });
  }, []);

  return (
    <div className="max-w-[1344px] mx-auto overflow-hidden flex flex-col items-center my-20">
      <img src={logoImg} alt="" />

      <div className="flex flex-row flex-wrap gap-5 mt-10">
      
      {ads.length !== 0 ? (
        ads.map((ad) => {
          return (
            <CardAd
            id={ad.id}
            key={ad.id}
            name={ad.name}
            yearsPlaying={ad.yearsPlaying}
            weekDays={ad.weekDays}
            hourStart={ad.hourStart}
              hourEnd={ad.hourEnd}
              useVoiceChannel={ad.useVoiceChannel}
              />
              );
            })
            ) : (
              <span className="text-zinc-300 font-black">Ainda não há anúncios!</span>
              )}

              </div>
              <button onClick={() => {navigate('/')}} className="mt-10 py-3 px-4 bg-violet-500 text-white rounded hover:bg-violet-600 flex items-center gap-3">
          <ArrowArcLeft size={24} />
          VOLTAR
        </button>
    </div>
  );
}

import * as Dialog from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
import CreateAdBanner from "../components/CreateAdBanner";
import CreateAdModal from "../components/Form/CreateAdModal";
import GameBanner from "../components/GameBanner";
import logoImg from "../assets/logo-nlw-esports.svg";
import { Link } from "react-router-dom";
import { api, API } from "../services";

export default function Home() {
  const [games, setGames] = useState<API.Game[]>([]);

  const renderGames = () => {
    return games.map((game) => {
      return (
        <Link
          className=" flex p-2 cursor-pointer hover:scale-105 ease-in-out duration-300"
          key={game.id}
          to={`/games/${game.id}/ads`}
        >
          <GameBanner
            title={game.title}
            bannerUrl={game.bannerUrl}
            adsCount={game._count.ads}
          />
        </Link>
      );
    });
  };

  useEffect(() => {
    api.games_get().then(setGames);
  }, []);

  return (
    <div className="mx-20 max-w[1344px] sm:mx-auto flex flex-col items-center mt-10">
      <img src={logoImg} alt="" />
      <h1 className="text-6xl text-white font-black mt-10 bg-nlw-gradient bg-clip-text">
        Seu <span className="text-transparent">duo</span> está aqui
      </h1>
      <div className="px-10 max-w[1344px] mx-auto flex flex-col items-center">
        <div className="mt-10 flex basis-0 flex-wrap ">{renderGames()}</div>

        <Dialog.Root>
          <CreateAdBanner />
          <CreateAdModal />
        </Dialog.Root>
      </div>
    </div>
  );
}

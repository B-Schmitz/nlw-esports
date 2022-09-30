import * as Dialog from "@radix-ui/react-dialog";
import * as Checkbox from "@radix-ui/react-checkbox";
import * as Select from "@radix-ui/react-select";
import * as ToogleGroup from "@radix-ui/react-toggle-group";

import { CaretDown, CaretUp, Check, GameController } from "phosphor-react";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { ToastContainer, toast } from "react-toastify";

import Input from "./Input";
import Option from "./Option";
import { API, api } from "../../services";

interface Game {
  id: string;
  title: string;
}

type FormValues = {
  game: string;
  name: string;
  yearsPlaying: string;
  discord: string;
  weekDays: string[];
  hourStart: string;
  hourEnd: string;
  useVoiceChannel: boolean;
};

export default function CreateAdModal() {
  const [gameId, setGameId] = useState<string>("");
  const [games, setGames] = useState<Game[]>([]);
  const [weekDays, setWeekdays] = useState<string[]>([]);
  const [useVoiceChannel, setUseVoiceChannel] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = handleSubmit(async (data) => {
    try {

      let obj: API.AdsPost= {
        name: data.name,
        yearsPlaying: Number(data.yearsPlaying),
        discord: data.discord,
        weekDays: weekDays.map(Number),
        hourStart: data.hourStart,
        hourEnd: data.hourEnd,
        useVoiceChannel: useVoiceChannel,
      }

      api.games_id_ads_post(gameId, obj).then(()=> {
        toast.success("Anúncio cadastrado com sucesso!");
      })
    } catch (error) {}
  });

  useEffect(() => {
    api.games_get().then(setGames);
  }, []);

  return (
    <>
      <ToastContainer
        position="top-right"
        hideProgressBar={false}
        newestOnTop={false}
        closeButton={false}
      />

      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/60 inset-0 fixed">
          <Dialog.Content className="bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[560px] shadow-lg shadow-black/25 fixed">
            <Dialog.Title className="text-3xl text-white font-black">
              Publique um anúncio
            </Dialog.Title>
            <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="game" className="font-semibold">
                  Qual o game?
                </label>
                <Select.Root onValueChange={(value) => setGameId(value)}>
                  <Select.Trigger className="py-3 px-4 text-sm flex items-center justify-between rounded bg-zinc-900">
                    <Select.SelectValue placeholder="Selecione o game que deseja jogar" />
                    <Select.Icon>
                      <CaretDown className="w-6 h-6" />
                    </Select.Icon>
                  </Select.Trigger>

                  <Select.Portal>
                    <Select.Content className="py-3 px-4 text-white bg-zinc-900 rounded">
                      <Select.SelectScrollUpButton className="bg-violet-500/50 rounded flex items-center justify-center">
                        <CaretUp weight="bold" />
                      </Select.SelectScrollUpButton>

                      <Select.SelectViewport>
                        {games.map((game) => (
                          <Option
                            key={game.id}
                            value={game.id}
                            text={game.title}
                          />
                        ))}
                      </Select.SelectViewport>
                    </Select.Content>
                  </Select.Portal>
                </Select.Root>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="name">Qual o game?</label>
                <Input
                  error={errors.name}
                  {...register("name", { required: true })}
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Como te chamam dentro do game?"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
                  <Input
                    error={errors.yearsPlaying}
                    {...register("yearsPlaying", { required: true })}
                    id="yearsPlaying"
                    name="yearsPlaying"
                    type="number"
                    placeholder="Tudo bem ser ZERO"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="discord">Qual seu discord?</label>
                  <Input
                    error={errors.discord}
                    {...register("discord", { required: true })}
                    id="discord"
                    name="discord"
                    type="text"
                    placeholder="Usuario#0000"
                  />
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="weekDays">Quando costuma jogar?</label>
                  <ToogleGroup.Root
                    {...register("weekDays")}
                    value={weekDays}
                    onValueChange={setWeekdays}
                    type="multiple"
                    className="grid grid-cols-7 gap-1"
                  >
                    <ToogleGroup.Item
                      value="0"
                      className={`w-8 h-11 rounded ${
                        weekDays.includes("0") ? "bg-violet-500" : "bg-zinc-900"
                      }`}
                      title="Domingo"
                    >
                      D
                    </ToogleGroup.Item>
                    <ToogleGroup.Item
                      value="1"
                      className={`w-8 h-11 rounded ${
                        weekDays.includes("1") ? "bg-violet-500" : "bg-zinc-900"
                      }`}
                      title="Segunda"
                    >
                      S
                    </ToogleGroup.Item>
                    <ToogleGroup.Item
                      value="2"
                      className={`w-8 h-11 rounded ${
                        weekDays.includes("2") ? "bg-violet-500" : "bg-zinc-900"
                      }`}
                      title="Terça"
                    >
                      T
                    </ToogleGroup.Item>
                    <ToogleGroup.Item
                      value="3"
                      className={`w-8 h-11 rounded ${
                        weekDays.includes("3") ? "bg-violet-500" : "bg-zinc-900"
                      }`}
                      title="Quarta"
                    >
                      Q
                    </ToogleGroup.Item>
                    <ToogleGroup.Item
                      value="4"
                      className={`w-8 h-11 rounded ${
                        weekDays.includes("4") ? "bg-violet-500" : "bg-zinc-900"
                      }`}
                    >
                      Q
                    </ToogleGroup.Item>
                    <ToogleGroup.Item
                      value="5"
                      className={`w-8 h-11 rounded ${
                        weekDays.includes("5") ? "bg-violet-500" : "bg-zinc-900"
                      }`}
                      title="Sexta"
                    >
                      S
                    </ToogleGroup.Item>
                    <ToogleGroup.Item
                      value="6"
                      className={`w-8 h-11 rounded ${
                        weekDays.includes("6") ? "bg-violet-500" : "bg-zinc-900"
                      }`}
                      title="Sábado"
                    >
                      S
                    </ToogleGroup.Item>
                  </ToogleGroup.Root>
                </div>
                <div className="flex flex-col gap-2 flex-1">
                  <label htmlFor="hourStart">Qual horário do dia?</label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      defaultValue={"19:00"}
                      {...register("hourStart")}
                      name="hourStart"
                      id="hourStart"
                      type="time"
                      placeholder="De"
                    />
                    <Input
                      defaultValue={"23:00"}
                      {...register("hourEnd")}
                      name="hourEnd"
                      id="hourEnd"
                      type="time"
                      placeholder="Até"
                    />
                  </div>
                </div>
              </div>

              <label className="mt-2 items-center flex gap-2 text-sm">
                <Checkbox.Root
                  onCheckedChange={(checked) => {
                    if (checked === true) {
                      setUseVoiceChannel(true);
                    } else {
                      setUseVoiceChannel(false);
                    }
                  }}
                  className="w-6 h-6 p-1 rounded bg-zinc-900"
                >
                  <Checkbox.Indicator>
                    <Check className=" w-4 h-4 text-emerald-400" />{" "}
                  </Checkbox.Indicator>
                </Checkbox.Root>
                Costumo me conectar ao chat de voz
              </label>
              <footer className="mt-4 flex justify-end gap-4">
                <Dialog.Close className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600">
                  Cancelar{" "}
                </Dialog.Close>
                <button
                  className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600"
                  type="submit"
                >
                  <GameController size={24} />
                  Encontrar duo
                </button>
              </footer>
            </form>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </>
  );
}

import { API } from "./types";

interface IAPI {
  games_get(): Promise<API.Game[]>;
  games_id_ads_get(id: string): Promise<API.Ads[]>;
  ads_id_discord_get(id: string): Promise<API.Discord>;
  games_id_ads_post(id: string, obj: API.AdsPost): Promise<void>;
}

class APIImp implements IAPI {
  base = "http://localhost:3333";

  async doGET(url: string): Promise<any> {
    let res = await fetch(`${this.base}${url}`);
    return res.json();
  }

  async doPOST(url: string, obj: any): Promise<any> {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    };

    let res = await fetch(`${this.base}${url}`, options);
    return res.json();
  }

  async games_get(): Promise<API.Game[]> {
    return this.doGET("/games");
  }

  async ads_id_discord_get(id: string): Promise<API.Discord> {
    return this.doGET(`/ads/${id}/discord`);
  }

  async games_id_ads_get(id: string): Promise<API.Ads[]> {
    return this.doGET(`/games/${id}/ads`);
  }
  async games_id_ads_post(id: string, obj: API.AdsPost): Promise<void> {
    return this.doPOST(`/games/${id}/ads`, obj);
  }
}

export let api: IAPI = new APIImp();

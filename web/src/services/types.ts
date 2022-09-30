export declare module API {
     interface Game {
        id: string;
        title: string;
        bannerUrl: string;
        _count: {
          ads: number;
        };
      }
      interface Ads {
        id: string;
        name: string;
        hourEnd: string;
        hourStart: string;
        useVoiceChannel: boolean;
        weekDays: string[] | number[];
        yearsPlaying: number;
      }
      interface AdsPost {
        name: string;
        hourEnd: string;
        hourStart: string;
        useVoiceChannel: boolean;
        discord: string;
        weekDays: string[] | number[];
        yearsPlaying: number;
      }
      interface Discord {
        discord: string
      }
}
import { TCurrentConditions } from "./TcurrentConditions";
import { TDailyForecast } from "./TdailyForecast";
import { TLocation } from "./Tlocation";

type TApiResponse<T> = {
  data: T | null;
  noError: boolean;
  message: string | null;
};

export type TLocationApiResponse = TApiResponse<TLocation>;
export type TCurrentConditionsApiResponse = TApiResponse<TCurrentConditions>;
export type TDailyForecastApiResponse = TApiResponse<TDailyForecast>;

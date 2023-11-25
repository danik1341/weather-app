export type TCurrentConditions = {
  LocalObservationDateTime: string;
  EpochTime: number;
  WeatherText: string;
  WeatherIcon: string;
  HasPrecipitation: boolean;
  PrecipitationType: string | null;
  IsDayTime: boolean;
  Temperature: {
    Metric: {
      Value: number;
      Unit: "C";
      UnitType: number;
    };
    Imperial: {
      Value: number;
      Unit: "F";
      UnitType: number;
    };
  };
  MobileLink: string;
  Link: string;
};

import React, { useEffect, useState } from "react";

import { extractDayMonth } from "../utils/date-time";
import { fahrenheitTemperatureConverter } from "../utils/temperature";
import ForecastHeader from "./forecast-header";
import WeatherIcon from "./weather-icon";

type ForecastsProps = {
  localizedName: string;
  currentDate: string;
  currentTemperature: number;
  isDayTime: boolean;
  weatherText: string;
  dailyForecasts: {
    Date: string;
    Day: {
      IconPhrase: string;
    };
    Night: {
      IconPhrase: string;
    };
    Temperature: {
      Maximum: {
        Value: number;
      };
      Minimum: {
        Value: number;
      };
    };
  }[];
  Headline: {
    Text: string;
  };
};

type temperatureArray = {
  value: {
    max: {
      c: number;
      f: number;
    };
    min: {
      c: number;
      f: number;
    };
  };
}[];

export default function Forecasts({
  localizedName,
  currentDate,
  dailyForecasts,
  Headline,
  currentTemperature,
  isDayTime,
  weatherText,
}: ForecastsProps) {
  const [temperatures, setTemperatures] = useState<temperatureArray>();
  const [celsiusActiveMin, setCelsiusActiveMin] = useState<boolean[]>([]);
  const [celsiusActiveMax, setCelsiusActiveMax] = useState<boolean[]>([]);

  const toggleTemperatureUnit = (index: number, unit: "min" | "max") => {
    if (unit === "min") {
      setCelsiusActiveMin((prev) => {
        const newArray = [...prev];
        newArray[index] = !newArray[index];
        return newArray;
      });
    } else if (unit === "max") {
      setCelsiusActiveMax((prev) => {
        const newArray = [...prev];
        newArray[index] = !newArray[index];
        return newArray;
      });
    }
  };

  useEffect(() => {
    if (temperatures) {
      setCelsiusActiveMin(Array(temperatures.length).fill(true));
      setCelsiusActiveMax(Array(temperatures.length).fill(true));
    }
  }, [temperatures]);

  useEffect(() => {
    const fillInTemps = () => {
      const tempArr = dailyForecasts.map((dailyForecast) => {
        const fahrenheitMax = dailyForecast.Temperature.Maximum.Value;
        const fahrenheitMin = dailyForecast.Temperature.Minimum.Value;
        const celsiusMax = fahrenheitTemperatureConverter(fahrenheitMax);
        const celsiusMin = fahrenheitTemperatureConverter(fahrenheitMin);
        return {
          value: {
            max: {
              c: celsiusMax,
              f: fahrenheitMax,
            },
            min: {
              c: celsiusMin,
              f: fahrenheitMin,
            },
          },
        };
      });
      setTemperatures(tempArr);
    };
    fillInTemps();
  }, [dailyForecasts]);
  return (
    <div className="flex flex-col">
      <ForecastHeader
        currentDate={currentDate}
        headline={Headline.Text}
        localizedName={localizedName}
        temperatureF={currentTemperature}
        isDayTime={isDayTime}
        weatherText={weatherText}
      />

      <h1 className="mt-10 text-2xl font-bold text-center underline sm:mt-0 sm:text-4xl">
        Five Days of Daily Forecasts
      </h1>
      <div className="flex justify-center flex-1 w-full p-5 sm:p-10">
        <div className="p-5 w-full overflow-x-auto lg:max-w-[80%] rounded sm:p-10 bg-slate-200/90 dark:bg-gray-700">
          <table className="table">
            {/* head */}
            <thead>
              <tr className="text-gray-700 dark:text-white">
                <th></th>
                <th>Date</th>
                <th>Day</th>
                <th>Night</th>
                <th className="text-center">Maximum</th>
                <th className="text-center">Minimum</th>
              </tr>
            </thead>
            <tbody>
              {dailyForecasts.map((dailyForecast, index) => (
                <React.Fragment key={index}>
                  <tr className="hover:bg-slate-300 dark:hover:bg-slate-600">
                    <th>{index + 1}</th>
                    <td className="text-lg font-semibold">
                      {extractDayMonth(dailyForecast.Date)}
                    </td>
                    <td>
                      {/* <WiDaySunny className="w-8 h-8" /> */}
                      <WeatherIcon phrase={dailyForecast.Day.IconPhrase} />
                      <span className="text-xs leading-none tracking-tighter">
                        {dailyForecast.Day.IconPhrase}
                      </span>
                    </td>
                    <td>
                      {/* <MdNightlight className="w-8 h-8" /> */}
                      <WeatherIcon phrase={dailyForecast.Night.IconPhrase} />
                      <span className="text-xs leading-none tracking-tighter">
                        {dailyForecast.Night.IconPhrase}
                      </span>
                    </td>
                    <td>
                      <div className="flex flex-row items-center justify-center">
                        {temperatures ? (
                          <span className="text-base max-w-[15%]">
                            {celsiusActiveMax[index]
                              ? temperatures[index].value.max.c
                              : temperatures[index].value.max.f}
                          </span>
                        ) : (
                          <span>stam</span>
                        )}
                        <div className="flex items-center px-3 space-x-1">
                          <button
                            className={`btn btn-sm ${
                              celsiusActiveMax[index]
                                ? "btn-info"
                                : "btn-outline text-sky-500 dark:text-sky-400 dark:hover:bg-gray-600"
                            }`}
                            onClick={() => {
                              if (celsiusActiveMax[index]) {
                                return;
                              } else {
                                toggleTemperatureUnit(index, "max");
                              }
                            }}
                          >
                            C
                          </button>
                          <span className="text-2xl font-bold text-sky-500 dark:text-sky-400">
                            /
                          </span>
                          <button
                            className={`btn btn-sm ${
                              celsiusActiveMax[index]
                                ? "btn-outline text-sky-500 dark:text-sky-400 dark:hover:bg-gray-600"
                                : "btn-info"
                            }`}
                            onClick={() => {
                              if (celsiusActiveMax[index]) {
                                toggleTemperatureUnit(index, "max");
                              } else {
                                return;
                              }
                            }}
                          >
                            F
                          </button>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="flex flex-row items-center justify-center ">
                        {temperatures ? (
                          <span className="text-base max-w-[15%]">
                            {celsiusActiveMin[index]
                              ? temperatures[index].value.min.c
                              : temperatures[index].value.min.f}
                          </span>
                        ) : (
                          <span>stam</span>
                        )}
                        <div className="flex items-center px-3 space-x-1">
                          <button
                            className={`btn btn-sm ${
                              celsiusActiveMin[index]
                                ? "btn-info"
                                : "btn-outline text-sky-500 dark:text-sky-400 dark:hover:bg-gray-600"
                            }`}
                            onClick={() => {
                              if (celsiusActiveMin[index]) {
                                return;
                              } else {
                                toggleTemperatureUnit(index, "min");
                              }
                            }}
                          >
                            C
                          </button>
                          <span className="text-2xl font-bold text-sky-500 dark:text-sky-400">
                            /
                          </span>
                          <button
                            className={`btn btn-sm ${
                              celsiusActiveMin[index]
                                ? "btn-outline text-sky-500 dark:text-sky-400 dark:hover:bg-gray-600"
                                : "btn-info"
                            }`}
                            onClick={() => {
                              if (celsiusActiveMin[index]) {
                                toggleTemperatureUnit(index, "min");
                              } else {
                                return;
                              }
                            }}
                          >
                            F
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

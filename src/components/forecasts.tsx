import React from "react";
import { MdNightlight } from "react-icons/md";
import { WiDaySunny } from "react-icons/wi";

import ForecastHeader from "./forecast-header";

type ForecastsProps = {
  localizedName: string;
  currentDate: string;
  currentTemperature: number;
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

export default function Forecasts({
  localizedName,
  currentDate,
  dailyForecasts,
  Headline,
  currentTemperature,
}: ForecastsProps) {
  return (
    <div className="flex flex-col">
      <ForecastHeader
        currentDate={currentDate}
        headline={Headline.Text}
        localizedName={localizedName}
        temperatureF={currentTemperature}
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
              {/* row 1 */}
              <tr className="hover:bg-slate-300 dark:hover:bg-slate-600">
                <th>1</th>
                <td className="text-lg font-semibold">24/11</td>
                <td>
                  <WiDaySunny className="w-8 h-8" />
                </td>
                <td>
                  <MdNightlight className="w-8 h-8" />
                </td>
                <td>
                  <div className="flex flex-row items-center justify-center">
                    <span className="text-base">26</span>
                    <div className="flex items-center px-3 space-x-1">
                      <button className="btn btn-sm btn-info">C</button>
                      <span className="text-2xl font-bold text-sky-500 dark:text-sky-400">
                        /
                      </span>
                      <button className="btn dark:hover:bg-gray-600 btn-outline btn-sm text-sky-500 dark:text-sky-400">
                        F
                      </button>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="flex flex-row items-center justify-center ">
                    <span className="text-base">26</span>
                    <div className="flex items-center px-3 space-x-1">
                      <button className="btn btn-sm btn-info">C</button>
                      <span className="text-2xl font-bold text-sky-500 dark:text-sky-400">
                        /
                      </span>
                      <button className="btn dark:hover:bg-gray-600 btn-outline btn-sm text-sky-500 dark:text-sky-400">
                        F
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

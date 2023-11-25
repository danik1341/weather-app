import React, { useEffect, useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import { WiDaySunny } from "react-icons/wi";
import { dateAndTimeConvert } from "../utils/date-time";
import { fahrenheitTemperatureConverter } from "../utils/temperature";

type ForecastHeaderProps = {
  localizedName: string;
  currentDate: string;
  headline: string;
  temperatureF: number;
};

export default function ForecastHeader({
  localizedName,
  currentDate,
  headline,
  temperatureF,
}: ForecastHeaderProps) {
  console.log("FROM HEADDDDDDDTIMMMMME:", currentDate);
  const [celsiusActive, setCelsiusActive] = useState(true);
  const [newDateConvert, setNewDateConvert] = useState<string>();
  const [celsius, setCelsius] = useState<number>();
  //   const celsius = fahrenheitTemperatureConverter(temperatureF);

  const toggleTemperatures = () => {
    setCelsiusActive(!celsiusActive);
  };

  useEffect(() => {
    setNewDateConvert(dateAndTimeConvert(currentDate));
    console.log("TIMEEEEEEEEEEEEE:", newDateConvert);
  }, [currentDate]);

  useEffect(() => {
    setCelsius(fahrenheitTemperatureConverter(temperatureF));
  }, [temperatureF]);

  return (
    <header className="flex flex-col items-center p-4 sm:p-10 sm:items-baseline">
      <h2 className="px-5 text-2xl font-semibold sm:self-start">Today in:</h2>
      <div className="flex flex-col items-center sm:flex-row sm:space-x-10 sm:self-start">
        <h1 className="py-5 text-2xl italic font-bold sm:ml-32 sm:text-4xl sm:self-start">
          {localizedName}
        </h1>
        <h2 className="text-xl sm:text-2xl">{newDateConvert}</h2>
        <button className="w-10 mt-5 sm:mt-0 group" title="Add To Favorites">
          <FaRegStar className="hidden w-8 h-8 group-hover:block hover:text-yellow-300 dark:hover:text-yellow-500" />
          <FaStar className="w-8 h-8 text-yellow-300 dark:text-yellow-500 group-hover:hidden" />
        </button>
      </div>
      <p className="self-center mt-5 text-lg">{headline}</p>

      <div className="self-center mt-10 bg-gray-200 border border-gray-400 shadow-md dark:bg-gray-700 sm:mr-10 xl:mr-0 dark:border-gray-900 sm:mt-16 stats">
        <div className="stat">
          <div className="stat-figure text-sky-500 dark:text-sky-400">
            <WiDaySunny className="inline-block w-10 h-10 stroke-current" />
          </div>
          <div className="stat-title text-black/80 dark:text-white">
            Current Weahter
          </div>
          <div className="flex stat-value text-sky-500 dark:text-sky-400">
            {celsiusActive ? celsius : temperatureF}
            <div className="flex items-center px-3 space-x-1">
              <button
                className={`btn btn-sm ${
                  celsiusActive
                    ? "btn-info"
                    : "btn-outline text-sky-500 dark:text-sky-400 dark:hover:bg-gray-600"
                }`}
                onClick={() => {
                  if (celsiusActive) {
                    return;
                  } else {
                    toggleTemperatures();
                  }
                }}
              >
                C
              </button>
              <span className="text-2xl">/</span>
              <button
                className={`btn btn-sm ${
                  celsiusActive
                    ? "btn-outline text-sky-500 dark:text-sky-400 dark:hover:bg-gray-600"
                    : "btn-info"
                }`}
                onClick={() => {
                  if (celsiusActive) {
                    toggleTemperatures();
                  } else {
                    return;
                  }
                }}
              >
                F
              </button>
            </div>
          </div>
          <div className="text-gray-500 stat-desc dark:text-white/80">
            Mostly Sunny
          </div>
        </div>
      </div>
    </header>
  );
}

import React, { useEffect, useState } from "react";
import { IoMdSearch } from "react-icons/io";

import Forecasts from "../components/forecasts";
import {
  TCurrentConditionsApiResponse,
  TDailyForecastApiResponse,
  TLocationApiResponse,
} from "../models/TapiResponse";
import {
  fetchAutoCompleteSearch,
  fetchCurrentConditions,
  fetchFiveDaysForecast,
} from "../server/data";

export default function Home() {
  const [location, setLocation] = useState<TLocationApiResponse | null>(null);
  const [currentConditions, setCurrentConditions] =
    useState<TCurrentConditionsApiResponse | null>(null);
  const [dailyForecasts, setDailyForecasts] =
    useState<TDailyForecastApiResponse | null>(null);

  const [inputLocationSearch, setInputLocationSearch] = useState<string>("");

  const handleSearch = async () => {
    const locationData = await fetchAutoCompleteSearch(inputLocationSearch);
    if (locationData) {
      setLocation(locationData);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const locationData = await fetchAutoCompleteSearch();
      if (locationData) {
        setLocation(locationData);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (location) {
        if (location.data) {
          const currentConData = await fetchCurrentConditions(
            location.data.Key
          );
          if (currentConData) {
            setCurrentConditions(currentConData);
            console.log(currentConData);
          }

          const dailyForecastsData = await fetchFiveDaysForecast(
            location.data.Key
          );
          if (dailyForecastsData) {
            setDailyForecasts(dailyForecastsData);
            console.log(dailyForecastsData);
          }
        }
      }
    };
    fetchData();
    console.log(location);
  }, [location]);
  return (
    <div>
      <div className="flex justify-center">
        <div className="flex justify-center w-3/4 sm:w-1/2">
          <div className="w-full">
            <div className="flex flex-1 w-full border border-gray-500 rounded dark:bg-gray-700/80 bg-gray-200/80 input input-bordered">
              <input
                type="text"
                value={inputLocationSearch}
                onChange={(e) => setInputLocationSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
                placeholder="Search for a city..."
                className="w-full px-5 bg-inherit"
              />
              <button
                onClick={handleSearch}
                className="bg-inherit hover:bg-slate-300 hover:rounded-full dark:hover:bg-slate-800"
              >
                <IoMdSearch className="w-full h-3/4" />
              </button>
            </div>
          </div>
        </div>
      </div>
      {location && currentConditions && dailyForecasts ? (
        location.data &&
        currentConditions.data &&
        dailyForecasts.data && (
          <Forecasts
            currentDate={currentConditions.data.LocalObservationDateTime}
            currentTemperature={
              currentConditions.data.Temperature.Imperial.Value
            }
            dailyForecasts={dailyForecasts.data.DailyForecasts}
            Headline={dailyForecasts.data.Headline}
            localizedName={location.data.LocalizedName}
          />
        )
      ) : (
        <div>stam</div>
      )}
      {/* <Forecasts currentDate={currentConditions.data.LocalObservationDateTime} /> */}
    </div>
  );
}

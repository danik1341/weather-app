import React, { useEffect, useState } from "react";
import {
  TCurrentConditionsApiResponse,
  TDailyForecastApiResponse,
  TLocationApiResponse,
} from "../models/TapiResponse";
import Forecasts from "./forecasts";
import { Error, Loading } from "./error-loading-skeleton";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { CiCircleRemove } from "react-icons/ci";
import { useAuth } from "../context/auth-context";
import axios from "axios";
import { TFavorites } from "../models/Tfavorites";
import toast from "react-hot-toast";
import {
  fetchAutoCompleteSearch,
  fetchCurrentConditions,
  fetchFiveDaysForecast,
} from "../server/data";

type UserPanelProps = {
  currentConditions: TCurrentConditionsApiResponse;
  dailyForecasts: TDailyForecastApiResponse;
  location: TLocationApiResponse;
};

export default function UserPanel({
  currentConditions,
  dailyForecasts,
  location,
}: UserPanelProps) {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("weather");
  const [currentConditionsUser, setCurrentConditionsUser] =
    useState<TCurrentConditionsApiResponse | null>();
  const [dailyForecastsUser, setDailyForecastsUser] =
    useState<TDailyForecastApiResponse | null>();
  const [locationUser, setLocationUser] =
    useState<TLocationApiResponse | null>();
  const [favorites, setFavorites] = useState<TFavorites>([]);

  const handleRemoveFromFavorites = async (key: string) => {
    if (user) {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_LOCAL_API_PATH}/auth/remove/favorite/${user.id}`,
          {
            key,
          }
        );
        const { data, message, noError } = response.data;

        if (message) {
          if (noError) {
            toast.success(message);
          } else {
            toast.error(message);
          }
        }

        if (data) {
          setFavorites(data);
        }
      } catch (err) {
        console.error("Error removing from favorites:", err);
        toast.error("Error removing from favorites");
      }
    }
  };

  const handleGoToLocation = async (locationName: string) => {
    const locationData = await fetchAutoCompleteSearch(locationName);
    if (locationData) {
      if (locationData.data) {
        const currentConData = await fetchCurrentConditions(
          locationData.data.Key
        );
        if (currentConData) {
          setCurrentConditionsUser(currentConData);
        }

        const dailyForecastsData = await fetchFiveDaysForecast(
          locationData.data.Key
        );
        if (dailyForecastsData) {
          setDailyForecastsUser(dailyForecastsData);
        }
      }
      setLocationUser(locationData);
      handleTabClick("weather");
    }
  };

  useEffect(() => {
    if (user) {
      const fetchFavorites = async () => {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_LOCAL_API_PATH}/auth/favorites/${user.id}`
          );

          setFavorites(response.data.data || []);
        } catch (err) {
          console.error("Error fetching favorites:", err);
        }
      };
      fetchFavorites();
    }
  }, [user]);

  useEffect(() => {
    setLocationUser(location);
    setCurrentConditionsUser(currentConditions);
    setDailyForecastsUser(dailyForecasts);
  }, [currentConditions, dailyForecasts, location]);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
  };

  return (
    <div className="min-h-screen py-10">
      <div role="tablist" className="tabs tabs-lifted">
        <button
          role="tab"
          className={`tab bg-gray-500 text-black ${
            activeTab === "weather" ? "tab-active text-white" : ""
          }`}
          onClick={() => handleTabClick("weather")}
        >
          Weather
        </button>
        <button
          role="tab"
          className={`tab bg-gray-500 text-black ${
            activeTab === "favorites" ? "tab-active text-white" : ""
          }`}
          onClick={() => handleTabClick("favorites")}
        >
          Favorites
        </button>
      </div>

      {activeTab === "weather" ? (
        currentConditionsUser && dailyForecastsUser && locationUser ? (
          currentConditionsUser.data &&
          dailyForecastsUser.data &&
          locationUser.data ? (
            <Forecasts
              currentDate={currentConditionsUser.data.LocalObservationDateTime}
              currentTemperature={
                currentConditionsUser.data.Temperature.Imperial.Value
              }
              dailyForecasts={dailyForecastsUser.data.DailyForecasts}
              Headline={dailyForecastsUser.data.Headline}
              localizedName={locationUser.data.LocalizedName}
              isDayTime={currentConditionsUser.data.IsDayTime}
              weatherText={currentConditionsUser.data.WeatherText}
              favorites={favorites}
              keyLocation={locationUser.data.Key}
            />
          ) : (
            <Error />
          )
        ) : (
          <Loading />
        )
      ) : activeTab === "favorites" ? (
        <div className="flex justify-center flex-1 w-full p-5 sm:p-10">
          <div className="p-5 w-full overflow-x-auto lg:max-w-[80%] rounded sm:p-10 bg-slate-200/90 dark:bg-gray-700">
            <table className="table">
              <thead>
                <tr className="text-gray-700 dark:text-white">
                  <th></th>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody>
                {favorites && favorites.length > 0 ? (
                  favorites.map((favorite, index) => (
                    <React.Fragment key={favorite.key}>
                      <tr className="hover:bg-slate-300 dark:hover:bg-slate-600">
                        <th>{index + 1}</th>
                        <td>{favorite.name}</td>
                        <td>
                          <div className="flex flex-row w-full space-x-3 sm:space-x-0 justify-evenly">
                            <button
                              title="Look at"
                              className="btn btn-success"
                              onClick={() => {
                                if (user) {
                                  handleGoToLocation(favorite.name);
                                }
                              }}
                            >
                              <FaLongArrowAltLeft className="w-5 h-5 sm:w-10 sm:h-10" />
                            </button>
                            <button
                              title="Remove"
                              className="btn btn-error"
                              onClick={() => {
                                if (user) {
                                  handleRemoveFromFavorites(favorite.key);
                                }
                              }}
                            >
                              <CiCircleRemove className="w-5 h-5 sm:w-10 sm:h-10" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    </React.Fragment>
                  ))
                ) : (
                  <tr>No Favorites added or have been found...</tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <Error />
      )}
    </div>
  );
}

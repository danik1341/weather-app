import React, { useEffect, useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import { WiDaySunny, WiNightClear } from "react-icons/wi";

import { dateAndTimeConvert } from "../utils/date-time";
import { fahrenheitTemperatureConverter } from "../utils/temperature";
import { useAuth } from "../context/auth-context";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { TFavorites } from "../models/Tfavorites";

type ForecastHeaderProps = {
  localizedName: string;
  currentDate: string;
  headline: string;
  temperatureF: number;
  isDayTime: boolean;
  weatherText: string;
  favorites?: TFavorites;
  keyLocation?: string;
};

export default function ForecastHeader({
  localizedName,
  currentDate,
  headline,
  temperatureF,
  isDayTime,
  weatherText,
  favorites,
  keyLocation,
}: ForecastHeaderProps) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [celsiusActive, setCelsiusActive] = useState(true);
  const [newDateConvert, setNewDateConvert] = useState<string>();
  const [celsius, setCelsius] = useState<number>();
  const [headerFavorites, setHeaderFavorites] = useState<
    { name: string; key: string }[]
  >([]);
  const [currentFavorite, setCurrentFavorite] = useState<boolean>();

  const toggleTemperatures = () => {
    setCelsiusActive(!celsiusActive);
  };

  const handleAddToFavorites = async (name: string, key: string) => {
    if (user) {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_LOCAL_API_PATH}/auth/favorites/add/${user.id}`,
          {
            name,
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
          setHeaderFavorites(data);
        }
      } catch (err) {
        console.error("Error adding to favorites:", err);
        toast.error("Error adding to favorites");
      }
    }
  };

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
          setHeaderFavorites(data);
        }
      } catch (err) {
        console.error("Error removing from favorites:", err);
        toast.error("Error removing from favorites");
      }
    }
  };

  useEffect(() => {
    if (favorites) {
      setHeaderFavorites(favorites);
    } else {
      setHeaderFavorites([]);
    }
  }, [favorites]);

  useEffect(() => {
    if (headerFavorites && keyLocation) {
      const isCurrentFavorite = headerFavorites.some(
        (favorite) => favorite.key === keyLocation
      );
      setCurrentFavorite(isCurrentFavorite);
    } else {
      setCurrentFavorite(false);
    }
  }, [headerFavorites, keyLocation]);

  useEffect(() => {
    setNewDateConvert(dateAndTimeConvert(currentDate));
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
        <button
          onClick={() => {
            if (user) {
              if (keyLocation) {
                if (currentFavorite) {
                  handleRemoveFromFavorites(keyLocation);
                } else {
                  handleAddToFavorites(localizedName, keyLocation);
                }
              }
            } else {
              navigate("/login");
            }
          }}
          className="w-10 mt-5 sm:mt-0"
          title="Add To Favorites"
        >
          <FaStar
            className={`w-8 h-8 ${
              currentFavorite
                ? "text-yellow-300 dark:text-yellow-500 hover:text-gray-500 hover:dark:text-gray-300"
                : "text-gray-500 dark:text-gray-300 hover:text-yellow-300 hover:dark:text-yellow-500"
            }`}
          />
        </button>
      </div>
      <p className="self-center mt-5 text-lg">{headline}</p>

      <div className="self-center mt-10 bg-gray-200 border border-gray-400 shadow-md dark:bg-gray-700 sm:mr-10 xl:mr-0 dark:border-gray-900 sm:mt-16 stats">
        <div className="stat">
          <div className="stat-figure text-sky-500 dark:text-sky-400">
            {isDayTime ? (
              <WiDaySunny className="inline-block w-10 h-10 stroke-current" />
            ) : (
              <WiNightClear className="inline-block w-10 h-10 stroke-current" />
            )}
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
            {weatherText}
          </div>
        </div>
      </div>
    </header>
  );
}

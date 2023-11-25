import axios from "axios";
import {
  TCurrentConditionsApiResponse,
  TDailyForecastApiResponse,
  TLocationApiResponse,
} from "../models/TapiResponse";

const dbUrl = process.env.REACT_APP_WEATHER_API_PATH;

export async function fetchAutoCompleteSearch(
  location?: string
): Promise<TLocationApiResponse> {
  let queryParams = {
    apikey: process.env.REACT_APP_WEAHTER_API_KEY,
    q: "Tel Aviv",
  };
  try {
    if (location) {
      queryParams.q = location;
    }
    const response = await axios.get(
      `${dbUrl}/locations/v1/cities/autocomplete`,
      {
        params: {
          apikey: queryParams.apikey,
          q: queryParams.q,
        },
      }
    );

    if (response.status === 200) {
      return {
        data: response.data[0],
        noError: true,
        message: null,
      };
    } else {
      return {
        data: null,
        noError: false,
        message: "Error fetching location data",
      };
    }
  } catch (err) {
    console.error("Error fetching location data:", err);
    return {
      data: null,
      noError: false,
      message: `Error fetching location data: ${err}`,
    };
  }
}

export async function fetchCurrentConditions(
  locationKey: string
): Promise<TCurrentConditionsApiResponse> {
  if (locationKey) {
    try {
      const response = await axios.get(
        `${dbUrl}/currentconditions/v1/${locationKey}`,
        {
          params: {
            apikey: process.env.REACT_APP_WEAHTER_API_KEY,
          },
        }
      );

      if (response.status === 200) {
        return {
          data: response.data[0],
          noError: true,
          message: null,
        };
      } else {
        return {
          data: null,
          noError: false,
          message: "Error fetching current conditions data",
        };
      }
    } catch (err) {
      console.error("Error fetching current conditions data:", err);
      return {
        data: null,
        noError: false,
        message: `Error fetching current conditions data: ${err}`,
      };
    }
  } else {
    return {
      data: null,
      noError: false,
      message: "Location Key required!",
    };
  }
}

export async function fetchFiveDaysForecast(
  locationKey: string
): Promise<TDailyForecastApiResponse> {
  if (locationKey) {
    try {
      const response = await axios.get(
        `${dbUrl}/forecasts/v1/daily/5day/${locationKey}`,
        {
          params: {
            apikey: process.env.REACT_APP_WEAHTER_API_KEY,
          },
        }
      );

      if (response.status === 200) {
        return {
          data: response.data,
          noError: true,
          message: null,
        };
      } else {
        return {
          data: null,
          noError: false,
          message: "Error fetching five days of daily forecasts data",
        };
      }
    } catch (err) {
      console.error("Error fetching five days of daily forecasts data:", err);
      return {
        data: null,
        noError: false,
        message: `Error fetching five days of daily forecasts data: ${err}`,
      };
    }
  } else {
    return {
      data: null,
      noError: false,
      message: "Location Key required!",
    };
  }
}

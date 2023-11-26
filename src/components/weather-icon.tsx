import React from "react";
import { MdError } from "react-icons/md";
import { WiCloud, WiCloudy, WiCloudyWindy, WiDayCloudyHigh, WiDayHaze, WiDayRainWind, WiDaySleetStorm, WiDaySnow, WiDaySnowWind, WiDaySunny, WiDaySunnyOvercast, WiFog, WiHail, WiHot, WiNightCloudy, WiNightFog, WiNightRain, WiNightRainMix, WiNightSnow, WiNightSnowThunderstorm, WiRain, WiRainMix, WiRainWind, WiSleet, WiSnow, WiSnowflakeCold, WiSnowWind, WiStormShowers, WiStrongWind, WiSunrise, WiSunset, WiThermometerExterior, WiThunderstorm } from "react-icons/wi";

type WeatherIconProps = {
  phrase: string;
};

export default function WeatherIcon({ phrase }: WeatherIconProps) {
  const getIconByPhrase = () => {
    switch (phrase.toLowerCase()) {
      case 'sunny':
        return <WiDaySunny className="w-8 h-8" />;
      case 'mostly sunny':
        return <WiSunset className="w-8 h-8" />
      case 'partly sunny':
        return <WiSunrise className="w-8 h-8" />
      case "intermittent clouds":
        return <WiDayCloudyHigh className="w-8 h-8" />;
      case 'hazy sunshine':
        return <WiDayHaze className="w-8 h-8" />
      case "mostly cloudy":
        return <WiCloudy className="w-8 h-8" />;
      case 'cloudy':
        return <WiCloud className="w-8 h-8" />
      case 'dreary (overcast)':
        return <WiCloudyWindy className="w-8 h-8" />
      case 'fog':
        return <WiFog className="w-8 h-8" />
      case 'showers':
        return <WiRainWind className="w-8 h-8" />
      case 'mostly cloudy w/ showers':
        return <WiRainMix className="w-8 h-8" />
      case 'partly sunny w/ showers':
        return <WiDayRainWind className="w-8 h-8" />
      case 't-storms':
        return <WiThunderstorm className="w-8 h-8" />
      case 'mostly cloudy w/ t-storms':
        return <WiStormShowers className="w-8 h-8" />
      case 'partly sunny w/ t-storms':
        return <WiDaySleetStorm className="w-8 h-8" />
      case 'rain':
        return <WiRain className="w-8 h-8" />
      case 'flurries':
        return <WiSnow className="w-8 h-8" />
      case 'mostly cloudy w/ flurries':
        return <WiNightSnow className="w-8 h-8" />
      case 'partly sunny w/ flurries':
        return <WiDaySnow className="w-8 h-8" />
      case 'snow':
        return <WiSnowWind className="w-8 h-8" />
      case 'mostly cloudy w/ snow':
        return <WiDaySnowWind className="w-8 h-8" />
      case 'ice':
        return <WiSnowflakeCold className="w-8 h-8" />
      case 'sleet':
        return <WiSleet className="w-8 h-8" />
      case 'freezing rain':
        return <WiNightRain className="w-8 h-8" />
      case 'rain and snow':
        return <WiHail className="w-8 h-8" />
      case 'hot':
        return <WiHot className="w-8 h-8" />
      case 'cold':
        return <WiThermometerExterior className="w-8 h-8" />
      case 'windy':
        return <WiStrongWind className="w-8 h-8" />
      case 'clear':
        return <WiDaySunny className="w-8 h-8" />;
      case 'mostly clear':
        return <WiDaySunnyOvercast className="w-8 h-8" />
      case 'partly cloudy':
        return <WiNightCloudy className="w-8 h-8" />
      case 'hazy moonlight':
        return <WiNightFog className="w-8 h-8" />
      case 'partly cloudy w/ showers':
        return <WiNightRainMix  className="w-8 h-8" />
      case 'partly cloudy w/ t-Storms':
        return <WiNightSnowThunderstorm className="w-8 h-8" />
      default:
        return <MdError className="w-8 h-8" />;
    }
  };
  return getIconByPhrase();
}

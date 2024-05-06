import { DateTime } from "luxon";

const API_KEY = "4f5796beef9c145ccdf9f8406c36b057";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

// There is no api that provide current hourly,daily forecast And zip Code in free.IF we won't that Api we have to subscribe.Thank you
//This is a separate subscription plan, which includes only One Call API.
// Subscribe 3.0 (https://api.openweathermap.org/data/3.0/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid={API key})
//After Subscibition It Will Share Hourly And Daily Forecast.

const getWeatherData = (infoType, searchParams) => {
    const url = new URL(BASE_URL + "/" + infoType);
    url.search = new URLSearchParams({...searchParams, appid:API_KEY}
    );

    return fetch(url)
    .then((res) => res.json());
};

const formatCurrentWeather = (data) => {
    const {
        coord: {lat, lon},
        main: {temp, feels_like, temp_min, temp_max, humidity},
        name,
        dt,
        sys: {country, sunrise, sunset},
        weather,
        timezone,
        hourly,
        daily,
        
        wind: {speed}
    } = data;

    const {main: details, icon} = weather[0];
    return {lat, lon, temp, timezone, hourly, daily, feels_like, temp_min, temp_max, humidity, name, dt, country, sunrise, sunset, details, icon, speed}
}

const formatForecastWeather = (data) => {
    let { timezone, daily, hourly } = data;
    
    // Check if daily and hourly data are defined and not empty
    if (daily && daily.length > 0) {
        daily = daily.slice(0, 5).map((d) => {
            return {
                title: formatToLocalTime(d.dt, timezone, "ccc"),
                temp: d.temp.day,
                icon: d.weather[0].icon,
            };
        });
    } else {
        daily = []; // Set to an empty array if undefined or empty
    }
    
    if (hourly && hourly.length > 0) {
        hourly = hourly.slice(0, 5).map((d) => {
            return {
                title: formatToLocalTime(d.dt, timezone, "hh:mm a"),
                temp: d.temp,
                icon: d.weather[0].icon,
            };
        });
    } else {
        hourly = []; // Set to an empty array if undefined or empty
    }

    return { timezone, daily, hourly };
};


const getFormattedWeatherData = async (searchParams) => {
    const formattedCurrentWeather = await getWeatherData("weather", searchParams).then(formatCurrentWeather);

    const { lat, lon } = formattedCurrentWeather;

    const formattedForecastWeather = await getWeatherData("onecall", {
        lat,
        lon,
        exclude: "current,minutely,alerts",
        units: searchParams.units,
    }).then(formatForecastWeather);

    return { ...formattedCurrentWeather, ...formattedForecastWeather };
};

const formatToLocalTime = (
    secs,
    zone,
    format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a",
) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

const iconUrlFromCode = (code) => {
    // Construct the URL using the provided base URL and the weather icon code
    return `https://openweathermap.org/img/wn/${code}@2x.png`;
};


export default getFormattedWeatherData;
export {formatToLocalTime, iconUrlFromCode, getWeatherData, formatForecastWeather};
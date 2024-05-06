import { useEffect, useState } from "react";
import "./App.css";
import TopButtons from "./components/TopButtons";
import Inputs from "./components/Inputs";
import TimeAndLocal from "./components/TimeAndLocal";
import TemperatureDetails from "./components/TemperatureDetails";
import Forecast from "./components/HourlyAndDailyForecast";
import getFormattedWeatherData from "./services/WeatherServices";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const [query, setQuery] = useState({q:"London"});
  const [units, setUnits] =useState("metric");
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const message = query.q ? query.q : "current location."
      toast.info('Fetching weather for ' + message)
      
      try {
        const data = await getFormattedWeatherData({...query, units});
        console.log("Weather Data:", data); // Add this line to inspect the data received
        toast.success(`Successfully fetched weather for ${data.name}, ${data.country}.`)
        setWeather(data);
      } catch (error) {
        console.error("Error fetching weather:", error); // Add this line for error logging
        toast.error("Failed to fetch weather data. Please try again later.");
      }
    }
  
    fetchWeather();
  }, [query, units]);

  const formatBackground = () => {
    if(!weather) return 'from-cyan-700 to-blue-700'
    const threshold = units === 'metric' ? 20 : 60
    if(weather.temp <= threshold) return 'from-cyan-700 to-blue-700'

    return 'from-yellow-700 to-orange-700'
  }

  return (
    <div className={`MainContainer w-full py-5 px-3 bg-gradient-to-br from-cyan-700 to-blue-700 h-[100vh] shadow-xl shadow-gray-400 ${formatBackground()}`}>
      <TopButtons setQuery={setQuery}/>
      <Inputs setQuery={setQuery} units={units} setUnits={setUnits}/>

      {weather && (
        <div>
        <TimeAndLocal weather={weather} />
        <TemperatureDetails weather={weather}/>

        <Forecast title="hourly forecast" items={weather.hourly} />
        <Forecast title="daily forecast" items={weather.daily} />
        </div>
      )}
  <ToastContainer draggable className="Toast" autoClose={5000} theme="colored" newestOnTop={true}/>
    </div>

  );
}

export default App;

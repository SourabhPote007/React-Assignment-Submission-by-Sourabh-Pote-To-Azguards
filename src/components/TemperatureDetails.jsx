import React from 'react'
import { formatToLocalTime, iconUrlFromCode } from '../services/WeatherServices';
import {
     UilArrowUp,
     UilArrowDown,
     UilTemperature,
     UilTear,
     UilWind,
     UilSun,
     UilSunset
     } from "@iconscout/react-unicons";


function TemperatureDetails({weather:{
  details, icon, temp, temp_min, temp_max, sunrise, sunset, speed, humidity, feels_like, timezone}
}) {
  return (
    <div>
      <div className="flex items-center justify-center py-6 text-xl md:text-sm text-cyan-300">
        <p>{details}</p>
      </div>

      <div className="flex flex-row items-center justify-between text-white py-3">
        <img src={iconUrlFromCode(icon)} className="w-20" alt="" />

        <p className="text-5xl"> {`${temp.toFixed()}°`}</p>
        <div className="flex flex-col space-y-2">
            <div className="flex font-light text-sm items-center justify-center">
                <UilTemperature size={18} className="mr-1"/>
                Real fell :
                <span className="font-medium ml-1">{`${feels_like.toFixed()}°`}</span>
            </div>
            <div className="flex font-light text-sm items-center justify-center">
                <UilTear size={18} className="mr-1"/>
                Humidity :
                <span className="font-medium ml-1">{`${humidity.toFixed()}%`}</span>
            </div>
            <div className="flex font-light text-sm items-center justify-center">
                <UilWind size={18} className="mr-1"/>
                wind :
                <span className="font-medium ml-1">{`${speed.toFixed()}km/h`}</span>
            </div>
        </div>
      </div>

      <div className="Tempdetails flex text-wrap flex-row items-center justify-center space-x-2 text-white text-sm py-3">
        <div className='temp flex mx-2 items-center justify-center gap-2'>
        <UilSun />
        <p className="font-light ">
            Rise :<span className="font-medium ml-1">{formatToLocalTime(sunrise, timezone, 'hh:mm a')}</span></p>
        </div>
        <p className="font-light common">|</p>
        
        <div className='temp flex mx-2 items-center justify-center gap-2'>
        <UilSunset />
        <p className="font-light temp">
            Set :<span className="font-medium ml-1">{formatToLocalTime(sunset, timezone, 'hh:mm')} PM</span></p>
        </div>
        <p className="font-light common">|</p>

        <div className='temp mx-2 flex items-center justify-center gap-2'>
        <UilArrowUp />
        <p className="font-light temp">
            High : <span className="font-medium ml-1">{`${temp_max.toFixed()}°`}</span></p>
            </div>
        <p className="font-light common">|</p>

        <div className='temp mx-2 flex items-center justify-center gap-2'>
        <UilArrowDown />
        <p className="font-light temp">
            Low : <span className="font-medium ml-1">{`${temp_min.toFixed()}°`}</span></p>
            </div>
          
      </div>
    </div>
  );
}

export default TemperatureDetails

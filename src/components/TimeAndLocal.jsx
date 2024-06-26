import "../App.css";
import React from 'react'
import { formatToLocalTime } from '../services/WeatherServices'

function TimeAndLocal({weather: {dt, timezone, name, country}}) {
  return (
    <div>
      <div className="flex items-center justify-center my-6">
        
        <p className="text-white text-xl font-extralight font-size-100% dttimezone">{formatToLocalTime(dt, timezone)}</p>

      </div>
      <div className="flex items-center justify-center my-3">
        <p className="text-white text-3xl font-medium">
            {`${name}, ${country}`}
        </p>
      </div>
    </div>
  )
}

export default TimeAndLocal

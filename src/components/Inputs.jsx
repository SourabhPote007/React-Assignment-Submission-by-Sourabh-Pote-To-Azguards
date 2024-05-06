import "../App.css";
import React, { useState } from 'react'
import { UilSearch, UilLocationPoint } from "@iconscout/react-unicons";
import { toast } from 'react-toastify';

function Inputs({setQuery, units, setUnits}) {
  const [city, setCity] = useState("");

  const handleSearchClick = () => {
    if(city !== "") setQuery({q: city})
  }

  const handleLocationClick = () => {
    if(navigator.geolocation){
      toast.info("Fetching Users Location.");
      
      navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        setQuery({lat, lon});
      });
    }
  };

  const handleUnitsChange = (e) => {
    const seletedUnit = e.currentTarget.name
    if(units !== seletedUnit) setUnits(seletedUnit);
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearchClick();
    }
  };

  return ( <div className="Inputs flex flex-row justify-center my-6">
        <div className="SearchSection flex flex-row w-3/4  items-center justify-center space-x-4">
            <input type="text" onKeyPress={handleKeyPress} placeholder="Search for city..." value={city} onChange={(e) => setCity(e.currentTarget.value)} className="searchInput text-xl font-light p-2 w-full shadow-xl focus:outline-none capitalize placeholder:lowercase" />
            <UilSearch size={25} onClick={handleSearchClick} className="text-white cursor-pointer transition ease-out hover:scale-125"/>
            <UilLocationPoint size={25} onClick={handleLocationClick} className="text-white cursor-pointer transition ease-out hover:scale-125"/>
        </div>

        <div className="Degree flex flex-row w-1/4 items-center justify-center">
          <button name="metric" onClick={handleUnitsChange} className="text-xl text-white font-light transition ease-out hover:scale-125">°C</button>
          <p className="text-xl text-white mx-1"> | </p>
          <button name="imperial" onClick={handleUnitsChange}  className="text-xl text-white font-light transition ease-out hover:scale-125">°F</button>
        </div>
  </div>
  )
}

export default Inputs

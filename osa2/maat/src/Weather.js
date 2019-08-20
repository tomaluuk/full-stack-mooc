import React, { useState, useEffect } from 'react';
import axios from 'axios'

function Weather(capital) {
  const [tempC, setTempC] = useState('')
  const [windKph, setWindKph] = useState('')
  const [windDir, setWindDir] = useState('')
  const [ condition, setCondition ] = useState('')

  useEffect(() => {
    axios
      .get(`http://api.apixu.com/v1/current.json?key=adcee843fed14491943165454191908&q=${capital}`)
      .then(response => {
        setTempC(response.data.current.temp_c)
        setWindKph(response.data.current.wind_kph)
        setWindDir(response.data.current.wind_dir)
        setCondition(response.data.current.condition.icon)
        //console.log(response.data)
      })
  }, [capital])

  return (
    <div>
      {capital !== ''
        ? (
          <div>
            <h3>Weather in {capital}</h3>
            <p><b>Temperature: </b>{tempC}°C</p>
            <img src={condition} alt='weather icon'></img>
            <p><b>Wind: </b>{windKph} kph, direction {windDir}</p>
          </div>
        ) : (
          <div>
            <p><b>Weather data unavailable</b></p>
          </div>
        )}
    </div>
  )
}

export default Weather;
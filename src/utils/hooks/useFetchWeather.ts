import { formatNextDate } from './../helpers'
import { useEffect, useState } from 'react'
import { formatDaytime, formatTime } from '../helpers'

export interface IWeather {
  humidity: string
  pressure: string
  temp: number
  sunrise: string
  sunset: string
  wind: string
  desc: any
  daytime: string
  minmax: { min: number; max: number }
  nextDays: { date: string; min: number; max: number; desc: string }[]
}

const useFetchWeather = (lon: number, lat: number, max: number, min: number) => {
  const [weather, setWeather] = useState<IWeather>()

  useEffect(() => {
    ;(async () => {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=metric&appid=750631a31a9105173e09820893702670`
      )
      const data = await res.json()
      const { humidity, pressure, temp, sunrise, sunset, wind_speed: wind } = data.current

      setWeather({
        humidity: humidity + '%',
        pressure: (pressure / 1000 + 'mBar').replace('.', ','),
        temp: Math.round(temp),
        sunrise: formatTime(sunrise),
        sunset: formatTime(sunset),
        wind: Math.round(wind * 3.6) + ' km/h',
        desc: data.current.weather[0].main,
        daytime: formatDaytime(sunrise, sunset),
        minmax: {
          min,
          max,
        },
        nextDays: data.daily.slice(1, 4).map((d: any) => ({
          date: formatNextDate(d.dt),
          min: d.temp.min,
          max: d.temp.max,
          desc: d.weather[0].main,
        })),
      })
    })()
  }, [])

  return weather
}
export default useFetchWeather

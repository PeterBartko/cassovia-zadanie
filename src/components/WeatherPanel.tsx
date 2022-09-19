import { MdLocationPin } from 'react-icons/md'
import arrowUp from '../assets/icons/arrow-up.svg'
import arrowDown from '../assets/icons/arrow-down.svg'
import humidity from '../assets/icons/humidity.svg'
import daytime from '../assets/icons/daytime.svg'
import pressure from '../assets/icons/pressure.svg'
import sunrise from '../assets/icons/sunrise.svg'
import sunset from '../assets/icons/sunset.svg'
import wind from '../assets/icons/wind.svg'
import useFetchWeather from '../utils/hooks/useFetchWeather'
import { ILocation } from '../utils/hooks/useFetchLocations'
import WeatherIcon from './WeatherIcon'
import { todayDate } from '../utils/helpers'

interface Props {
  show: React.Dispatch<React.SetStateAction<boolean>>
  selected: ILocation | undefined
}

const rows23 = [
  {
    icon: humidity,
    type: 'humidity',
  },
  {
    icon: pressure,
    type: 'pressure',
  },
  {
    icon: wind,
    type: 'wind',
  },
  {
    icon: sunrise,
    type: 'sunrise',
  },
  {
    icon: sunset,
    type: 'sunset',
  },
  {
    icon: daytime,
    type: 'daytime',
  },
]

const WeatherPanel: React.FC<Props> = ({ show, selected }) => {
  const { lat, lon } = selected?.coord!
  const { max, min } = selected?.temp!
  const [date, time] = todayDate()
  const weather = useFetchWeather(lon, lat, max, min)

  return (
    <section className="sm:w-[600px] mx-auto rounded-t-[1.3rem] sm:rounded-[1.3rem] relative pt-4 flex flex-col gap-7 shadow-pnl bg-white min-h-[calc(100vh-75vw)] overflow-hidden">
      <span className="flex items-center">
        <span className="text-sm text-[#999] sm:text-base flex items-center gap-2 ml-1 xs:ml-4">
          <p>{date}</p>|<p>{time}</p>
        </span>
        <button
          onClick={() => show(false)}
          className="flex items-center hover:opacity-70 gap-2 bg-[#0D9FEA14] absolute top-0 right-0 py-[15px] pr-4 rounded-bl-3xl pl-1 xs:pl-4"
        >
          <p className="text-[#0DA0EA]  font-medium">{selected?.location}, Slovakia</p>
          <MdLocationPin color="#0DA0EA" />
        </button>
      </span>

      <div className="grid grid-cols-3 justify-items-center pb-10 gap-y-8">
        <div className="text-center">
          <WeatherIcon size={40} desc={weather?.desc} />
          <p className="text-lg font-medium">{weather?.desc}</p>
        </div>

        <div className="flex justify-center">
          <p className="text-6xl relative font-light temp">{weather?.temp}</p>
        </div>

        <div className="my-auto">
          <span className="flex gap-1 justify-center text-[#666]">
            {weather?.minmax.max}°C
            <img src={arrowUp} alt="arrow up." className="-translate-y-[.15rem]" />
          </span>
          <span className="flex items-center gap-1 justify-center text-[#666]">
            {weather?.minmax.min}°C
            <img src={arrowDown} alt="arrow down." className="translate-y-[.15rem]" />
          </span>
        </div>

        {rows23?.map(({ icon, type }) => (
          <div key={type} className="text-center">
            <img src={icon} alt="humidity." className="mx-auto mb-2" />
            {/* @ts-ignore */}
            {weather && <p className="font-medium">{weather[type]}</p>}
            <p className="text-[#999] text-[8px] sm:text-xs capitalize">{type}</p>
          </div>
        ))}

        {weather?.nextDays?.map(({ date, desc, max, min }) => (
          <div
            key={date}
            className="grid place-content-center text-center shadow-day rounded-2xl w-[95px] h-[101px]"
          >
            <div>
              <WeatherIcon desc={desc} size={24} />
              <p className="font-medium">{date}</p>
              <span className="text-[#999] text-[8px] sm:text-xs flex items-center gap-1">
                {min}°C <img src={arrowUp} alt="arrow up." />
                {max}°C <img src={arrowDown} alt="arrow up." />
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default WeatherPanel

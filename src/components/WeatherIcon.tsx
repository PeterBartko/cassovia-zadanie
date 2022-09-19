import {
  IoRainyOutline,
  IoCloudOutline,
  IoSnowOutline,
  IoThunderstormOutline,
  IoSunnyOutline,
} from 'react-icons/io5'

interface Props {
  desc: string
  size: number
}

const WeatherIcon: React.FC<Props> = ({ desc, size }) => {
  switch (desc) {
    case 'Clear':
      return <IoSunnyOutline size={size} color="#aaa" className="mx-auto" />
    case 'Rain':
      return <IoRainyOutline size={size} color="#aaa" className="mx-auto" />
    case 'Cloudy':
      return <IoCloudOutline size={size} color="#aaa" className="mx-auto" />
    case 'Thunderstorm':
      return <IoThunderstormOutline size={size} color="#aaa" className="mx-auto" />
    case 'Snow':
      return <IoSnowOutline size={size} color="#aaa" className="mx-auto" />

    default:
      return <IoCloudOutline size={size} color="#aaa" className="mx-auto" />
  }
}

export default WeatherIcon

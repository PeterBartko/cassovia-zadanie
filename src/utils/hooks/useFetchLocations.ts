import { useEffect, useState } from 'react'

export interface ILocation {
  id: number
  location: string
  coord?: { lon: number; lat: number }
  temp?: {
    temp: number
    min: number
    max: number
  }
}

const useFetchLocations = () => {
  const [locations, setLocations] = useState<ILocation[]>([
    { id: 0, location: 'Bratislava' },
    { id: 1, location: 'Humenné' },
    { id: 2, location: 'Koromľa' },
    { id: 3, location: 'Košice' },
    { id: 4, location: 'Michalovce' },
    { id: 5, location: 'Sobrance' },
  ])

  useEffect(() => {
    ;(async () => {
      const fetchTemp = async (location: string) => {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=750631a31a9105173e09820893702670`
        )
        const data = await res.json()
        const { lon, lat } = data.coord
        const { temp, temp_min: min, temp_max: max } = data.main
        return { temp: { temp, min, max }, coord: { lon, lat } }
      }

      const temp = locations.map(async l => ({ ...l, ...(await fetchTemp(l.location)) }))
      setLocations(await Promise.all(temp))
    })()
  }, [])

  return locations
}
export default useFetchLocations

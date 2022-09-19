import { useState } from 'react'
import bg from './assets/graphic.png'
import SearchPanel from './components/SearchPanel'
import WeatherPanel from './components/WeatherPanel'
import { ILocation } from './utils/hooks/useFetchLocations'
import useWidth from './utils/hooks/useWidth'

function App() {
  const [showWeather, setShowWeather] = useState(false)
  const [selected, setSelected] = useState<ILocation>()
  const width = useWidth()

  return (
    <>
      {width <= 1000 ? (
        <img src={bg} alt="background." className="absolute -z-50" />
      ) : (
        <div className="fixed inset-0 bg bg-bottom bg-contain -z-50"></div>
      )}

      <main
        className={`min-h-screen transition-[padding] ${
          showWeather && width <= 640 ? 'pt-[75vw]' : 'pt-[9vw]'
        }`}
      >
        {showWeather ? (
          <WeatherPanel show={setShowWeather} selected={selected} />
        ) : (
          <SearchPanel show={setShowWeather} setSelected={setSelected} />
        )}
      </main>
    </>
  )
}

export default App

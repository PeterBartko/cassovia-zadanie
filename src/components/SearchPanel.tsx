import pin from '../assets/icons/pin.svg'
import { useState } from 'react'
import useFetchLocations, { ILocation } from '../utils/hooks/useFetchLocations'
import { compare } from '../utils/helpers'
import { useAutoAnimate } from '@formkit/auto-animate/react'

interface Props {
  show: React.Dispatch<React.SetStateAction<boolean>>
  setSelected: React.Dispatch<React.SetStateAction<ILocation | undefined>>
}

const SearchPanel: React.FC<Props> = ({ show, setSelected }) => {
  const [search, setSearch] = useState('')
  const locations = useFetchLocations()
  const [ulRef] = useAutoAnimate<HTMLUListElement>({ duration: 150 })

  return (
    <section className="sm:w-[600px] mx-auto sm:h-fit sm:pb-7 rounded-t-[1.3rem] sm:rounded-[1.3rem] pt-7 flex flex-col gap-7 px-5 shadow-pnl bg-white h-[calc(100vh-9vw)]">
      <h2 className="text-center text-[#999]">Location</h2>

      <div className="relative">
        <input
          type="text"
          placeholder="Search city..."
          onInput={e => setSearch(e.currentTarget.value)}
          className="bg-[#f3f3f3] w-full py-2 px-4 rounded-md font-medium placeholder:italic placeholder:!font-extralight"
        />
        <img src={pin} alt="map pin." className="absolute top-2 right-4 translate-y-1/4" />
      </div>

      <ul ref={ulRef} className="space-y-[10px]">
        {locations
          ?.filter(({ location }) => compare(search, location))
          .map(({ location, temp, id }) => (
            <li key={id}>
              <button
                onClick={() => {
                  show(true)
                  setSelected(locations[id])
                }}
                className="flex items-center justify-between w-full px-4 hover:bg-[#8fcefb]/20 rounded-md"
              >
                <h3 className="font-normal">{location}</h3>
                <p className="text-[#666] font-light">{temp?.temp}°C</p>
              </button>
            </li>
          ))}
      </ul>
    </section>
  )
}

export default SearchPanel

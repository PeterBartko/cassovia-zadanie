export const formatTime = (timestamp: number) => {
  const date = new Date(timestamp * 1000)
  return (
    (date.getHours() >= 12 ? date.getHours() - 12 : date.getHours()) +
    ':' +
    (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) +
    (date.getHours() >= 12 ? ' PM' : ' AM')
  )
}

export const formatDaytime = (sunrise: number, sunset: number) => {
  const date = new Date(sunset * 1000 - sunrise * 1000)
  return date.getHours() + 'h, ' + date.getMinutes() + 'm'
}

export const compare = (search: string, location: string) => {
  search = search
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
  location = location
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
  return location.indexOf(search) != -1
}

export const formatNextDate = (timestamp: number) => {
  const date = new Date(timestamp * 1000)
  return date.toLocaleDateString('en', { weekday: 'long' }).substring(0, 3) + ', ' + date.getDate()
}

export const todayDate = () => {
  const [, m, d, y] = new Date().toDateString().split(' ')
  const day = new Date().toLocaleDateString('en', { weekday: 'long' })

  return [`${day}, ${d} ${m} ${y}`, `${formatTime(Date.now() / 1000)}`]
}

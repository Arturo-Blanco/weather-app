import { getPosition } from "../services/api.mjs"
import { useCurrentWeather } from "./useCurrentWeather"
import { useNextWeather } from "./useNextWeather"

export const useCurrentLocation = () => {
  const { setCoords } = useCurrentWeather({})
  const { setCoordinates } = useNextWeather({})

  const getCurrentLocation = async () => {
    if (navigator.geolocation) {
      try {
        const data = await getPosition()
        const newLocation = {
          latitude: data.coords.latitude,
          longitude: data.coords.longitude,
        }
        setCoords(newLocation)
        setCoordinates(newLocation)
      } catch (error) {
        console.error("Error getting location:", error)
      }
    }
  }
  return getCurrentLocation
}

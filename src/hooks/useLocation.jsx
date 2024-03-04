import { useState, useEffect } from "react"
import { getPosition } from "../services/api.mjs"

export const useLocation = () => {
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
  })

  useEffect(() => {
    if (navigator.geolocation) {
      const fetchData = async () => {
        try {
          const data = await getPosition()
          setLocation({
            latitude: data.coords.latitude,
            longitude: data.coords.longitude,
          });
        } catch (error) {
          console.error("Error getting location:", error)
        }
      };

      fetchData()
    }
  }, [])

  return location
}

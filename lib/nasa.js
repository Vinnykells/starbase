import axios from 'axios'

const API_KEY = process.env.NEXT_PUBLIC_NASA_API_KEY
const BASE_URL = process.env.NEXT_PUBLIC_NASA_BASE_URL

const nasa = axios.create({ baseURL: BASE_URL })

export const getAPOD = async (count = 8) => {
  const res = await nasa.get('/planetary/apod', { params: { api_key: API_KEY, count } })
  return res.data
}

export const getTodayAPOD = async () => {
  const res = await nasa.get('/planetary/apod', { params: { api_key: API_KEY } })
  return res.data
}

export const getMarsPhotos = async (rover = 'curiosity', sol = 1000) => {
  const solsToTry = [sol, 3500, 3000, 2000, 500, 100]
  for (const s of solsToTry) {
    try {
      const res = await nasa.get(`/mars-photos/api/v1/rovers/${rover}/photos`, {
        params: { api_key: API_KEY, sol: s, per_page: 12 },
      })
      if (res.data.photos?.length > 0) return res.data.photos
    } catch {}
  }
  return []
}

export const getNearEarthObjects = async () => {
  const today = new Date().toISOString().split('T')[0]
  const res = await nasa.get('/neo/rest/v1/feed', {
    params: { api_key: API_KEY, start_date: today, end_date: today },
  })
  const neos = res.data.near_earth_objects[today] || []
  return neos
    .sort((a, b) =>
      a.close_approach_data[0].miss_distance.kilometers -
      b.close_approach_data[0].miss_distance.kilometers
    )
    .slice(0, 8)
}

export default nasa

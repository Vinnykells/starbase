import axios from 'axios'

const API_KEY = process.env.NEXT_PUBLIC_NASA_API_KEY
const BASE_URL = process.env.NEXT_PUBLIC_NASA_BASE_URL

const nasa = axios.create({ baseURL: BASE_URL, timeout: 10000 })

export const getAPOD = async (count = 8) => {
  const res = await nasa.get('/planetary/apod', { params: { api_key: API_KEY, count } })
  return res.data
}

export const getTodayAPOD = async () => {
  const res = await nasa.get('/planetary/apod', { params: { api_key: API_KEY } })
  return res.data
}

export const getMarsPhotos = async (rover = 'curiosity') => {
  const res = await axios.get('https://images-api.nasa.gov/search', {
    params: { q: `${rover} mars rover`, media_type: 'image', page_size: 12 },
  })
  const items = res.data.collection?.items || []
  return items.slice(0, 12).map((item) => ({
    id: item.data[0].nasa_id,
    img_src: item.links?.[0]?.href,
    camera: { name: rover.toUpperCase(), full_name: item.data[0].title },
    sol: item.data[0].date_created?.split('T')[0] || '',
    earth_date: item.data[0].date_created?.split('T')[0] || '',
    rover: { name: rover.charAt(0).toUpperCase() + rover.slice(1), status: 'Active', total_photos: items.length },
  })).filter((p) => p.img_src)
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

export const getMoonPhotos = async (query = 'moon surface apollo') => {
  const res = await axios.get('https://images-api.nasa.gov/search', {
    params: { q: query, media_type: 'image', page_size: 12 },
  })
  const items = res.data.collection?.items || []
  return items.slice(0, 12).map((item) => ({
    id: item.data[0].nasa_id,
    img_src: item.links?.[0]?.href,
    title: item.data[0].title,
    description: item.data[0].description,
    date: item.data[0].date_created?.split('T')[0] || '',
    keywords: item.data[0].keywords || [],
  })).filter((p) => p.img_src)
}

export default nasa
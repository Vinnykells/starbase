import { getMoonPhotos } from '@/lib/nasa'
import { NextResponse } from 'next/server'

const queries = {
  surface: 'moon surface lunar',
  apollo: 'moon surface apollo',
  earthrise: 'moon earth orbit nasa',
}

export async function GET(request) {
  const category = new URL(request.url).searchParams.get('category') || 'apollo'
  const photos = await getMoonPhotos(queries[category] || queries.apollo).catch(() => [])
  return NextResponse.json(photos)
}

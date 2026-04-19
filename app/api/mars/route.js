import { getMarsPhotos } from '@/lib/nasa'
import { NextResponse } from 'next/server'

export async function GET(request) {
  const rover = new URL(request.url).searchParams.get('rover') || 'curiosity'
  const photos = await getMarsPhotos(rover).catch(() => [])
  return NextResponse.json(photos)
}

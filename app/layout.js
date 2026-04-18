import './globals.css'

export const metadata = {
  title: 'Starbase — Explore the Universe',
  description: 'Your mission control for space exploration. Real NASA data, Mars rover photos, asteroid tracking and more.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-space-black min-h-screen">
        {children}
      </body>
    </html>
  )
}

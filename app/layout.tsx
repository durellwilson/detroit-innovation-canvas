import './globals.css'

export const metadata = {
  title: 'Detroit Innovation Canvas - Build Together',
  description: 'Real-time collaborative innovation platform for Detroit',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">{children}</body>
    </html>
  )
}

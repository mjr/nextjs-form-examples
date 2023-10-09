import './global.css'

export const metadata = {
  title: 'Next.js Forms Example',
  description: 'Example application with forms and Postgres.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 flex justify-center items-center flex-col h-screen">
        <div className="mx-auto max-w-7xl py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}

import Link from "next/link"
import { Lexend } from "next/font/google"
import { Gamepad2, Home } from "lucide-react"

const lexend = Lexend({ subsets: ["latin"] })

export default function NotFound() {
  return (
    <div className={`${lexend.className} min-h-screen bg-background flex items-center justify-center`}>
      <div className="container flex flex-col items-center justify-center gap-4 px-4 text-center">
        <Gamepad2 className="h-24 w-24 text-gray-500 animate-bounce" />
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">Oops! Game Over</h1>
        <p className="max-w-[600px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          The page you&apos;re looking for seems to have disappeared into the digital void. Let&apos;s get you back to your coding adventure!
        </p>
        <Link 
          href="/" 
          className="inline-flex items-center px-4 py-2 mt-4 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Home className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
      </div>
    </div>
  )
}
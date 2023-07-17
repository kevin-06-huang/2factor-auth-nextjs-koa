'use client'
import Link from "next/link"

export default function Home() {
  return (
    <>
      <section className="bg-ct-blue-600 min-h-screen">
        <div className="max-w-4xl mx-auto bg-ct-dark-100 rounded-md h-[20rem] flex justify-center items-center">
          <form className="font-semibold" action="/login" method="post">
            <div className="ml-9">
              <label htmlFor="email">Email:</label>
              <input type="text" id="email" name="email" className="ml-2 text-black pl-2"/>
            </div>
            <div className="flex items-center mt-2">
              <label htmlFor="password" className="block">Password:</label>
              <input type="password" id="password" name="password" className="ml-2 text-black pl-2"/>
            </div>
            <div className="flex items-center mt-2 ml-12">
              <button type="submit" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Login</button>
              <Link href="/register" className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">!Member</Link>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}

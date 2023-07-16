import Navbar from "@/component/Navbar"

export default function Home() {
  return (
    <>
      <header className='flex flex-col justify-between p-6'>
        <Navbar />
      </header>
      <section className="bg-ct-blue-600 min-h-screen">
        <div className="max-w-4xl mx-auto bg-ct-dark-100 rounded-md h-[20rem] flex justify-center items-center">
          <p className="text-3xl font-semibold">
            Welcome to 2FA with Next.js
          </p>
        </div>
      </section>
    </>
  )
}

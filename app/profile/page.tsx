'use client'
import TwoFactorModal from "@/components/TwoFactorModal"
import useStore from "@/store/auth"
import { useRouter } from 'next/navigation'
import { useEffect, useState } from "react"

export default function Profile() {
  const store = useStore()
  const router = useRouter()
  const user = store.authUser
  const [modal, setModal] = useState(false)
  const [otpAuthUrl, setOtpAuthUrl] = useState("")

  const generateQrCode = async () => {
    const res = fetch('http://localhost:3000/otp/generate', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: user!.email
      })
    })

    const resBody = await (await res).json()
    if(!resBody.status) {
      setOtpAuthUrl(resBody.otpAuthUrl)
      setModal(true)
    }
    else
      alert(resBody.status)
  }

  useEffect(() => {
    if (!store.authUser) {
      router.push("/login");
    }
  }, []);

  return (
    <>
      {user ?
        <section className="bg-ct-blue-600 min-h-screen">
          <div className="max-w-4xl mx-auto bg-ct-dark-100 rounded-md h-[20rem] flex justify-center items-center">
            <p className="text-3xl font-semibold">
              Profile of {user.email}!!!
              {
                !user.otp_enabled ?
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded block mt-4 ml-24" onClick={generateQrCode}>
                  Enable 2fa
                </button> :
                <button className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded block mt-4 ml-24">Disable 2fa</button>
              }
              
            </p>
          </div>
          { modal &&
          <TwoFactorModal
            email={user.email}
            otpAuthUrl={otpAuthUrl}
            closeModal={() => setModal(false)}
          /> }
        </section> :
        <section className="bg-ct-blue-600 min-h-screen">
        <div className="max-w-4xl mx-auto bg-ct-dark-100 rounded-md h-[20rem] flex justify-center items-center">
          <p className="text-3xl font-semibold">
            Unauthorized!
          </p>
        </div>
      </section>
      }
      
    </>
  )
}

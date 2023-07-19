"use client";
import TwoFactorModal from "@/components/TwoFactorModal";
import useStore from "@/store/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Profile() {
  const store = useStore();
  const router = useRouter();
  const user = store.authUser;
  const [modal, setModal] = useState(false);
  const [otpAuthUrl, setOtpAuthUrl] = useState("");

  const generateQrCode = async () => {
    try {
      const res = fetch("http://localhost:3000/otp/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: user!.username,
        }),
      });

      const resBody = await (await res).json();
      if (!resBody.status) {
        setOtpAuthUrl(resBody.otpAuthUrl);
        setModal(true);
      } else alert(resBody.status);
    } catch (err) {
      console.error(err);
    }
  };

  const disable2FA = async () => {
    try {
      const res = fetch("http://localhost:3000/otp/disable", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: user!.username,
        }),
      });

      const resBody = await (await res).json();
      if (!resBody.status) {
        store.setAuthUser(resBody);
      } else alert(resBody.status);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!store.authUser) {
      router.push("/login");
    }
  }, []);

  return (
    <>
      {user ? (
        <section className="bg-ct-blue-600 min-h-screen">
          <div className="max-w-4xl mx-auto bg-ct-dark-100 rounded-md h-[20rem] flex justify-center items-center">
            <p className="text-3xl font-semibold">
              Profile of {user.username}!!!
              {!user.otp_enabled ? (
                <button
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded block mt-4 ml-4"
                  onClick={generateQrCode}
                >
                  Enable 2fa
                </button>
              ) : (
                <button
                  className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded block mt-4 ml-4"
                  onClick={disable2FA}
                >
                  Disable 2fa
                </button>
              )}
            </p>
          </div>
          {modal && (
            <TwoFactorModal
              username={user.username}
              otpAuthUrl={otpAuthUrl}
              closeModal={() => setModal(false)}
            />
          )}
        </section>
      ) : (
        <section className="bg-ct-blue-600 min-h-screen">
          <div className="max-w-4xl mx-auto bg-ct-dark-100 rounded-md h-[20rem] flex justify-center items-center">
            <p className="text-3xl font-semibold">Unauthorized!</p>
          </div>
        </section>
      )}
    </>
  );
}

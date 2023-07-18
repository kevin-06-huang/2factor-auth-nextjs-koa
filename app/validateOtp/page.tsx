"use client";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import useStore from "@/store/auth";

export default function ValidateOtp() {
  const store = useStore();
  const router = useRouter();
  const user = store.authUser;
  const otp = useRef<HTMLInputElement>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    try {
      event.preventDefault();
      const res = fetch("http://localhost:3000/otp/validate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: otp.current!.value,
          email: user!.email,
        }),
      });

      const resBody = await (await res).json();
      if (!resBody.status) router.push("/profile");
      else {
        alert(resBody.status);
        router.push("/login");
      }
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
        <div className="fixed top-0 right-0 left-0 z-[-1] w-full md:inset-0 md:h-full bg-[#222] bg-opacity-50">
          <div className="relative top-36 p-4 w-full max-w-xl h-full md:h-auto left-1/2 -translate-x-1/2">
            <div className="relative bg-white rounded-lg shadow">
              <h4 className="text-black flex justify-center font-semibold relative top-2 mb-4">
                Enter QR Code
              </h4>
              <div className="flex justify-center">
                <form onSubmit={handleSubmit}>
                  <div className="flex mb-2">
                    <input
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-30 p-2.5"
                      placeholder="Authentication Code"
                      ref={otp}
                    />
                    <button
                      type="submit"
                      className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded ml-2"
                    >
                      Validate
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
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

"use client";
import useStore from "@/store/auth";

export default function ValidateOtp() {
  const store = useStore();
  const user = store.authUser;

  return (
    <section className="bg-ct-blue-600 min-h-screen">
      <div className="max-w-4xl mx-auto bg-ct-dark-100 rounded-md h-[20rem] flex justify-center items-center">
        <p className="text-3xl font-semibold">Validate</p>
      </div>
    </section>
  );
}

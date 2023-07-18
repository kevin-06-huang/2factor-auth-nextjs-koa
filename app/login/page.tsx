"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useStore from "@/store/auth";

export default function Login() {
  const router = useRouter();
  const store = useStore();
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const res = fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: event.target.email.value,
        password: event.target.password.value,
      }),
    });
    const resBody = await (await res).json();
    if (!resBody.status) {
      store.setAuthUser(resBody);
      if (resBody.otp_enabled) router.push("/validateOtp");
      else router.push("/profile");
    } else alert(resBody.status);
  };
  return (
    <section className="bg-ct-blue-600 min-h-screen">
      <div className="max-w-4xl mx-auto bg-ct-dark-100 rounded-md h-[20rem] flex justify-center items-center">
        <form className="font-semibold" onSubmit={handleSubmit}>
          <div className="ml-9">
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              id="email"
              name="email"
              className="ml-2 text-black pl-2"
            />
          </div>
          <div className="flex items-center mt-2">
            <label htmlFor="password" className="block">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="ml-2 text-black pl-2"
            />
          </div>
          <div className="flex items-center mt-2 ml-12">
            <button
              type="submit"
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Login
            </button>
            <Link
              href="/register"
              className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              !Member
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}

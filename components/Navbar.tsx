'use client'
import Link from "next/link"
import useStore from "@/app/store/auth"

const Navbar = () => {
  const store = useStore()
  const user = store.authUser

  return (
    <div className="navbar bg-base-100 justify-end">
      <div className="flex-none">
        <ul className="menu menu-horizontal flex justify-end">
          <li>
            <Link href="/" className="m-2">Home</Link>
          </li>
          <li>
            <Link href="/register" className="m-2">Register</Link>
          </li>
          <li>
            <Link href="/login" className="m-2">Login</Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar

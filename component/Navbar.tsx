'use client'
import { useState } from "react";
import Link from "next/link";

const Navbar = () => {
  const [test, setTest] = useState();
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/register">Register</Link>
          </li>
          <li>
            <Link href="/login">Login</Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar;

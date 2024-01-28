'use client'

import { Github, LinkedinSquare } from "@emotion-icons/boxicons-logos"
import Link from "next/link"
import Avatar from "./Avatar"

const Nav = () => (
  <nav className="bg-neutral-900">
    <div className="flex px-8 sm:px-16 m-auto max-w-screen-md items-center">
      <div className="flex-1">
        <Link href="/" className="block relative w-8 h-8 bg-gray-600 rounded-full overflow-hidden">
          <Avatar />
        </Link>
      </div>
      <Link href="http://www.github.com/harterc1" target="_blank" className="p-1 my-1 inline-block">
        <Github size="2rem" title="Chad Harter's Github"/>
      </Link>
      <Link href="https://www.linkedin.com/in/chad-harter/" target="_blank" className="p-1 my-1 inline-block">
        <LinkedinSquare size="2rem" title="Chad Harter's LinkedIn" />
      </Link>
    </div>
  </nav>
)

export default Nav
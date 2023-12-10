import React, { useEffect, useState } from 'react'
import { NAV_LINKS } from './constant'
import Link from 'next/link'
import { GiHamburgerMenu } from 'react-icons/gi'
import { FaFileMedicalAlt } from 'react-icons/fa'
import { Collapse } from '@chakra-ui/react'
import { useWindowSize } from 'usehooks-ts'

export const Navbar: React.FC = () => {
  const [isHidden, setIsHidden] = useState(true)
  const { width } = useWindowSize()
  const onClick = () => setIsHidden((prev) => !prev)

  return (
    <nav className="shadow-xl text-teal-500 pl-5 sticky top-0">
      <div className="max-w-screen flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" className="flex items-center gap-2">
          <FaFileMedicalAlt size={30} />
          <span className="self-center text-2xl font-bold whitespace-nowrap">
            Remedi
          </span>
        </Link>
        <div className="flex lg:order-2 space-x-3 lg:space-x-0 rtl:space-x-reverse">
          <button
            type="button"
            className="text-white bg-teal-500 hover:bg-teal-800 font-medium rounded-lg text-sm px-4 py-2 text-center"
          >
            Sign Up
          </button>
          <button
            onClick={onClick}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-teal-500 rounded-lg lg:hidden hover:bg-teal-100 focus:outline-none focus:ring-2 focus:ring-teal-200"
          >
            <GiHamburgerMenu size={'100px'} />
          </button>
        </div>

        <Collapse
          animateOpacity
          in={width >= 1024 || !isHidden}
          className={`items-center justify-between w-full lg:flex lg:w-auto lg:order-1`}
        >
          <ul className="flex flex-col font-medium p-4 lg:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 lg:space-x-8 rtl:space-x-reverse lg:flex-row lg:mt-0 lg:border-0 lg:bg-white">
            {NAV_LINKS.map((val) => {
              return (
                <li key={val.key}>
                  <a
                    href="#"
                    className="block p-2 lg:p-0 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:hover:text-teal-700"
                  >
                    {val.label}
                  </a>
                </li>
              )
            })}
          </ul>
        </Collapse>
      </div>
    </nav>
  )
}

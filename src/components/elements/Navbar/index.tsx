import React, { useState } from 'react'
import { NAV_LINKS } from './constant'
import Link from 'next/link'
import { GiHamburgerMenu } from 'react-icons/gi'
import { FaFileMedicalAlt } from 'react-icons/fa'
import { Collapse } from '@chakra-ui/react'
import { useWindowSize } from 'usehooks-ts'
import { useAuth } from '@hooks'

export const Navbar: React.FC = () => {
  const { width } = useWindowSize()
  const { user } = useAuth()
  const [isHidden, setIsHidden] = useState(true)
  const handleCollapse = () => setIsHidden((prev) => !prev)

  return (
    <nav className="shadow-xl bg-white text-teal-500 sticky top-0 flex flex-col py-4 px-8 z-10">
      <div className="flex items-center justify-between">
        <Link href={'/'} className="flex justify-center items-center gap-2">
          <FaFileMedicalAlt size={30} />
          <span className="text-2xl font-bold">Remedi</span>
        </Link>

        <div className="lg:flex gap-7 items-center justify-center font-semibold hidden">
          {NAV_LINKS.map((value) => {
            return (
              <Link
                key={value.key}
                href={value.href}
                className="lg:hover:text-teal-700"
              >
                {value.label}
              </Link>
            )
          })}
        </div>

        <div className="flex justify-center items-center gap-2">
          <button
            type="button"
            className="text-white bg-teal-500 hover:bg-teal-800 font-medium rounded-lg text-sm px-4 py-2 text-center"
          >
            {!!user ? 'Sign Up' : 'Sign Out'}
          </button>
          <button
            onClick={handleCollapse}
            type="button"
            className="rounded-md hover:bg-teal-100 focus:ring-2 focus:ring-teal-200 p-1 lg:hidden"
          >
            <GiHamburgerMenu size={30} />
          </button>
        </div>
      </div>

      {/* Mobile */}
      <Collapse in={width > 768 ? false : isHidden} className="flex flex-col">
        <div className="flex flex-col gap-1 p-3 mt-4 bg-slate-100 rounded-lg">
          {NAV_LINKS.map((value) => {
            return (
              <Link
                key={value.key}
                href={value.href}
                className="lg:hover:text-teal-700 px-2 py-1 rounded-md hover:bg-gray-200 font-semibold"
              >
                {value.label}
              </Link>
            )
          })}
        </div>
      </Collapse>
    </nav>
  )
}

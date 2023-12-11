import React, { useState } from 'react'
import Link from 'next/link'
import { GiHamburgerMenu } from 'react-icons/gi'
import { FaFileMedicalAlt } from 'react-icons/fa'
import { Collapse } from '@chakra-ui/react'
import { useWindowSize } from 'usehooks-ts'
import { useAuth, useUser } from '@hooks'
import { useAuthContext } from '@contexts'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'

export const Navbar: React.FC = () => {
  const { width } = useWindowSize()
  const { user } = useAuth()
  const router = useRouter()
  const { setIsAuthModalOpen } = useAuthContext()
  const { removeUser } = useUser()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const handleCollapse = () => setIsCollapsed((prev) => !prev)

  const handleClick = () => {
    if (!!user) {
      removeUser()
      toast.success('Berhasil sign out')
      router.push('/')
    } else {
      setIsAuthModalOpen((prev) => !prev)
    }
  }

  return (
    <nav className="shadow-xl bg-white text-teal-500 sticky top-0 flex flex-col py-4 px-8 z-10">
      <div className="flex items-center justify-between">
        <Link href={'/'} className="flex justify-center items-center gap-2">
          <FaFileMedicalAlt size={30} />
          <span className="text-2xl font-bold">Remedi</span>
        </Link>

        <div className="lg:flex gap-7 items-center justify-center font-semibold hidden">
          <Link key={'obat'} href={'/obat'} className="lg:hover:text-teal-700">
            {'Daftar Obat'}
          </Link>
          <Link
            key={'medical_record'}
            href={user?.role === 'PATIENT' ? '/record' : '/record/pasien'}
            className="lg:hover:text-teal-700"
          >
            {'Medical Record'}
          </Link>
        </div>

        <div className="flex justify-center items-center gap-2">
          <button
            onClick={handleClick}
            type="button"
            className={`text-white ${
              !!user
                ? 'bg-red-500 hover:bg-red-800'
                : 'bg-teal-500 hover:bg-teal-800'
            } font-medium rounded-lg text-sm px-4 py-2 text-center`}
          >
            {!!user ? 'Sign Out' : 'Sign Up'}
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
      <Collapse in={width > 768 ? false : isCollapsed} className="flex flex-col">
        <div className="flex flex-col gap-1 p-3 mt-4 bg-slate-100 rounded-lg">
          <Link
            key={'obat'}
            href={'/obat'}
            className="lg:hover:text-teal-700 px-2 py-1 rounded-md hover:bg-gray-200 font-semibold"
          >
            {'Daftar Obat'}
          </Link>
          <Link
            key={'medical_record'}
            href={user?.role === 'PATIENT' ? '/record' : '/record/pasien'}
            className="lg:hover:text-teal-700 px-2 py-1 rounded-md hover:bg-gray-200 font-semibold"
          >
            {'Medical Record'}
          </Link>
        </div>
      </Collapse>
    </nav>
  )
}

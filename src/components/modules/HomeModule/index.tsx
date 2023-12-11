import Lottie from 'lottie-react'
import React from 'react'
import shield from '../../../../public/shield.json'
import Image from 'next/image'
import { Button } from '@chakra-ui/react'
// import {HeroSection, FAQSection} from './sections
// import {} from './module-elements'

export const HomeModule: React.FC = () => {
  // TODO: Write module's logic

  return (
    <section className="flex flex-col gap-1 md:gap-5 justify-center items-center py-10">
      <div className="w-[300px] md:w-[400px]">
        <Lottie animationData={shield} />
      </div>
      <h1 className="px-10 md:px-0 text-3xl md:text-5xl font-semibold text-center">
        Selamat datang di{' '}
        <span className="text-teal-500 font-bold">Remedi</span>
      </h1>
      <h2 className="px-10 md:px-0 text-lg md:text-2xl lg:text-4xl text-center">
        "ruang aman penyimpanan riwayat kesehatan anda"
      </h2>

      <section>
        <div className="mt-10 md:mt-20 bg-teal-500 text-white h-fit w-full grid grid-cols-2">
          <Image
            src={
              'https://img.freepik.com/free-photo/medical-physician-doctor-man_1150-15053.jpg?w=900&t=st=1702231201~exp=1702231801~hmac=054117851f41973c7b24dcb79c947d7e771c9182c0bdb92bacebc47b72ef159e'
            }
            alt={''}
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: '100%', height: 'auto' }} // optional
          />
          <div className="flex flex-col justify-center items-center text-center gap-3 px-5 md:px-20">
            <h3 className="font-bold text-sm md:text-lg lg:text-3xl">
              Penyimpanan tanpa batas!
            </h3>
            <p className="text-sm lg:text-xl hidden md:block">
              Tidak perlu lagi khawatir kehabisan ruang! Remedi memberikan Anda
              penyimpanan tanpa batas untuk seluruh riwayat kesehatan Anda.
              Setiap kunjungan, setiap resep, semua di satu tempat!
            </p>
          </div>
        </div>

        <div className=" text-teal-500 h-fit w-full grid grid-cols-2">
          <div className="flex flex-col justify-center items-center text-center gap-3 px-5 md:px-20">
            <h3 className="font-bold text-sm md:text-lg lg:text-3xl">
              Akses Kapan Saja, Di Mana Saja
            </h3>
            <p className="text-sm lg:text-xl hidden md:block">
              Akses riwayat kesehatan Anda di ujung jari, di mana pun Anda
              berada. Dengan Remedi, tidak perlu lagi membawa sejuta lembar
              dokumen. Semua ada dalam genggaman ponsel Anda!
            </p>
          </div>
          <Image
            src={
              'https://img.freepik.com/free-photo/close-up-person-using-mobile-phone_23-2148761303.jpg?w=1060&t=st=1702263140~exp=1702263740~hmac=dfadb36c20abf78ebddc38b84b9a3d28954adb03c3860266cf0ce972b26a87c7'
            }
            alt={''}
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: '100%', height: 'auto' }} // optional
          />
        </div>
      </section>
    </section>
  )
}

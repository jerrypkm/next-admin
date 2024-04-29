import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { CiLogout } from 'react-icons/ci'
import { Logout, SidebarItem } from '..'
import { IoCalendarOutline, IoCheckboxOutline, IoListOutline, IoPersonOutline, IoStorefrontOutline } from 'react-icons/io5'
import { PiCookieDuotone } from 'react-icons/pi'
import { auth } from '@/auth'

const sidebarItems = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: <IoCalendarOutline size={30} />
  },
  {
    href: "/dashboard/rest-todos",
    label: "Rest Todos",
    icon: <IoCheckboxOutline size={30} />
  },
  {
    href: "/dashboard/server-todos",
    label: "Server actions",
    icon: <IoListOutline size={30} />
  },
  {
    href: "/dashboard/cookies",
    label: "Cookies use",
    icon: <PiCookieDuotone size={30} />
  },
  {
    href: "/dashboard/products",
    label: "Products page",
    icon: <IoStorefrontOutline size={30} />
  },
  {
    href: "/dashboard/profile",
    label: "Profile client",
    icon: <IoPersonOutline size={30} />
  }
]

export const Sidebar = async () => {

  const session = await auth();

  const userName = session?.user?.name ?? 'no-name'
  const userImage = session?.user?.image ?? 'https://tailus.io/sources/blocks/stats-cards/preview/images/second_user.webp'
  const userRoles = session?.user?.roles ?? ['client']

  return (
      <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
        <div>
          <div className="-mx-6 px-6 py-4">
            <Link href="#" title="home">
              <Image src="https://tailus.io/sources/blocks/stats-cards/preview/images/logo.svg" width={200} height={100} className="w-32" alt="tailus logo"/>
            </Link>
          </div>

          <div className="mt-8 text-center">
            <Image src={ userImage } alt="" width={200} height={100} className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28"/>
              <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">{ userName }</h5>
              <span className="hidden text-gray-400 lg:block capitalize">{userRoles.join(', ')}</span>
          </div>

          <ul className="space-y-2 tracking-wide mt-8">
            {/* TODO: src/components <SidebarItem /> */}
            {/* Active className: text-white bg-gradient-to-r from-sky-600 to-cyan-400 */}
            {sidebarItems.map((item) => (
              <SidebarItem 
                key={item.href} 
                label={item.label} 
                href={item.href} 
                icon={item.icon}
              />
            ))}

          </ul>
        </div>
        <Logout></Logout>
      </aside>
  )
}

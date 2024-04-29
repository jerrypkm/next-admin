'use client'
import { usePathname } from 'next/navigation';
import React from 'react'

interface Props {
  href: string;
  label: string;
  icon: React.ReactElement;
}

export const SidebarItem = ({
  href,
  label,
  icon,
}: Props) => {
  const path = usePathname();

  const activeStyles = () => {
    if(path === href){
      return "text-white bg-gradient-to-r from-sky-600 to-cyan-400"
    }
    else
      return "text-gray-600 group"
  }

  return (
    <li>
      <a href={href} 
        className={`px-4 py-3 flex items-center space-x-4 rounded-md hover:bg-gradient-to-r hover:bg-sky-600 hover:text-white ${activeStyles()}`}>
        {icon}
        <span className="group-hover:text-white" >{label}</span>
      </a>
    </li>
  )
}

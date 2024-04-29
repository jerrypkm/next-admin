'use client'
import { useSession, signIn, signOut } from "next-auth/react"
import { CiLogout } from "react-icons/ci"
import { IoLogIn, IoShieldOutline } from "react-icons/io5";

export const Logout = () => {

  const { data: session, status } = useSession();

  if(status === 'loading'){
    return(
      <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
        <button className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
          <IoShieldOutline />
          <span className="group-hover:text-gray-700">Espere...</span>
        </button>
      </div>
    )
  }

  if(status === 'unauthenticated'){
    return(
      <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
        <button onClick={() => signIn() } className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
          <IoLogIn />
          <span className="group-hover:text-gray-700">Ingresar</span>
        </button>
      </div>
    )
  }

  return (
    <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
      <button onClick={() => signOut()} className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
        <CiLogout />
        <span className="group-hover:text-gray-700">Logout</span>
      </button>
    </div>
  )
}

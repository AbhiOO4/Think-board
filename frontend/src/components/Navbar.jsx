
import React from 'react'
import {PlusIcon} from 'lucide-react'
import {Link} from 'react-router'
import { LogOut } from 'lucide-react'


const Navbar = ({loggedInUser=null, logout}) => {
  return (
    <header className='bg-base-300 border-b border-base-content/10 sticky top-0 z-50'>
  <div className='mx-auto max-w-6xl p-4'>
    <div className='flex items-center justify-between gap-2'>
      {/* Logo: Smaller text on mobile */}
      <h1 className='text-xl sm:text-3xl font-bold text-primary font-mono tracking-tighter shrink-0'>
        Mind-Flow
      </h1>

      <div className='flex items-center gap-2 sm:gap-4'>
        {/* Button: Hide text on very small screens, show on 'sm' and up */}
        <Link to={"/create"} className="btn btn-primary btn-sm sm:btn-md">
          <PlusIcon className='size-5' /> 
          <span className='hidden sm:inline'>Add note</span>
        </Link>

        {/* Logout: Smaller button on mobile */}
        {loggedInUser && (
          <button 
            className='btn btn-outline btn-dark btn-sm sm:btn-md flex items-center gap-2' 
            onClick={logout}
          >
            <span className='hidden sm:inline'>Logout</span>
            <LogOut className="size-4 sm:size-5" />
          </button>
        )}
      </div>
    </div>
  </div>
</header>
  )
}

export default Navbar

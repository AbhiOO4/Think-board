
import { PlusIcon } from 'lucide-react'
import { Link } from 'react-router'
import { LogOut } from 'lucide-react'

const Navbar = ({ loggedInUser = null, logout }) => {
  return (
    <>
      <div className="navbar bg-base-100 border-b border-primary">
        <div className="flex-1">
          <a className="btn btn-ghost text-3xl font-mono font-bold">MindFLow</a>
        </div>
        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
              <div className="indicator rounded-full bg-primary p-3"> 
                <PlusIcon className='size-5 text-black' />
              </div>
            </div>
            <div
              tabIndex={0}
              className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow">
              <Link to={"/create"} className="btn btn-primary btn-sm sm:btn-md">
                <PlusIcon className='size-5' />
                <span className='hidden sm:inline'>Add note</span>
              </Link>
            </div>
          </div>
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="user profile"
                  src="https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png" />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li><a>Settings</a></li>
              <li><button
                className=''
                onClick={logout}
              >
                <span className='hidden sm:inline'>Logout</span>
                <LogOut className="size-4 sm:size-5" />
              </button></li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar





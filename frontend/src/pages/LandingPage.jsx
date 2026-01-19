
import React from 'react'
import {Link, useNavigate} from 'react-router'
import './LandingPage.css' 
import { useEffect } from 'react'

const LandingPage = () => {
  const signedIn = false
  const navigate = useNavigate()
  useEffect(() => {
    const isSignedIn = (signedIn) => {
      if (signedIn){
        navigate('/home')
      }
    }

    isSignedIn(signedIn)
  })

  return (
    <div className='h-screen flex items-center justify-center backgroundImage'>
      <div className="card bg-base-100 w-96 shadow-xl">
        <figure className="px-10 pt-10">
          <img
            src="https://images.unsplash.com/photo-1748019172081-6ece3ab01e1d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Shoes"
            className="rounded-xl" />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title font-bold font-mono">MindFlow</h2>
          <p className=''>Create notes, to do list and get tasks done on time using MindFlow.
            Go ahead and sign up to start now !!
          </p>
          <div className="card-actions">
            <Link className="btn btn-primary font-bold" to={'/home'}>Sign up</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandingPage

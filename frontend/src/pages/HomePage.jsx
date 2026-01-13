
import React, { use, useEffect, useEffectEvent } from 'react'
import Navbar from '../components/Navbar'
import { useState } from 'react'
import RateLimitedUi from '../components/RateLimitedUi'
import axios from 'axios'
import toast from 'react-hot-toast'
import Loading from '../components/Loading'
import { Turtle } from 'lucide-react'
import NoteCard from '../components/NoteCard'
import api from '../lib/axios.js'
import EmptyNotes from '../components/EmptyNotes.jsx'

const HomePage = () => {
  const [isRateLimited, setRateLimited] = useState(false)
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNotes = async () => {
      try{
        const res = await api.get("/notes")
        setNotes(res.data)
        setRateLimited(false)
      }catch(error){
        console.log('error fetching notes', error)
        if (error.response?.status === 429){
          setRateLimited(true)
        }else{
          toast.error("Failed to load notes")
        }
      }finally{
        setLoading(false)
      }
    }
    fetchNotes()
  }, [])

  return (
    <div className='min-h-screen'>
      <Navbar/>
      {loading && <Loading/>}
      {isRateLimited && <RateLimitedUi/>}

      <div className='max-w-7xl mx-auto p-4 mt-6'>
        {notes.length === 0 && !isRateLimited && <EmptyNotes/>}
        {notes.length > 0 && !isRateLimited && (
          <div className='flex items-center justify-center'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {notes.map(note => {
                return (
                  <NoteCard key={note._id} note={note} setNotes={setNotes}/>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default HomePage

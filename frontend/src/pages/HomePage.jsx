
import React, { use, useEffect, useEffectEvent } from 'react'
import Navbar from '../components/Navbar'
import { useState } from 'react'
import RateLimitedUi from '../components/RateLimitedUi'
import axios from 'axios'
import toast from 'react-hot-toast'
import Loading from '../components/Loading'
import { Turtle } from 'lucide-react'
import NoteCard from '../components/NoteCard'

const HomePage = () => {
  const [isRateLimited, setRateLimited] = useState(false)
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNotes = async () => {
      try{
        const res = await axios.get("http://localhost:3000/api/notes")
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

      <div className='max-w-7xl max-auto p-4 mt-6'>
        {notes.length > 0 && !isRateLimited && (
          <div className='flex items-center justify-center'>
            <div className='grid grid-cols-1 md:grid-cols-3 lg:gird-cols-3 gap-6'>
              {notes.map(note => {
                return (
                  <NoteCard key={note._id} note={note} />
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

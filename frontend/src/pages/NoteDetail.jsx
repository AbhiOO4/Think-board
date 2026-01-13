import React, { useEffect, useState } from 'react'
import api from '../lib/axios'
import { useNavigate, useParams } from 'react-router'
import Loading from '../components/Loading'
import { ArrowLeftIcon } from 'lucide-react'
import { Link } from 'react-router'
import { Trash } from 'lucide-react'
import toast from 'react-hot-toast'

const NoteDetail = () => {
  const [note, setNote] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const navigate = useNavigate()

  const { id } = useParams()

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`)
        setNote(res.data)
      } catch (error) {
        console.log(error)
        toast.error("failed to fetch the note")
      } finally {
        setLoading(false)
      }
    }

    fetchNote()
  }, [])

  const handleSave = async () => {
    if (!note.title.trim() || !note.content.trim()){
      toast.error("All fields are required")
      return 
    }

    setSaving(true)
    try{
      await api.put(`/notes/${id}`, note)
      toast.success("Note updated successfully !!")
    }catch(error){
      console.log(error)
      toast.error("Failed to update note")
    }finally{
      setSaving(false)
    }

  }

   const handleDelete = async (e, id) => {
        e.preventDefault()
        if (!window.confirm("Are you sure you want to delete this Note ?")){
            return 
        }
        try{
            await api.delete(`/notes/${id}`)
            navigate('/')
            toast.success("Note deleted successfully")
        }catch(error){
            if (error.response?.status === 429){
                toast.error("You are deleting too fast, try again later", {duration: 5000})
            }else{
                toast.error("Failed to delete the node")
            }
            console.log(error)
        }
    }

  if (loading) {
    return <Loading />
  }

  return (
    <div className='min-h-screen bg-base-200'>
      <div className='container mx-auto max-w-3xl px-4 py-8'>
        <div className='flex items-center mb-6 justify-between'>
          <Link to={"/"} className='btn btn-ghost mb-6' >
            <ArrowLeftIcon className="" />
            Back to Nodes
          </Link>
          <button className='btn btn-error btn-outline btn-md text-error' onClick={(e) => handleDelete(e, note._id)}><Trash /> Delete Note</button>
        </div>
          <div className='card bg-base-100'>
            <div className='card-body'>
              <form>
                <div className='form-control mb-4'>
                  <label className="label">
                    <span className='label-text'>Title</span>
                  </label>
                  <input type="text" placeholder='Title' className='input input-bordered' value={note.title} onChange={(e) => setNote({...note, title: e.target.value})} />
                </div>

                <div className='form-control mb-4'>
                  <label className="label">
                    <span className='label-text'>Content</span>
                  </label>
                  <textarea placeholder='Your note here..' className='textarea textarea-bordered h-32' value={note.content} onChange={(e) => setNote({...note, content: e.target.value})}/>
                </div>

                <div className="card-actions justify-end">
                  <button type="button" className='btn btn-primary' disabled={saving} onClick={handleSave}>
                    {saving ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </form>
            </div>
          </div>
      </div>
    </div >
  )
}

export default NoteDetail

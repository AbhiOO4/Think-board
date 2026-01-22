import React from 'react'
import { Link } from 'react-router'
import { SquarePen, Trash } from 'lucide-react'
import { formatDate } from '../lib/utils.js'
import api from '../lib/axios.js'
import toast from 'react-hot-toast'


const NoteCard = ({ note, setNotes }) => {

    const handleDelete = async (e, id) => {
        e.preventDefault()
        if (!window.confirm("Are you sure you want to delete this Note ?")){
            return 
        }
        try{
            await api.delete(`/notes/${id}`)
            setNotes((prev) => prev.filter((i) => i._id !== id))
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

    return (
        <Link to={`/note/${note._id}`}>
            <div className="card border-t-8 border-2 border-primary bg-base-100 w-60 sm:w-80 lg:w-96 shadow-sm mx-2">
                <div className="card-body">
                    <h2 className="card-title text-base-content">{note.title}</h2>
                    {/* <p>{note.content}</p> */}
                    <div className="card-actions justify-between items-center mt-4">
                        <span className='text-sm text-base-content/60'>{formatDate(new Date(note.createdAt))}</span>
                        <div className='flex items-center gap-1'>
                            <Link to={`/note/${note._id}`} className=""><SquarePen /></Link>
                            <button className='btn btn-ghost btn-xs text-error' onClick={(e) => handleDelete(e, note._id)}><Trash /></button>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default NoteCard

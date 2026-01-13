import React from 'react'
import { Link } from 'react-router'
import { SquarePen, Trash } from 'lucide-react'
import { formatDate } from '../lib/utils.js'

const NoteCard = ({ note }) => {
    return (
        <Link to={`/note/${note._id}`}>
            <div className="card border-t-8 border-2 border-primary bg-base-100 w-96 shadow-sm">
                <div className="card-body">
                    <h2 className="card-title text-base-content">{note.title}</h2>
                    <p>{note.content}</p>
                    <div className="card-actions justify-between items-center mt-4">
                        <span className='text-sm text-base-content/60'>{formatDate(new Date(note.createdAt))}</span>
                        <div className='flex items-center gap-1'>
                            <Link to={"/note/edit"} className=""><SquarePen /></Link>
                            <button className='btn btn-ghost btn-xs text-error'><Trash /></button>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default NoteCard

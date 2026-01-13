
import Note from '../model/Note.js'

export async function getNotes (_, res) {
    try{
        const notes = await Note.find().sort({createdAt:-1})
        res.status(200).json(notes)
    }catch(error){
        console.error("Error in getAllNotes controller", error)
        res.status(500).json({message: "Internal server error"})
    }
}

export async function viewNote (req, res) {
    try {
        const { id } = req.params
        const note = await Note.findById(id)
        if (!note) return res.status(404).json({ message: "note not found" })
        res.status(200).json(note)
    }catch(error){
        console.error("Error in viewNote controller", error)
        res.status(500).json({message: "Internal server error"})
    }
}

export async function createNote (req, res) {
    try{
        const {title, content} = req.body
        const newNote = new Note({title, content})
        const savedNote = await newNote.save()
        res.status(201).json(savedNote)
    }catch(error){
        console.error("Error in createNote controller", error)
        res.status(500).json({message: "Internal server error"})
    }
}

export async function editNote(req, res) {
    try{
        const {title, content} = req.body
        const {id} = req.params
        const updatedNote = await Note.findByIdAndUpdate(id, {title, content}, {new: true})
        if (!updatedNote) return res.status(404).json({message: "note not found"})
        res.status(200).json({message: "Note updated succesfully"})
    }catch(error){
        console.error("Error in editNote controller", error)
        res.status(500).json({message: "Internal server error"})
    }
}

export async function deleteANote (req, res) {
    try{
        const deletedNote = await Note.findByIdAndDelete(req.params.id)
        if (!deletedNote){
            return res.status(404).json({message: "Note not found"})
        }
        res.status(200).json({message: "Note deleted successfully"})
    }catch(error){
        console.error("Error in deleteNote controller", error)
        res.status(500).json({message: "Internal server error"})
    }
    res.status(200).send("Note deleted successfully")
}
import React, { useContext, useState } from 'react'
import noteContext from '../Context/Notes/noteContext';
import NoteState from '../Context/Notes/NoteState';

export default function AddNote(props) {

    const {showAlert} = props;

    const context = useContext(noteContext);
    const { AddNotes } = context;

    const [note, setnote] = useState({ title: "", description: "" })

    const onchange = (e) => {
        setnote({ ...note, [e.target.name]: e.target.value })
    }
    
    const handleClick = (e) => {
        e.preventDefault();
        AddNotes(note.title, note.description);
        setnote({title:" ", description:" "})



    }
    return (
        <>
            <form className='container mt-4 ' id='form'>
                <h1 className='mb-3'>Add your Notes</h1>
                <div className="mb-3 ">
                    <label htmlFor="title" className="form-label font-weight-bold">Title</label>
                    <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" onChange={onchange} value={note.title} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className=" form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="description" onChange={onchange} value={note.description} />
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleClick}>Add</button>
            </form >
        </>
    )
}

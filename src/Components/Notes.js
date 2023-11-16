import React, { useState, useContext, useEffect, useRef } from 'react'
import noteContext from '../Context/Notes/noteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';

export default function Notes(props) {
    const context = useContext(noteContext);
    const { notes, getNotes, EditNotes } = context;
    const navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem('token'))
        {
            getNotes();
        }
        else
        {
            navigate("/login");
        }
        //eslint-disable-next-line
    }, [])

    const refopen = useRef(null)
    const refClose = useRef(null);
    const [note, setnote] = useState({ etitle: "", edescription: "" })

    const updateNote = (currentNote) => {
        refopen.current.click();
        setnote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description })
        
    }

    const onChange = (e) => {
        setnote({ ...note, [e.target.name]: e.target.value })
    }

    const handleClick = (e) => {
        EditNotes(note.id, note.etitle, note.edescription)
        refClose.current.click();

    }

    return (
        <>
            <AddNote showAlert={props.showAlert} />
            <button ref={refopen} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit your Notes</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className='container mt-4 ' id='form'>
                                <div className="mb-3 ">
                                    <label htmlFor="title" className="form-label font-weight-bold">Title</label>
                                    <input type="text" className="form-control" id="etitle" name='etitle' aria-describedby="emailHelp" onChange={onChange} value={note.etitle} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className=" form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" onChange={onChange} value={note.edescription} />
                                </div>
                            </form >
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length < 5 || note.edescription.length < 5} onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <h1 className='my-3'>Your Notes</h1>
                <div className="row my-3">
                    <div className="container">
                        {notes.length === 0 && "No Notes to Display"}
                    </div>
                    {notes.map((note) => {
                        return <NoteItem key={note._id} updateNote={updateNote} note={note} />
                    })};
                </div>

            </div>
        </>

    )
}

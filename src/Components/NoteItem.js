import React, {useContext} from 'react'
import NoteState from '../Context/Notes/NoteState';
import noteContext from '../Context/Notes/noteContext';


export default function NoteItem(props) {
    const context = useContext(noteContext);
    const { DeleteNotes } = context;
    const { note, updateNote } = props;

    return (
        <div className="container col-md-3">
            <div className="card my-2">
                <div className="card-body">
                    <div className="d-flex align-items-center">
                        <h5 className="card-title">{note.title}</h5>
                    </div>
                    <p className="card-text">{note.description}</p>
                    <div className="icons">
                        <i  className="fa-solid fa-trash delete-btn" onClick={()=>{DeleteNotes(note._id)}}></i>
                        <i className="fa-solid fa-pen-to-square edit-btn"  onClick={()=>{updateNote(note)}}></i>
                    </div>
                </div>
            </div>
        </div>
    )
}

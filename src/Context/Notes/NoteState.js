import React, { useState } from "react";
import NoteContext from "./noteContext";


const NoteState = (props) => {
    const host = "http://localhost:3000"

    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial)

    // Get all notes from API 
    const getNotes = async () => {
        let url = `${host}/api/notes/fetchallnotes`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        });
        const json = await response.json();
        console.log(json);
        setNotes(json);
    }

    // Add a notes
    const AddNotes = async (title, description) => {
        const response = await fetch(`${host}/api/notes/addnotes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description })
        });
        const note = await response.json();
        setNotes(notes.concat(note));
    }


    // delete a notes 
    const DeleteNotes = async (id) => {
        let url = `${host}/api/notes/deletenotes/${id}`;
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        const json = response.json();
        const newNotes = notes.filter((note)=>{return note._id !== id})
        setNotes(newNotes);
    }
    // edit a notes 
    const EditNotes = async (id, title, description) => {

        // API Calls
        let url = `${host}/api/notes/updatenotes/${id}`;
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description })
        });
        const json = await response.json();
        console.log(json);
        let newNotes = JSON.parse(JSON.stringify(notes));
        for (let x = 0; x < newNotes.length; x++) {
            const element = newNotes[x];
            if (element._id === id) {
                newNotes[x].title = title;
                newNotes[x].description = description;
                break;
            }
        }
        setNotes(newNotes);
    }
    return (
        <NoteContext.Provider value={{ notes, AddNotes, DeleteNotes, EditNotes, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;

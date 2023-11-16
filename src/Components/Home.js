import React, { useState, useContext } from 'react'
import noteContext from '../Context/Notes/noteContext';
import Notes from './Notes';
import AddNote from './AddNote';

export default function Home(props) {
  return (
    <>
      <Notes showAlert={props.showAlert} />
    </>
  );
}

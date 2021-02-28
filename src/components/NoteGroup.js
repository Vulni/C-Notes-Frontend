import React, { useState } from 'react'
import { Note } from './Note'

export const NoteGroup = ({ user, inputValues, setInputValues, notes, setNotes, showMessage, action, setAction }) => {

    const [ confirmation, setConfirmation ] = useState("");

    return (
        <>
            <h4 className="mb-3">Your notes</h4>
            { ( !user.loading && notes.length == 0 ) && ( <div className="alert alert-primary">You have no saved notes</div> ) }
            { ( user.loading ) && ( <div className="alert alert-primary text-center">< i className="fas fa-circle-notch fa-spin"/> </div> ) }
            {
                notes.map( (note, index) => (
                    <Note user={user} inputValues={inputValues} setInputValues={setInputValues} action={action} setAction={setAction} note={note} notes={notes} setNotes={setNotes} confirmation={confirmation} setConfirmation={setConfirmation} showMessage={showMessage} key={index}/>
                ))
            }
        </>
    )
}

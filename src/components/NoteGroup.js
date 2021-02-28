import React, { useState, useEffect } from 'react'
import { Note } from './Note'

export const NoteGroup = ({ user, notes, setNotes, showMessage, values, setValues, setShowTitle }) => {

    const [ confirmation, setConfirmation ] = useState("");

    return (
        <>
            <div className="d-inline-flex align-items-center justify-content-between w-100 mb-3">
                <h4 className="mb-0">Your notes</h4>
                <button type="button" className="btn btn-secondary">
                    <i className="fas fa-filter"/>
                </button>
            </div>
            { ( !user.loading && notes.length == 0 ) && ( <div className="alert alert-primary">You have no saved notes</div> ) }
            { ( user.loading ) && ( <div className="alert alert-primary text-center">< i className="fas fa-circle-notch fa-spin"/> </div> ) }
            {
                notes.map( (note, index) => (
                    <Note user={user} note={note} notes={notes} setNotes={setNotes} key={index} showMessage={showMessage} confirmation={confirmation} setConfirmation={setConfirmation} values={values} setValues={setValues} setShowTitle={setShowTitle}/>
                ))
            }
        </>
    )
}

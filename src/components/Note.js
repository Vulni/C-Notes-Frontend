import React from 'react'
import { firebaseFirestore } from '../db/db';
import { KeywordGroup } from './KeywordGroup'

export const Note = ({ note, notes, setNotes, user, showMessage, confirmation, setConfirmation, setAction, setInputValues }) => {

    const deleteNote = async () => {
        if( !user.id ){
            let newNotes = notes.filter( nt => nt.id != note.id );
            setNotes(newNotes);
            localStorage.setItem("notes", JSON.stringify(newNotes));
            showMessage("danger", "Note deleted");
        } else {
            try {
                await firebaseFirestore.collection(`${user.id}/backend/notes`).doc(note.id).delete();
                let newNotes = notes.filter( nt => nt.id != note.id );
                setNotes(newNotes);
                showMessage("danger", "Note deleted");
            } catch(err) {
                console.log(err);
            }
        }
    }

    const showConfirmation = () => {
        if( confirmation == note.id ) setConfirmation("");
        else setConfirmation(note.id);
    }

    return (
        <div className="card mb-3 animate__animated animate__fadeIn animate__faster">
            <div className="card-body">
                <div className="card-text d-inline-flex w-100 align-items-start justify-content-between">
                    <div className="mt-2">{note.note}</div>                 
                    <button className="btn btn-danger" onClick={showConfirmation}>
                        <i className="fas fa-times"/>
                    </button>                 
                </div>
            </div>
            <div className="card-footer pt-0">
                {
                    ( confirmation != note.id ) ? ( <KeywordGroup inputValues={note} setInputValues={setInputValues} showDeleteOption={false} setAction={setAction}/> ) :
                    (
                        <>
                            <div className="mt-3 mb-2 animate__animated animate__fadeIn animate__faster">Are you sure?</div>
                            <button type="button" className="btn btn-secondary mr-2 mb-2" onClick={() => setConfirmation("")}>Cancel</button>
                            <button type="button" className="btn btn-danger mb-2" onClick={deleteNote}>Delete</button>
                        </>
                    )
                }
            </div>
        </div>
    )
}

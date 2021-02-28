import React, { useState, useEffect } from 'react'
import { NoteCreator } from '../components/NoteCreator';
import { NoteGroup } from '../components/NoteGroup';
import { firebaseFirestore } from '../db/db';

const initialState = { note:"", keywords: [], keyword: "", color: "btn-primary", id:"" };

export const Home = ({ user, setUser }) => {

    const [ action, setAction ] = useState("create");
    const [ inputValues, setInputValues ] = useState(initialState);
    const [ message, setMessage ] = useState(null);
    const [ notes, setNotes ] = useState([]);

    useEffect( async () => {
        if ( !user.id && !user.loading ) {
            let notesStorage = JSON.parse(localStorage.getItem("notes")) || [];
            setNotes(notesStorage);
        }
        else if ( user.id && !user.loading ){
            let savedNotes = [];
            const querySnapshot = await firebaseFirestore.collection(`${user.id}/backend/notes`).get();
            querySnapshot.forEach( doc => {
                savedNotes.push({ id: doc.id, ...doc.data() });
            });
            setNotes(savedNotes);
        }
    }, [user]);

    const showMessage = (type, message) => {
        setMessage({ type, message });
        setTimeout(() => {
            setMessage("");
        }, 3000);
    }

    return (
        <div className="container-fluid bg-light animate__animated animate__fadeIn animate__faster" style={{minHeight:"94vh", overflowX:"hidden"}}>
            <div className="container py-3">
                <div className="row">
                    <div className="col-12 col-md-6 col-lg-6">
                        {
                            ( action == "create" ) && ( <h4 className="mb-3">Home</h4> )
                        }
                        {
                            ( action == "edit" ) && ( <div className="alert alert-success">Editing note</div> )
                        }
                        { 
                            ( message ) && ( <div className={`alert  animate__animated animate__fadeIn animate__faster alert-${message.type}`} role="alert">{message.message}</div> ) 
                        }
                        <NoteCreator user={user} inputValues={inputValues} setInputValues={setInputValues} notes={notes} setNotes={setNotes} showMessage={showMessage} action={action} setAction={setAction}/>
                    </div> 
                    <div className="col-12 col-md-6 col-lg-6">
                        <NoteGroup user={user} setUser={setUser} inputValues={inputValues} setInputValues={setInputValues} notes={notes} setNotes={setNotes} showMessage={showMessage} action={action} setAction={setAction}/>
                    </div>   
                </div>
            </div>            
        </div>
    )
}

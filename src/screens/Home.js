import React, { useState, useEffect } from 'react'
import { NoteCreator } from '../components/NoteCreator';
import { NoteGroup } from '../components/NoteGroup';
import { firebaseFirestore } from '../db/db';

const initialState = { note:"", keywords: [], keyword: "", color: "btn-primary", id:"" };

export const Home = ({ user, setUser }) => {

    const [ showTitle, setShowTitle ] = useState(true);
    const [ values, setValues ] = useState(initialState);
    const [ message, setMessage ] = useState(null);
    const [ showCreator, setShowCreator ] = useState(true);
    const [ notes, setNotes ] = useState([]);

    useEffect( async () => {
        if (!user.id && !user.loading) {
            let notesStorage = JSON.parse(localStorage.getItem("notes")) || [];
            setNotes(notesStorage);
        }
        else if (user.id && !user.loading){
            let savedNotes = [];
            const querySnapshot = await firebaseFirestore.collection(`${user.id}/backend/notes`).get();
            querySnapshot.forEach(doc => {
                savedNotes.push({ id: doc.id, ...doc.data() });
            });
            setNotes(savedNotes);
        }
    }, [user])

    const changeShowActions = () => {
        setShowCreator(!showCreator);
    }

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
                            ( !showTitle ) ? ( <div className="alert alert-success">Editing note</div> ) :
                            (
                                <div className="d-inline-flex align-items-center justify-content-between w-100 mb-3">
                                    <h4 className="mb-0">Home</h4>
                                    <button type="button" className="btn btn-secondary" onClick={changeShowActions}>
                                        <i className="fas fa-plus"/>
                                    </button>
                                </div>
                            )
                        }
                                              
                        { ( message ) && ( <div className={`alert alert-${message.type} animate__animated animate__fadeIn animate__faster`} role="alert">{message.message}</div>) }
                        <NoteCreator user={user} setUser={setUser} showCreator={showCreator} setShowCreator={setShowCreator} notes={notes} setNotes={setNotes} showMessage={showMessage} values={values} setValues={setValues} setShowTitle={setShowTitle}/>
                    </div> 

                    <div className="col-12 col-md-6 col-lg-6">
                        <NoteGroup user={user} notes={notes} setNotes={setNotes} showMessage={showMessage} values={values} setValues={setValues} setShowTitle={setShowTitle}/>
                    </div>   

                </div>
            </div>            
        </div>
    )
}

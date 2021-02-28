import React, { useState, useEffect } from 'react'
import { firebaseFirestore } from '../db/db';
import { ButtonGroup } from './ButtonGroup';
import { KeywordGroup } from './KeywordGroup';
import uniqid from "uniqid";

const idGen = uniqid;
const initialState = { note:"", keywords: [], keyword: "", color: "btn-primary", id: "" };

export const NoteCreator = ({ user, inputValues, setInputValues, notes, setNotes, showMessage, action, setAction }) => {
 
    const { note, keywords, keyword, color, id:idNote } = inputValues;

    useEffect(() => {
        setInputValues(initialState);
    }, [notes])

    useEffect(() => {
        setInputValues({ ...inputValues, keyword: "" });
    }, [keywords])

    const handleInputs = (e) => {
        const { name, value } = e.target;
        setInputValues({ ...inputValues, [name]: value });
    }

    const addKeyword = (e) => {
        if( e.key == "Enter" && keyword != "" ) setInputValues({...inputValues, keywords: [...keywords, keyword ] });
        else if ( !e.key && keyword != "" ) setInputValues({...inputValues, keywords: [...keywords, keyword ] });
        console.log(keywords);
    }

    const createNoteWithUser = async () => {
        try {
            let response = await firebaseFirestore.collection(`${user.id}/backend/notes`).add({ note, keywords, color });
            let id = response.id;
            setNotes([ ...notes, {note, keywords, color, id} ]);
            showMessage( "primary", "Note created" );
            setInputValues( initialState );   
        } catch( err ) {
            showMessage("danger", err.message );
        }
    }

    const editNoteWithUser = async () => {
        try {
            await firebaseFirestore.collection(`${user.id}/backend/notes`).doc(`${idNote}`).set({ note, keywords, color });
            let newNotes = notes.map( nt => {
                if( nt.id == idNote ) return ({ note, keywords, color, id: idNote });
                else return nt;
            })
            setNotes(newNotes);
            setAction("create");
            setInputValues(initialState);
            showMessage("primary", "Note edited");
        } catch(err){
            showMessage("danger", err.message );
        }
    }

    const createNoteNoUser = async () => {
        setNotes([ ...notes, {note, keywords, color, id:idGen("note-")} ]);
        localStorage.setItem( "notes", JSON.stringify([ ...notes, {note, keywords, color, id:idGen("note-")} ]));
        showMessage("primary", "Note created");
        setInputValues( initialState );           
    }

    const editNoteNoUser = async () => {
        
    }

    const createNote = () => {
        if( !note ) showMessage("danger", "Note field required");
        else if ( user.id && !idNote ){
            createNoteWithUser();
        } else if ( !user.id && !idNote ){
            createNoteNoUser();
        } else if ( user.id && idNote ){
            editNoteWithUser();
        } else if ( !user.id && idNote ){
            editNoteNoUser();
        }
    }

    const cancelEdit = () => {
        setAction("create");
        setInputValues(initialState);
    }

    return (        
        <div className="card animate__animated animate__fadeIn animate__faster mb-4">
            <div className="card-body">
                <div className="form-group">
                    <label>Note</label> <small className="text-muted">(Required)</small>
                    <input className="form-control" name="note" onChange={handleInputs} value={note} autoComplete="off"/>
                </div>
                <div className="form-group">
                    <label>Colors</label> 
                    <ButtonGroup inputValues={inputValues} setInputValues={setInputValues}/>
                </div>
                <div className="form-group">
                    <label>Keywords</label>
                    <div className="input-group">
                        <input className="form-control" name="keyword" value={keyword} onChange={handleInputs} autoComplete="off" onKeyDown={addKeyword}/>
                        <div className="input-group-append">
                            <button className="btn btn-secondary" onClick={addKeyword}>Add</button>
                        </div>
                    </div>
                    <KeywordGroup inputValues={inputValues} setInputValues={setInputValues} setAction={setAction} showDeleteOption={true}/>
                </div>
                {
                    ( action == "edit" ) ?
                    ( 
                        <>
                            <button type="button" className={`btn text-white ${color}`} onClick={createNote}>Edit</button>
                            <button type="button" className="btn btn-danger ml-2" onClick={cancelEdit}>Cancel</button>
                        </> 
                    ) :
                    ( <button type="button" className={`btn text-white ${color}`} onClick={createNote}>Create</button> ) 
                }
            </div>
        </div>
    )
}

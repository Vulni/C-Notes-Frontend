import React, { useState, useEffect } from 'react'
import { firebaseFirestore } from '../db/db';
import { ButtonGroup } from './ButtonGroup';
import { KeywordGroup } from './KeywordGroup';
import uniqid from "uniqid";

const idGen = uniqid;
const initialState = { note:"", keywords: [], keyword: "", color: "btn-primary", id: "" };

export const NoteCreator = ({ user, setUser, showCreator, setShowCreator, notes, setNotes, showMessage, values, setValues, setShowTitle }) => {
 
    const { note, keywords, keyword, color, id:idNote } = values;

    useEffect(() => {
        setValues(initialState);
    }, [notes])

    useEffect(() => {
        setValues({ ...values, keyword: "" });
    }, [keywords])

    const handleInputs = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    }

    const addKeyword = (e) => {
        if( e.key == "Enter" && keyword != "" ) setValues({...values, keywords: [...keywords, keyword ] });
        else if ( !e.key && keyword != "") setValues({...values, keywords: [...keywords, keyword ] });
    }

    const createNote = async () => {
        if( !note ) showMessage("danger", "Note field required")
        else if ( user.id && !idNote ){
            try {
                let response = await firebaseFirestore.collection(`${user.id}/backend/notes`).add({note, keywords, color});
                let id = response.id;
                setNotes([...notes, {note, keywords, color, id}]);
                showMessage("primary", "Note created");
                setValues(initialState);
            } catch( err ){
                console.log(err);
            }
        } else if ( !user.id && !idNote ){
            setNotes([...notes, {note, keywords, color, id:idGen("note-")}]);
            localStorage.setItem("notes", JSON.stringify([...notes, {note, keywords, color, id:idGen("note-")}]));
            showMessage("primary", "Note created");
            setValues(initialState);
        } else if ( user.id && idNote ){
            try {
                await firebaseFirestore.collection(`${user.id}/backend/notes`).doc(`${idNote}`).set({note, keywords, color});
                let newNotes = notes.map( nt => {
                    if(nt.id == idNote) return ({note, keywords, color, id: idNote });
                    else return nt;
                })
                setNotes(newNotes);
                setShowTitle(true);
                setValues(initialState);
                showMessage("primary", "Note edited");
            } catch(err){
                console.log(err);
            }
        } else if ( !user.id && idNote ){
            
        }
    }

    const cancelEdit = () => {
        setShowTitle(true);
        setValues(initialState);
    }

    return (
        <>
            {
                ( showCreator ) &&
                (
                    <div className="card animate__animated animate__fadeIn animate__faster mb-4">
                        <div className="card-body">

                            <div className="form-group">
                                <label>Note</label> <small className="text-muted">(Required)</small>
                                <input className="form-control" name="note" onChange={handleInputs} value={note} autoComplete="off"/>
                            </div>

                            <div className="form-group">
                                <label>Colors</label> 
                                <ButtonGroup values={values} setValues={setValues}/>
                            </div>

                            <div className="form-group">
                                <label>Keywords</label>
                                <div className="input-group">
                                    <input className="form-control" name="keyword" value={keyword} onChange={handleInputs} autoComplete="off" onKeyDown={addKeyword}/>
                                    <div className="input-group-append">
                                        <button className="btn btn-secondary" onClick={addKeyword}>Add</button>
                                    </div>
                                </div>
                                <KeywordGroup values={values} setValues={setValues}/>
                            </div>

                            {
                                ( idNote ) ?
                                ( <button type="button" className={`btn text-white ${color}`} onClick={createNote}>Edit</button> ) :
                                ( <button type="button" className={`btn text-white ${color}`} onClick={createNote}>Create</button> ) 
                            }
                            { ( idNote ) && <button type="button" className="btn btn-danger ml-2" onClick={cancelEdit}>Cancel</button> }

                        </div>
                    </div>
                )
            }
        </>
    )
}

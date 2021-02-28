import React, { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { firebaseAuth } from "../db/db";

export const Navbar = ({ user, setUser }) => {

    const location = useLocation();

    const signOut = () => {
        firebaseAuth.signOut();
        setUser("");
    }

    return (
        <div className="navbar navbar-dark bg-dark">
            <div className="container d-inline-flex align-items-center justify-content-between">
                <div className="col-12 d-flex align-items-center justify-content-between pl-0 pr-0">
                    <NavLink className="navbar-brand" to="/" exact>React Notes</NavLink>
                    { ( location.pathname == "/" && !user.id && !user.loading ) && ( <NavLink className="btn btn-outline-light" to="/signin">Sign in</NavLink> ) }
                    { ( user.id && !user.loading ) && ( <button className="btn btn-outline-danger" onClick={signOut}>Sign out</button> ) }
                    { ( user.loading ) && ( <button className="btn btn-primary"> <i className="fas fa-circle-notch fa-spin"/> </button> ) }                  
                </div>
            </div>
        </div>
    )
}

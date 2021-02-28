import React, { useState, useEffect } from 'react';
import { useHistory, NavLink } from 'react-router-dom'
import { firebaseAuth, firebaseGoogle, firebaseFacebook } from "../db/db";

const initialState = { email: "andrewhbhbhb@gmail.com", password: "HowBigHowBlue" };

export const Signin = ({ user, setUser }) => {

    const [ message, setMessage ] = useState("");
    const [ inputValues, setInputValues ] = useState(initialState);
    const { email, password } = inputValues;
    const history = useHistory();
    
    useEffect(() => {
        if( user.id ) history.push("/");
    }, [user, history]);

    const handleInputs = (e) => {
        const { name, value } = e.target;
        setInputValues({ ...inputValues, [name]: value });
    }

    const showAlert = (message) => {
        setMessage(message);
        setTimeout(() => {
            setMessage("");
        }, 3000);
    }

    const signin = async (method) => {
        switch (method) {
            case "email":  
                if( !email || !password ) showAlert("Fields information required");    
                else {
                    try {
                        const response = await firebaseAuth.signInWithEmailAndPassword(email, password);               
                        const uid = response.user.uid;
                        setUser({ id: uid, loading:false });
                        history.push("/");                                      
                    } catch(err) {
                        showAlert(err.message);
                    }
                }         
            break;
            case "google":    
                try {
                    const response = await firebaseAuth.signInWithPopup(firebaseGoogle);
                    setUser({ id: response.user.uid, loading:false });
                    history.push("/");   
                } catch(err) {
                    showAlert(err.message);
                }           
            break;
            case "facebook":   
                try {
                    const response = await firebaseAuth.signInWithPopup(firebaseFacebook);
                    setUser({ id: response.user.uid, loading:false });
                    history.push("/");   
                } catch(err) {
                    showAlert(err.message);
                }            
            break;
            default: 
            break;
        }
    }

    return (
        <div className="container-fluid bg-light animate__animated animate__fadeIn animate__faster" style={{minHeight:"94vh"}}>
            <div className="container py-3">
                {
                    ( !message ) ?
                    (
                        <div className="row mb-2 animate__animated animate__fadeIn animate__faster">
                            <div className="col-12 col-md-6 col-lg-6">
                                <h4>Sign in</h4>
                            </div>
                        </div>
                    ) :
                    (
                        <div className="row mb-2">
                            <div className="col-12 col-md-6 col-lg-6">
                                <div class="alert alert-danger animate__animated animate__fadeIn animate__faster" role="alert">
                                    {message}
                                </div>
                            </div>
                        </div>
                    )
                }
                <div className="row">
                    <div className="col-12 col-md-6 col-lg-6">
                        <div className="card">
                            <div className="card-body">
                                <div className="form-group">
                                    <label>Email</label>
                                    <input className="form-control" name="email" value={email} onChange={handleInputs}/>
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input className="form-control" name="password" type="password" value={password} onChange={handleInputs}/>
                                </div>
                                <div className="form-group">
                                    <label>Or</label>
                                    <hr className="mt-1 mb-3"/>
                                    <button className="btn btn-dark mr-2" onClick={() => signin("google")}>Sign in with Google</button>
                                    <button className="btn btn-primary" onClick={() => signin("facebook")}>Sign in with Facebook</button>
                                    <hr className="my-3"/>
                                </div>
                                <NavLink to="/signup">Don´t you have an account? Sign up!</NavLink> <br/>
                                <NavLink to="/signup" className="text-dark">Did you forget your password?</NavLink> <br/>                              
                                <button type="button" className="btn btn-primary mt-3" onClick={() => signin("email")}>Sign in</button>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    );
}

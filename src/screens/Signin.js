import React, { useState, useEffect } from 'react';
import { useHistory, NavLink  } from 'react-router-dom'
import { firebaseAuth } from "../db/db";
import { firebaseGoogle } from "../db/db";
import { firebaseFacebook } from "../db/db";


const initialState = { email: "andrewhbhbhb@gmail.com", password: "HowBigHowBlue" };

export const Signin = ({ user, setUser }) => {

    const [ message, setMessage ] = useState("");
    const [ values, setValues ] = useState(initialState);
    const { email, password } = values;
    const history = useHistory();

    const handleInputs = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    }

    const showAlert = (message) => {
        setMessage(message);
        setTimeout(() => {
            setMessage("");
        }, 3000);
    }

    const signinUser = async () => {
        if( !email || !password ) showAlert("Fields information required");
        else {
            try {
                const response = await firebaseAuth.signInWithEmailAndPassword(email, password);               
                const uid = response.user.uid;
                setUser({id: uid, loading:false});
                history.push("/");                                      
            } catch(err) {
                showAlert(err.message);
            }
        }
    }

    const signInWithGoogle = async () => {
        const response = await firebaseAuth.signInWithPopup(firebaseGoogle);
        try {
            setUser({id: response.user.uid, loading:false});
            history.push("/");   
        } catch(err) {
            console.log(err);
        }
    }

    const signInWithFacebook = async () => {
        const response = await firebaseAuth.signInWithPopup(firebaseFacebook);
        try {
            setUser({id: response.user.uid, loading:false});
            history.push("/");   
        } catch(err) {
            console.log(err);
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
                                    <button className="btn btn-dark mr-2" onClick={signInWithGoogle}>Sign in with Google</button>
                                    <button className="btn btn-primary" onClick={signInWithFacebook}>Sign in with Facebook</button>
                                    <hr className="my-3"/>
                                </div>

                                <NavLink to="/signup">Don´t you have an account? Sign up!</NavLink> <br/>
                                <NavLink to="/signup" className="text-dark">Did you forget your password?</NavLink> <br/>
                                
                                <button type="button" className="btn btn-primary mt-3" onClick={signinUser}>Sign in</button> 

                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    );
}

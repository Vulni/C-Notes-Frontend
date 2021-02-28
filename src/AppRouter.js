import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { firebaseAuth } from './db/db'
import { Home } from './screens/Home'
import { Signin } from './screens/Signin'
import { Signup } from './screens/Signup'

export const AppRouter = () => {

    const [ user, setUser ] = useState({ id:"", loading:true });

    useEffect(() => {
        firebaseAuth.onAuthStateChanged( (user) => {
            if(user?.uid) setUser({id:user.uid, loading:false});
            else setUser({id:"", loading:false})
        });
    }, []);

    return (
        <Router>
            <Navbar user={user} setUser={setUser}/>

            <Route path="/" exact>
                <Home user={user} setUser={setUser}/>
            </Route>

            <Route path="/signin">
                <Signin user={user} setUser={setUser}/>
            </Route>

            <Route path="/signup">
                <Signup user={user} setUser={setUser}/>
            </Route>

        </Router>
    )
}

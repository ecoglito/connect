import * as React from 'react';
import './styles.css';
import { ReactComponent as Logo } from './logos/alchemy-white.svg';
import { doc, getDoc } from "firebase/firestore"; 

import { db } from "../firebase";
import { getAuth, signOut } from "firebase/auth";



async function test() {
    const docRef = doc(db, "users", 
    "RIFmIO4BYBtJnffpo2rz");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }

     
}

function Signout() {
    const auth = getAuth();
    signOut(auth).then(() => {
    // Sign-out successful.
    }).catch((error) => {
    // An error happened.
    });
}


function Navbar(user) {
    console.log(user);
    return (
    <nav className ="nav">
        <Logo className = "logo"/>
        <div className = "nav-links">
           <a href = "">Dashboard</a>
           <a href = "">Apps</a>
           <a href = "">Explorer</a>
           <a href = "">Mempool</a>
           <a href = "">Notify</a>
           <a href = "/">Marketplace</a>  
        </div>

        {user.user ? <button className = "nav-button" onClick = {Signout}>Signout</button> : <a href = "/login">Login</a>}
        
    </nav>
    )
}

export {Navbar}


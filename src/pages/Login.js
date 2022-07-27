import * as React from 'react'
import "./styles.css"
import {Navbar} from "../components/Navbar";
import { auth, db } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; 
import {getAuth} from "firebase/auth";



function Login () {
    const [email, setEmail] = React.useState("gavin@hooli.com");
    const [password, setPassword] = React.useState("●●●●●●●●");

    const onLogin = (event) =>  {
        event.preventDefault();    

        signInWithEmailAndPassword(getAuth(), email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user.uid);
            window.location.href = "/";
        })
        .catch((error) => {
            
            const errorCode = error.code;
            const errorMessage = error.message;

            // ..
        });
        console.log(email, password);
    }

    return (
        <div className = "page">
        <Navbar/>
        <div className ="login-content">
            <div className = "login-modal">
                <div className = "login-header">
                    <h4>Login</h4>
                </div>
                <form onSubmit = {onLogin}>
                    <div className ="login-container">
                        <label htmlFor ="email">EMAIL</label>
                        <input onChange = {value => setEmail(value.target.value)} type = "text" id = "email" />
                        <label htmlFor = "password">PASSWORD</label>
                        <input onChange = {value => setPassword(value.target.value)} type = "password" id = "password" />
                        <button onSubmit = {onLogin} className = "submit-button" type ="submit">Log in</button>
                    </div>
                </form>
            </div>
            <table className = "login-demo-accounts">
                <th>Email</th>
                <th>Password</th>
                <tr>
                    <td>
                        free@alchemy.com
                    </td>
                    <td>
                        FreeAlchemyAccount
                    </td>
                </tr>
                <tr>
                    <td>
                        growth@alchemy.com
                    </td>
                    <td>
                        GrowthAlchemyAccount
                    </td>
                </tr>
                <tr>
                    <td>
                        vip@alchemy.com
                    </td>
                    <td>
                        VipAlchemyAccount
                    </td>
                </tr>
                <tr>
                    <td>
                        admin@alchemy.com
                    </td>
                    <td>
                        AdminAlchemyAccount
                    </td>
                </tr>
            </table>
        </div>
    </div>
    )
}

export default Login;
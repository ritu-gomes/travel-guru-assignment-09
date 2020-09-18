import React, { useContext, useState } from 'react';
import firebaseConfig from './firebaseConfig';
import "./login.css";
import * as firebase from "firebase/app";
import "firebase/auth";
import { userContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';

firebase.initializeApp(firebaseConfig);

const Login = () => {
    const [user,setUser] = useState({
        isLoggedIn: false,
        name: '',
        email:'',
        password: '',
        error: '',
        error2: ''
    });
    let [form,setForm] = useState(true);
    const [confirm,setConfirm] = useState(false);
    const handleToggleform = () => {
        user.error = '';
        user.error2 = '';
        setForm(!form);
    }
    const [loggedUser,setLoggedUser] = useContext(userContext);
    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };
    
    const handleGoogleSignIn = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
        .then(result => {
            const {displayName,email} = result.user;
            const newUser = {...user};
                newUser.name = displayName;
                newUser.email = email;
                newUser.isLoggedIn = true;
            setUser(newUser);
            setLoggedUser(newUser);
            history.replace(from);
    
          }).catch(function(error) {
            const errorMessage = error.message;
            const newUser = {...user};
                newUser.isLoggedIn = false;
                newUser.error = errorMessage;
            setUser(newUser);
          });
    }
    const handleFacebookSignIn = () => {
        var provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(provider)
        .then(result => {
            console.log(result);
            const {displayName,email} = result.user;
            const newUser = {...user};
                newUser.name = displayName;
                newUser.email = email;
                newUser.isLoggedIn = true;
            setUser(newUser);
            setLoggedUser(newUser);
            history.replace(from);
          }).catch(function(error) {
            const errorMessage = error.message;
            const newUser = {...user};
                newUser.isLoggedIn = false;
                newUser.error = errorMessage;
            setUser(newUser);
          });
    }
    const getInputValue = (e) => {
        let validForm;
        if(e.target.name === "email"){
            validForm = /\S+@\S+\.\S+/.test(e.target.value);
        }
        if(e.target.name === "password"){
            const validPassword = /\d{1}/.test(e.target.value);
            const validLength = e.target.value.length > 5;
            validForm = validPassword && validLength;
        } 
        if(validForm){
            const newUser = {...user};
            newUser[e.target.name] = e.target.value;
            setUser(newUser);
        }
    }
    const getConfirmed = (e) => {
        debugger;
        if(e.target.value === user.password && user.password !== ''){
            setConfirm(true);
            alert("password confirmed");
        }
    }
    const handleSubmit = (e) =>{
        if(confirm === false){
            alert("password did'nt match");
        }
        if(user.email && user.password && confirm) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
            .then(res => {
                const newUser = {...user};
                newUser.isLoggedIn = true;
                newUser.error = '';
                setUser(newUser);
                setLoggedUser(newUser);
                history.replace(from);
            })
            .catch(function(error) {
                const newUser = {...user};
                newUser.isLoggedIn = false;
                newUser.error = error.message;
                setUser(newUser);
              });
        }
        e.preventDefault();
    }
    const handleSubmitLogIn = (e) => {
        if(user.email && user.password){
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
            .then(res => {
                const newUser = {...user};
                newUser.isLoggedIn = true;
                newUser.error2 = '';
                setUser(newUser);
                setLoggedUser(newUser);
                history.replace(from);
            })
            .catch(function(error) {
                const newUser = {...user};
                newUser.isLoggedIn = false;
                newUser.error2 = error.message;
                setUser(newUser);
              });
        }
        e.preventDefault();
    }

    return (
        <div className="login">
            <h3>Form</h3>
            {form &&
                <div>
                    <h5 style={{color: "red"}}>{user.error}</h5>
                    <form onSubmit={handleSubmit}>
                        <input onBlur={getInputValue} className="width" type="text" name="name" id="name" placeholder="Full Name" required/> <br/>
                        <input onBlur={getInputValue} className="width" type="email" name="email" placeholder="Your Email" required/><br/>
                        <input onBlur={getInputValue} className="width" type="password" name="password" id="password" placeholder="Password" required/><br/>
                        <input onBlur={getConfirmed} className="width" type="password" name="confirm" id="confirm" placeholder="Confirm Password" required/><br/>
                        <input className="width" type="submit" value="Sign Up"/><br/>
                        <h6>already have an account? <span style={{cursor: "pointer"}} onClick={() => handleToggleform()}>log In</span></h6>
                    </form>
                </div>
        }
            {!form &&
                <div>
                    <h5 style={{color: "red"}}>{user.error2}</h5>
                    <form onSubmit={handleSubmitLogIn}>
                        <input onBlur={getInputValue} className="width" type="email" name="email" placeholder="Your Email" required/><br/>
                        <input onBlur={getInputValue} className="width" type="password" name="password" placeholder="Password" required/><br/>
                        <input className="width" type="submit" value="Log In"/><br/>
                        <h6>Dont have an account? <span style={{cursor: "pointer"}} onClick={() => handleToggleform()}>create account</span></h6>
                    </form>
                </div>
        }
            <h5>or</h5>
            <button onClick={handleGoogleSignIn} className="width-btn">Log In With Google</button> <br/>
            <button onClick={handleFacebookSignIn} className="width-btn">Log In With Facebook</button>
        </div>
    );
};

export default Login;
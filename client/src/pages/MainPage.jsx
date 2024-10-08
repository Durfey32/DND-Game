import React from "react";
import { useState, useEffect, useLayoutEffect } from "react";
import auth from "../utils/auth";
import ErrorPage from "./ErrorPage";
import "../index.css";   
import { retrieveUsers } from "../api/playerAPI.jsx";
import { Link } from "react-router-dom";


// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function MainPage() {
    const [error, setError] = useState(false);
    const [loginCheck, setLoginCheck] = useState(false);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (loginCheck) {
            const data = auth.getToken();
           console.log('login check');
           console.log(data);
            fetchUsers();
        }
    }, [loginCheck]);

    useLayoutEffect(() => {
        checkLogin();
    }, []);

    const checkLogin = () => {
        if (auth.loggedIn()) {
            setLoginCheck(true);
        }
    };

    const fetchUsers = async () => {
        try {
            const data = await retrieveUsers();
            setUsers(data)
        } catch (err) {
            console.error('Failed to retrieve tickets:', err);
            setError(true);
        }
    }

    if (error) {
        return <ErrorPage />;
    }

    return (
       
            <div className="main-page">
                <h1> DND Style Game</h1>
                <p> Welcome to the DND Style Game! </p>
                <p> Please login to play the game. </p>
                <button>
                    <Link to="/login">Login</Link>
                </button>
             
            </div>
       
    );
}
export default MainPage;   



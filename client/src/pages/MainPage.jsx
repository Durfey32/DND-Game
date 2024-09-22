import React from "react";
import { useState, useEffect, useLayoutEffect } from "react";
import auth from "../utils/auth";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function MainPage() {
    const [error, setError] = useState(false);
    const [loginCheck, setLoginCheck] = useState(false);

    useEffect(() => {
        if (loginCheck) {
           console.log('login check');
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
             
            </div>
       
    );
}
export default MainPage;   



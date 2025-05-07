import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Auth({ code, setCurrAccessToken }) {
    const [accessToken, setAccessToken] = useState();
    const [refreshToken, setRefreshToken] = useState();
    const [expiresIn, setExpiresIn] = useState();

    useEffect(() => {
        axios.post('http://localhost:5000/login', { code })
            .then(res => {
                setAccessToken(res.data.accessToken);
                setRefreshToken(res.data.refreshToken);
                setExpiresIn(res.data.expiresIn);
                window.history.pushState({}, null, '/');
            })
            .catch(err => {
                console.error("Error during login:", err);
            });
    }, [code]);

    useEffect(() => {
        if (accessToken) {
            setCurrAccessToken(accessToken); 
        }
    }, [accessToken]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (!refreshToken || !expiresIn) return;
            axios.post('http://localhost:5000/refresh', { refreshToken })
                .then(res => {
                    setAccessToken(res.data.accessToken);
                    setExpiresIn(res.data.expiresIn);
                })
                .catch(err => {
                    console.error("Error during token refresh:", err);
                });
        }, (expiresIn - 60) * 1000);

        return () => clearInterval(interval);
    }, [refreshToken, expiresIn]);

    return null; 
}
  
export default Auth;

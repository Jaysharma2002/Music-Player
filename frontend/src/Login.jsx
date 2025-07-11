import React from "react";
import '../styles/Login.css'
const AUTH_URL="https://accounts.spotify.com/authorize?client_id=0647e19f61a44c20bf6b505514767f63&response_type=code&redirect_uri=https://music-player-1-dpb9.onrender.com&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20playlist-read-private"

function Login(){
    return(
        <div className="Content">
            <a className="loginbtn" href={AUTH_URL}>Login With spotify</a>
        </div>
    )
}
export default Login
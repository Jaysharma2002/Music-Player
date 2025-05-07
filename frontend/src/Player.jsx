import React from "react";
import SpotifyWebPlayer from "react-spotify-web-playback";
function Player({currAccessToken,trackUri}){
    return(
            <SpotifyWebPlayer
            token={currAccessToken}
            play={true}
            styles={{
                bgColor: "black",          // Black background
                color: "white",            // White text
                loaderColor: "white",      // Loader color
                sliderColor: "green",
                sliderHandleColor: "white", 
                trackArtistColor: "#ccc",
                trackNameColor: "white",  
            }}
            uris={trackUri?[trackUri]:[]}
            />
)
}

export default Player
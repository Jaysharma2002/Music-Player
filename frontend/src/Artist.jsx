import React from "react";
import '../styles/Artist.css'
import ArtistDetail from "./ArtistDetail";
function Artist({searchArtistsResult,currAccessToken,setSelectedSong,setOnShow,setAlbumDetailImage,setactiveComponent}){
    return (
        <div class="artist-container">
            {searchArtistsResult.length>0?(searchArtistsResult.map((Artist)=>(
                <div className="artistcontainer" key={Artist.id} onClick={()=>setactiveComponent(<ArtistDetail selectedArtist={Artist} currAccessToken={currAccessToken} setSelectedSong={setSelectedSong} setOnShow={setOnShow} setAlbumDetailImage={setAlbumDetailImage} setactiveComponent={setactiveComponent}/>)}>
                    <img src={Artist.images[0]?.url}></img>
                    <span className="artistname" style={{color:'white'}}>{Artist.name}</span>
                    <span className="fadeitemname">{Artist.type}</span>
                </div>
            ))):(<p>No Artist Found</p>)}
        </div>
    )


}

export default Artist
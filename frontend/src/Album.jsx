import React,{useState,useEffect,useRef} from "react";
import AlbumDetail from "./AlbumDetail.jsx";
import '../styles/Album.css'
function Album({currAccessToken,searchAlbumResult,setactiveComponent,setSelectedSong,setOnShow,setAlbumDetailImage}){
    const current=useRef(null);
    useEffect(() => {
            if (current.current) {
                current.current.scrollTo({ top:0, behavior: "smooth" });
            }
        }, []);
    return(
        <div className="Album-container" ref={current}>
            {searchAlbumResult.length>0?(searchAlbumResult.map((album)=>(
                <div className="albumcontainer" key={album.id} onClick={()=>{setactiveComponent(<AlbumDetail currAccessToken={currAccessToken} currAlbumDetail={album} setSelectedSong={setSelectedSong} setOnShow={setOnShow} setAlbumDetailImage={setAlbumDetailImage}/>)}}>
                    <img src={album.images[0]?.url}></img>
                    <span className="artistname" style={{color:'white'}}>{album.name}</span>
                    <div className="albummetadata" style={{textAlign:'centre'}}>
                    <span className="fadeitemname">{album.release_date.slice(0,4)}.</span>
                    <span className="fadeitemname">{album.artists[0]?.name}</span>
                    </div>
                </div>
            ))):(<p>No Albums Found</p>)}
        </div>
    )

}

export default Album;

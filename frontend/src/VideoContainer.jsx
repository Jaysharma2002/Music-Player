import React,{useEffect} from "react";
import '../styles/VideoContainer.css'
function VideoContainer({ selectedSong,onShow,setOnShow,albumdetailimage,setAlbumDetailImage}) {
    console.log(selectedSong);
    if (!selectedSong) {
        return <p style={{ color: 'white' }}>No song selected</p>;
    }
    function close(){
        setOnShow(false)
    }
    return (
        <div className={`video-container ${onShow?'visible':'hide'}`}>
            <button className="close" onClick={()=>{close();}}><i class="fa-solid fa-xmark"></i></button>
            <div className="containervideo">
                <p className="selectedsongname">{selectedSong.name}</p>
                <p className="selectedsongartist">Artist: {selectedSong.artists?selectedSong.artists.map(artist => artist.name).join(', '):"No Available"}</p>
                {!albumdetailimage?(
                    <img src={selectedSong.album?selectedSong.album.images[0]?.url:selectedSong.images[0]?.url} alt={selectedSong.name} style={{ width: '200px', height: '200px', borderRadius: '10px' }}/>
                ):(
                    <img src={albumdetailimage} alt={selectedSong.name} style={{ width: '200px', height: '200px', borderRadius: '10px' }}/>
                )}
                
            </div>
        </div>
    );
}

export default VideoContainer;

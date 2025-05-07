import React from "react";
import '../styles/Song.css'
function Song({searchResult,setSelectedSong,setOnShow,setAlbumDetailImage}){

    return (
        <table className="table1" >
             <thead >
                 <tr>
                     <th className="playlistdetailheading" style={{paddingTop:'20px',paddingLeft:'10px'}}>#</th>
                     <th className="playlistdetailheading" style={{paddingTop:'20px'}}>Title</th>
                     <th className="playlistdetailheading" style={{paddingTop:'20px'}}>Album</th>
                     <th className="playlistdetailheading" style={{paddingTop:'20px'}}>Duration</th>
                 </tr>
             </thead>
             <tbody className="tbody3"> 
            {searchResult.map((track,index)=>(
                    <tr className="trackshover1" key={track.uri} onClick={()=>{setSelectedSong(track);setOnShow(true);setAlbumDetailImage(null)}} >
                        <td className="homeitemname" style={{paddingLeft:'10px'}}>  {index+1}</td>
                        <td>
                            <div className="trackhome1">
                                <img src={track.album.images[0]?.url} style={{ width: '50px', height: '50px' ,borderRadius:'10px'}} alt="Album" />
                                <div className="trackdes"><span className="homeitemname">{track.name}</span><span className="fadeitemname">{track.artists[0].name}</span></div>
                            </div>
                        </td>
                        <td className="trackhome1">
                            <p className="homeitemname">{track.album.name}</p>
                        </td>
                        <td className="homeitemname" style={{paddingRight:'10px'}}>{Math.floor(track.duration_ms/60000)}:
                            {Math.floor((track.duration_ms%60000)/1000).toFixed(0)}
                        </td>
                    </tr>
            ))}
            </tbody>
            </table>
    )

}

export default Song
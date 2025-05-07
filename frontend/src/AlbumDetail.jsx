import React,{useEffect, useState} from "react";
import SpotifyWebApi from "spotify-web-api-node";
import '../styles/AlbumDetails.css'
function AlbumDetail({currAccessToken,currAlbumDetail,setSelectedSong,setOnShow,setAlbumDetailImage}){
    const [tracks,setTracks]=useState([])
    const spotifyApi=new SpotifyWebApi({
        clientId:'0647e19f61a44c20bf6b505514767f63',
    })

    useEffect(()=>{
        if(!currAccessToken) return
        if(!currAlbumDetail) return
        spotifyApi.setAccessToken(currAccessToken)
        const Albumid=currAlbumDetail.id
        spotifyApi.getAlbumTracks(Albumid)
        .then((res)=>{
            const fetchedTracks=res.body.items
            setTracks(fetchedTracks)
        })
    },[currAccessToken,currAlbumDetail])

    return (
        <div className="AlbumDetail">
            <div className='artistdetailheader'>
        <img src={currAlbumDetail.images[0]?.url}></img>
        <div className='playlistinfo'>
          <p className='selectedplaylisttype'>{currAlbumDetail.type}</p>
          <span className='selectedplaylistname'>{currAlbumDetail.name}</span>
          <p className='selectedplaylistowner'>{currAlbumDetail.artists[0].name}</p>
        </div>
      </div>
      <table className="table1" >
             <thead >
                 <tr>
                     <th className='playlistdetailheading' style={{paddingTop:'20px',paddingLeft:'10px'}}>#</th>
                     <th className='playlistdetailheading' style={{paddingTop:'20px'}}>Title</th>
                 </tr>
             </thead>
             <tbody className="tbody"> 
            {tracks.length>0?(tracks.map((track,index)=>(
                    <tr className="trackshover3" key={track.uri} onClick={()=>{setAlbumDetailImage(currAlbumDetail.images[0]?.url);setSelectedSong(track);setOnShow(true)}}>
                        <td className="playlistdetailitemname" style={{paddingLeft:'10px'}}>  {index+1}</td>
                        <td>
                            <div className="trackhome3">
                                <img src={currAlbumDetail.images[0]?.url} style={{ width: '50px', height: '50px' ,borderRadius:'10px'}} alt="Album" />
                                <div className="trackdes"><span className="playlistdetailitemname">{track.name}</span><span className="fadeitemname">{track.artists[0].name}</span></div>
                            </div>
                        </td>
                    </tr>
            ))):(<></>)}
            </tbody>
        </table>
        </div>
    )

}

export default AlbumDetail
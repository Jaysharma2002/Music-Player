import React, { useEffect, useState } from 'react';
import SpotifyWebApi from 'spotify-web-api-node';
import '../styles/PlaylistDetail.css';
function PlaylistDetail({ selectedPlaylist, currAccessToken,setSelectedSong,setOnShow}) {
  const [tracks, setTracks] = useState([]);
  const spotifyApi = new SpotifyWebApi({
    clientId: '0647e19f61a44c20bf6b505514767f63',
  });

  useEffect(() => {
    if (!currAccessToken || !selectedPlaylist) return;
    spotifyApi.setAccessToken(currAccessToken);
    const playlistId = selectedPlaylist.id;
    spotifyApi.getPlaylistTracks(playlistId)
      .then((response) => {
        const fetchedTracks = response.body.items.map((item) => item.track); 
        setTracks(fetchedTracks); 
      })
      .catch((err) => console.error('Error fetching tracks:', err));
  }, [currAccessToken, selectedPlaylist]); 

  return (
    <div className='playlisthome'>
      <div className='artistdetailheader'>
        <img src={selectedPlaylist.images[0]?.url}></img>
        <div className='playlistinfo'>
          <p className='selectedplaylisttype'>{selectedPlaylist.type}</p>
          <span className='selectedplaylistname'>{selectedPlaylist.name}</span>
          <p className='selectedplaylistowner'>{selectedPlaylist.owner?.display_name || "Unknown"}</p>
        </div>
      </div>
      <table className='table1' >
             <thead >
                 <tr>
                     <th className='playlistdetailheading' style={{paddingTop:'20px',paddingLeft:'10px'}}>#</th>
                     <th className='playlistdetailheading' style={{paddingTop:'20px'}}>Title</th>
                     <th className='playlistdetailheading' style={{paddingTop:'20px'}}>Album</th>
                     <th className='playlistdetailheading' style={{paddingTop:'20px'}}>Duration</th>
                 </tr>
             </thead>
             <tbody className="tbody3"> 
            {tracks.map((track,index)=>(
                    <tr className="trackshover1" key={track.uri} onClick={()=>{setSelectedSong(track);setOnShow(true)}}>
                        <td className="playlistdetailitemname" style={{paddingLeft:'10px'}}>  {index+1}</td>
                        <td>
                            <div className="trackhome1">
                                <img src={track.album.images[0]?.url} style={{ width: '50px', height: '50px' ,borderRadius:'10px'}} alt="Album" />
                                <div className="trackdes"><span className="homeitemname">{track.name}</span><span className="fadeitemname">{track.artists[0].name}</span></div>
                            </div>
                        </td>
                        <td className='trackhome1'>
                          <p className='homeitemname'>{track.album.name}</p>
                        </td>
                        <td className='playlistdetailitemname'>{Math.floor(track.duration_ms/60000)}.
                            {Math.floor((track.duration_ms%60000)/1000).toFixed(0)}
                        </td>
                    </tr>
            ))}
            </tbody>
        </table>
      </div>
  );
}

export default PlaylistDetail;

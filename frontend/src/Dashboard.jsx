import React, { useState, useEffect ,useRef } from "react";
import '../styles/Dashboard.css';
import Auth from './Auth.jsx';
import SpotifyWebApi from "spotify-web-api-node";
import Content from "./Content.jsx";
import Playlist from "./Playlist.jsx";
import VideoContainer from "./VideoContainer.jsx";
import Player from "./Player.jsx";
function Dashboard({ code }) {

    const current=useRef(null);

    const spotifyApi = new SpotifyWebApi({
        clientId: '0647e19f61a44c20bf6b505514767f63',
    });
    const [albumdetailimage,setAlbumDetailImage]=useState()
    const [homeButton,setHomeButton]=useState(true)
    const [selectedArtist,setSelectedArtist]=useState()
    const [currAccessToken, setCurrAccessToken] = useState(null);
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [popularAlbum,setPopularAlbum]=useState([])
    const [popularSingle,setPopularSingle]=useState([])
    const [popularSingle2,setPopularSingle2]=useState([])
    const [popularSingle3,setPopularSingle3]=useState([])
    const [popularSingle4,setPopularSingle4]=useState([])
    const [searchArtistsResult,setSearchArtistsResult]=useState([])
    const [searchAlbumResult,setSearchAlbumResult]=useState([])
    const [searchEpisodeResult,setSearchEpisodeResult]=useState([])
    const [userPlaylist,setUserPlaylist]=useState([]);
    const [selectedPlaylist,setSelectedPlaylist]=useState()
    const [takeActiveComponent,settakeActiveComponent]=useState()
    const [selectedSong,setSelectedSong]=useState()
    const [onShow,setOnShow]=useState(false)

    useEffect(() => {
        if (!currAccessToken) return;  
        spotifyApi.setAccessToken(currAccessToken);
        spotifyApi.getUserPlaylists().then((playlist=>{
            setUserPlaylist(playlist.body.items)
        
        })).catch(err=>{
            console.error('Error Showing Playlists:',err);
        })

    }, [currAccessToken]); 


    useEffect(() => {
        if (!search) return;
        if (!currAccessToken) return;
        let cancel=false
        spotifyApi.setAccessToken(currAccessToken);
            spotifyApi.searchTracks(search)
            .then(res => {
                if(!cancel){
                    setSearchResult(res.body.tracks.items);
                    
                }  
            })
            spotifyApi.searchArtists(search)
            .then((res)=>{
                if(!cancel){
                setSearchArtistsResult(res.body.artists.items);
                
                }
            })
            spotifyApi.searchAlbums(search)
            .then((res)=>{
                if(!cancel){
                setSearchAlbumResult(res.body.albums.items);
                
                }
            })
            spotifyApi.searchEpisodes(search)
            .then((res)=>{
                if(!cancel){
                setSearchEpisodeResult(res.body.episodes.items);
                
                }
            })
        return ()=>cancel=true
    
    }, [search, currAccessToken]); 

    useEffect(() => {
        if (current.current) {
            current.current.scrollTo({ top: 0, behavior: "smooth" });
        }
    }, [takeActiveComponent]);

     useEffect(()=>{
            if (!currAccessToken) return
            if (searchResult.length>0) return
            spotifyApi.setAccessToken(currAccessToken);
    
            spotifyApi.getArtistAlbums('7uIbLdzzSEqnX0Pkrb56cR',{include_groups:'album',limit:40}).then((res) => {
                setPopularAlbum(res.body.items);
                
            });
    
            spotifyApi.getArtistAlbums('1mYsTxnqsietFxj1OgoGbG',{include_groups:'single',limit:40}).then((res)=>{
                setPopularSingle(res.body.items)
                
            })
            spotifyApi.getArtistAlbums('1wRPtKGflJrBx9BmLsSwlU',{include_groups:'single',limit:40}).then((res)=>{
                setPopularSingle2(res.body.items)
                
            })
            spotifyApi.getArtistAlbums('4fEkbug6kZzzJ8eYX6Kbbp',{include_groups:'single',limit:40}).then((res)=>{
                setPopularSingle3(res.body.items)
                
            })
            spotifyApi.getArtistAlbums('7uIbLdzzSEqnX0Pkrb56cR',{include_groups:'single',limit:40}).then((res)=>{
                setPopularSingle4(res.body.items)
                
            })
    
        },[currAccessToken,searchResult])

        useEffect(()=>{
                if(searchResult.length>0)
                {
                    setSelectedArtist()
                }
                if(selectedPlaylist)
                {
                    setSelectedArtist()
                }
            },[searchResult,selectedPlaylist])
        

    function logout(){
        window.location='/'
    }
    return (
        <>
            <div className="Mainhome">
                <div className="dashboard">
                    <div>
                        <img src="beatcrusade.png" alt="beatcrusadelogo"/>
                    </div>
                    <div>
                        <button onClick={()=>{setHomeButton(true),setSearch("")}} className="logout"><i className="fa-solid fa-house"></i>Home</button>
                        <input type="text" value={search} placeholder="What Do You Want To Play?" onChange={(e) => {setSearch(e.target.value),setSelectedPlaylist()}} style={{padding:'15px 150px'}}/>
                    </div>
                    <div>
                        <button onClick={logout} className="logout"><i className="fa-solid fa-right-from-bracket"></i>Log-Out</button>
                    </div>
                </div>
                <div className="content">
                    <div className="startplaylist">
                        <Playlist userPlaylist={userPlaylist} setSelectedPlaylist={setSelectedPlaylist}/>
                    </div>
                    <div className="middlecontent" ref={current}>
                        <Content search={search} searchResult={searchResult} currAccessToken={currAccessToken} searchArtistsResult={searchArtistsResult} searchAlbumResult={searchAlbumResult} searchEpisodeResult={searchEpisodeResult} settakeActiveComponent={settakeActiveComponent} setSelectedSong={setSelectedSong} setOnShow={setOnShow} selectedPlaylist={selectedPlaylist} homeButton={homeButton} setHomeButton={setHomeButton} popularAlbum={popularAlbum} popularSingle={popularSingle} popularSingle2={popularSingle2} popularSingle3={popularSingle3} popularSingle4={popularSingle4} setSelectedPlaylist={setSelectedPlaylist} setSelectedArtist={setSelectedArtist} selectedArtist={selectedArtist} setAlbumDetailImage={setAlbumDetailImage}/>
                    </div>
                    <div className={`lastcontent ${onShow?'visible':'hide'}`}>
                        <VideoContainer selectedSong={selectedSong} onShow={onShow} setOnShow={setOnShow} albumdetailimage={albumdetailimage} setAlbumDetailImage={setAlbumDetailImage}/>
                    </div>
                </div>
                <div className="player">
                    {selectedSong?(<img src="beatcrusade.png" alt="beatcrusadelogo" className="logohide"/>):<></>}
                    <Player currAccessToken={currAccessToken} trackUri={selectedSong?.uri}/>
                </div>
                
                
            </div>
            <Auth code={code} setCurrAccessToken={setCurrAccessToken} />
        </>
    );
}

export default Dashboard;

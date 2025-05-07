import React ,{useState,useEffect}from "react";
import '../styles/Content.css'
import Artist from './Artist.jsx'
import All from './All.jsx'
import Song from './Song.jsx'
import Album from './Album.jsx'
import Episode from './Episode.jsx'
import Home from "./Home.jsx";
import PlaylistDetail from './PlaylistDetail.jsx'
import AlbumDetail from "./AlbumDetail.jsx";
function Content({ search,searchResult,currAccessToken,searchArtistsResult,searchAlbumResult,searchEpisodeResult,settakeActiveComponent,setSelectedSong,setOnShow,selectedPlaylist,homeButton,setHomeButton,popularAlbum,popularSingle,popularSingle2,popularSingle3,popularSingle4,setSelectedPlaylist,setSelectedArtist,selectedArtist,setAlbumDetailImage}) {
    const [activeComponent,setactiveComponent]=useState(null)
    const [onFocus,setOnFocus]=useState("All")
    const [album,setAlbum]=useState(null)


    useEffect(()=>{
            setOnFocus("All")
        },[search])

    useEffect(()=>{
        if(search!==""){
            setAlbum()
            setactiveComponent(<All searchResult={searchResult} searchArtistsResult={searchArtistsResult} searchAlbumResult={searchAlbumResult} searchEpisodeResult={searchEpisodeResult} setactiveComponent={setactiveComponent} setOnFocus={setOnFocus} setSelectedSong={setSelectedSong} setOnShow={setOnShow} setAlbumDetailImage={setAlbumDetailImage} currAccessToken={currAccessToken} selectedArtist={selectedArtist}/>)
            setHomeButton(false)
            }
        if(selectedPlaylist){
            setAlbum()
            setactiveComponent(<PlaylistDetail selectedPlaylist={selectedPlaylist} currAccessToken={currAccessToken} setSelectedSong={setSelectedSong} setOnShow={setOnShow}/>)
            setHomeButton(false)
        }
        if(album)
        {
            setactiveComponent(<AlbumDetail currAccessToken={currAccessToken} currAlbumDetail={album} setSelectedSong={setSelectedSong} setOnShow={setOnShow} setAlbumDetailImage={setAlbumDetailImage}/>)
            setHomeButton(false)
        }
    
        
    },[search,searchResult,selectedPlaylist,album])

    useEffect(()=>{
        settakeActiveComponent(activeComponent)
    },[activeComponent])

    useEffect(() => {
        if (homeButton) {
            setAlbum()
            setactiveComponent(
                <Home popularAlbum={popularAlbum} popularSingle={popularSingle} popularSingle2={popularSingle2} popularSingle3={popularSingle3} popularSingle4={popularSingle4} setSelectedSong={setSelectedSong} setOnShow={setOnShow} setAlbumDetailImage={setAlbumDetailImage} setAlbum={setAlbum}/>
            )
            setSelectedPlaylist()
        }
    }, [homeButton]);

    return (
        <div className="content-container">

                {activeComponent && search!=='' || selectedPlaylist ||album?(
                    <>{search!='' && (<div className="category">
                        <button onClick={()=>{setOnFocus("All");setactiveComponent(<All searchResult={searchResult} searchArtistsResult={searchArtistsResult} searchAlbumResult={searchAlbumResult} searchEpisodeResult={searchEpisodeResult} setactiveComponent={setactiveComponent} setOnFocus={setOnFocus} setSelectedSong={setSelectedSong} setOnShow={setOnShow} setAlbumDetailImage={setAlbumDetailImage} currAccessToken={currAccessToken} selectedArtist={selectedArtist}/>)}} style={{backgroundColor:onFocus==="All"?'white':'black',color:onFocus==="All"?'black':'white'}}>All</button>
                        <button onClick={()=>{setOnFocus("Songs");setactiveComponent(<Song searchResult={searchResult} setSelectedSong={setSelectedSong} setOnShow={setOnShow} setAlbumDetailImage={setAlbumDetailImage}/>)}} style={{backgroundColor:onFocus==="Songs"?'white':'black',color:onFocus==="Songs"?'black':'white'}}>Songs</button>
                        <button onClick={()=>{setOnFocus("Artist");setactiveComponent(<Artist searchArtistsResult={searchArtistsResult} currAccessToken={currAccessToken} setSelectedSong={setSelectedSong} setOnShow={setOnShow} setAlbumDetailImage={setAlbumDetailImage} setactiveComponent={setactiveComponent}/>)}} style={{backgroundColor:onFocus==="Artist"?'white':'black',color:onFocus==="Artist"?'black':'white'}}>Artists</button>
                        <button onClick={()=>{setOnFocus("Album");setactiveComponent(<Album currAccessToken={currAccessToken} searchAlbumResult={searchAlbumResult} setactiveComponent={setactiveComponent} setSelectedSong={setSelectedSong} setOnShow={setOnShow} setAlbumDetailImage={setAlbumDetailImage}/>)}} style={{backgroundColor:onFocus==="Album"?'white':'black',color:onFocus==="Album"?'black':'white'}}>Albums</button>
                        <button onClick={()=>{setOnFocus("Episode");setactiveComponent(<Episode searchEpisodeResult={searchEpisodeResult}/>)}} style={{backgroundColor:onFocus==="Episode"?'white':'black',color:onFocus==="Episode"?'black':'white'}}>Episodes</button>
                    </div>)}
                    {album?(
                        <AlbumDetail currAccessToken={currAccessToken} currAlbumDetail={album} setSelectedSong={setSelectedSong} setOnShow={setOnShow} setAlbumDetailImage={setAlbumDetailImage}/>
                    ):(
                        activeComponent
                    )}
                    </>):(
                        (popularAlbum.length>3 && popularSingle.length>3) && !selectedPlaylist && search==="" && (
                            <Home popularAlbum={popularAlbum} popularSingle={popularSingle} popularSingle2={popularSingle2} popularSingle3={popularSingle3} popularSingle4={popularSingle4} setSelectedSong={setSelectedSong} setOnShow={setOnShow} setAlbumDetailImage={setAlbumDetailImage} setAlbum={setAlbum}/>)
        )}
        </div>);
}

export default Content;

import React,{useRef} from "react";
import '../styles/All.css'
import Song from './Song.jsx'
import Artist from './Artist.jsx'
import Album from "./Album.jsx";
import Episode from "./Episode.jsx";
import AlbumDetail from "./AlbumDetail.jsx";
import ArtistDetail from "./ArtistDetail.jsx";
function All({searchResult,searchArtistsResult,searchAlbumResult,searchEpisodeResult,setactiveComponent,setOnFocus,setSelectedSong,setOnShow,setAlbumDetailImage,currAccessToken,selectedArtist}){

    const artistslider=useRef(null)
    const albumslider=useRef(null)
    const episodeslider=useRef(null)

    function slideleft(slider){
        slider.current.scrollBy({
            left:-500,
            behavior:"smooth",
        })
    }

    function slideright(slider){
        slider.current.scrollBy({
            left:500,
            behavior:"smooth",
        })
    }

    function Artistslideleft(){slideleft(artistslider)}
    function Artistslideright(){slideright(artistslider)}
    function Albumslideleft(){slideleft(albumslider)}
    function Albumslideright(){slideright(albumslider)}
    function Episodeslideleft(){slideleft(episodeslider)}
    function Episodeslideright(){slideright(episodeslider)}

    return(
        (searchResult.length>3) && (
        <div className="main-container">
            <div className="upper-container">
            <div className="container-top-result">
                <h2 className="container-title">Top Result</h2>
                {searchResult.slice(0,1).map((result)=>(
                    <div className="result-container" key={result.id} onClick={()=>{setSelectedSong(result);setOnShow(true);setAlbumDetailImage(null)}}>
                        <img src={result.album.images[0]?.url}/>
                        <h1 className="topresulttitle">{result.name}</h1>
                        <p className="nopaddingtext">{result.type}.{result.artists[0]?.name}</p>    
                    
                    </div>
                ))}
            </div>
            <div className="container-song">
            <h2 className="container-title" onClick={()=>{setOnFocus("Songs");setactiveComponent(<Song searchResult={searchResult}/>)}}>Songs</h2>
        <table>
             <tbody className="tbody2"> 
            {searchResult.slice(0,4).map((track)=>(
                    <tr className="trackshover" key={track.uri} onClick={()=>{setSelectedSong(track);setOnShow(true)}}>
                        <td>
                            <div className="trackhome">
                                <img src={track.album.images[0]?.url} style={{ width: '45px', height: '45px' ,borderRadius:'5px'}} alt="Album" />
                                <div className="trackdes"><span className="playlistdetailitemname">{track.name}</span><span className="fadeitemname">{track.artists[0].name}</span></div>
                            </div>
                        </td>
                        <td style={{paddingRight:'10px'}}>{Math.floor(track.duration_ms/60000)}.
                            {Math.floor((track.duration_ms%60000)/1000).toFixed(0)}
                        </td>
                    </tr>
            ))}
            </tbody>
            </table>
            </div>
            </div>
            <br></br>
            <h2 className="container-title" onClick={()=>{setOnFocus("Artist");setactiveComponent(<Artist searchArtistsResult={searchArtistsResult} currAccessToken={currAccessToken} setSelectedSong={setSelectedSong} setOnShow={setOnShow} setAlbumDetailImage={setAlbumDetailImage} setactiveComponent={setactiveComponent}/>)}} style={{paddingLeft:'30px'}}>Artist</h2>
                <div className="divscrollablealbum">
                <button onClick={Artistslideleft} style={{left:'0'}}><i className="fa-solid fa-chevron-left"></i></button>
                <div className="container-artist" ref={artistslider}>
                {searchArtistsResult.length>0?(searchArtistsResult.slice(0,10).map((Artist)=>(
                    <div className="artistcontainer" key={Artist.id} onClick={()=>setactiveComponent(<ArtistDetail selectedArtist={Artist} currAccessToken={currAccessToken} setSelectedSong={setSelectedSong} setOnShow={setOnShow} setAlbumDetailImage={setAlbumDetailImage} setactiveComponent={setactiveComponent}/>)}>
                        <img src={Artist.images[0]?.url}></img>
                        <span className="artistname" style={{color:'white'}}>{Artist.name}</span>
                        <span className="fadeitemname">{Artist.type}</span>
                    </div>
                ))):(<p>No Artist Found</p>)}
                </div>
                <button onClick={Artistslideright} style={{right:'0'}}><i className="fa-solid fa-chevron-right"></i></button>
                </div>
            <br></br>
            <h2 className="container-title" onClick={()=>{setOnFocus("Album");setactiveComponent(<Album currAccessToken={currAccessToken} searchAlbumResult={searchAlbumResult} setactiveComponent={setactiveComponent} setSelectedSong={setSelectedSong} setOnShow={setOnShow} setAlbumDetailImage={setAlbumDetailImage}/>)}} style={{paddingLeft:'30px'}}>Album</h2>
            <div className="divscrollablealbum">
            <button onClick={Albumslideleft} style={{left:'0'}}><i className="fa-solid fa-chevron-left"></i></button>
            <div className="container-artist" ref={albumslider}>
                {searchAlbumResult.length>0?(searchAlbumResult.slice(0,10).map((album)=>(
                    <div className="albumcontainer" key={album.id} onClick={()=>setactiveComponent(<AlbumDetail currAccessToken={currAccessToken} currAlbumDetail={album} setSelectedSong={setSelectedSong} setOnShow={setOnShow} setAlbumDetailImage={setAlbumDetailImage}/>)}>
                        <img src={album.images[0]?.url}></img>
                        <span className="albumname">{album.name}</span>
                        <div className="albummetadata">
                        <span className="fadeitemname">{album.release_date.slice(0,4)}.</span>
                        <span className="fadeitemname">{album.artists[0]?.name}</span>
                        </div>
                    </div>
                ))):(<p>No Albums Found</p>)}
                </div>
                <button onClick={Albumslideright} style={{right:'0'}}><i className="fa-solid fa-chevron-right"></i></button>
                </div>
            <br></br>
            <div>
                <h2 className="container-title" onClick={()=>{setOnFocus("Episode");setactiveComponent(<Episode searchEpisodeResult={searchEpisodeResult}/>)}} style={{paddingLeft:'30px'}}>Episode</h2>
                    <div className="divscrollablealbum">
                    <button onClick={Episodeslideleft} style={{left:'0'}}><i className="fa-solid fa-chevron-left"></i></button>
                        <div className="container-artist" ref={episodeslider}>
                    {searchEpisodeResult.length>0?(searchEpisodeResult.slice(0,10).map((episode)=>(
                        <div className="albumcontainer" key={episode.id}>
                            <img src={episode.images[0]?.url} style={{borderRadius:'10px'}}/>
                                <span className="episodename">{episode.name}</span>
                                <span className="episode_releasedate">{Math.floor(episode.duration_ms/60000)}.
                                    {(Math.floor((episode.duration_ms%60000)/1000)).toFixed(0)}
                                </span>
                        </div>
                    ))):(<p>No Episodes Found</p>)}
                    </div>
                    <button onClick={Episodeslideright} style={{right:'0'}}><i className="fa-solid fa-chevron-right"></i></button>
                    </div>
            </div>
        </div>)
    )

}

export default All
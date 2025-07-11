import React,{useEffect,useState,useRef} from "react";
import AlbumDetail from "./AlbumDetail.jsx";
import SpotifyWebApi from "spotify-web-api-node";
import '../styles/ArtistDetail.css'
function ArtistDetail({selectedArtist,currAccessToken,setSelectedSong,setOnShow,setAlbumDetailImage,setactiveComponent}){
    const artistalbum=useRef(null)
    const albumsingle=useRef(null)
    const albumcompilation=useRef(null)
    const albumappearson=useRef(null)

    const [artistSingles,setArtistSingles]=useState([])
    const [artistAlbums,setArtistAlbums]=useState([])
    const [artistCompilation,setArtistCompilation]=useState([])
    const [artistAppearsOn,setArtistAppearsOn]=useState([])
    const SpotifyApi=new SpotifyWebApi({
        clientId:'0647e19f61a44c20bf6b505514767f63'
    })

    useEffect(()=>{
        if(!currAccessToken) return
        if(!selectedArtist) return
            SpotifyApi.setAccessToken(currAccessToken)
            
            const Artistid=selectedArtist.id
            SpotifyApi.getArtistAlbums(Artistid,{include_groups:"album"})
            .then((res)=>{
                setArtistAlbums(res.body.items)
                
            })
            SpotifyApi.getArtistAlbums(Artistid,{include_groups:"single"})
            .then((res)=>{
                setArtistSingles(res.body.items)
                
            })
            SpotifyApi.getArtistAlbums(Artistid,{include_groups:"compilation"})
            .then((res)=>{
                setArtistCompilation(res.body.items)
            
            })
            SpotifyApi.getArtistAlbums(Artistid,{include_groups:"appears_on"})
            .then((res)=>{
                setArtistAppearsOn(res.body.items)
               
            })
    },[currAccessToken,selectedArtist])

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
        function Albumslideleft(){
            slideleft(artistalbum)
        }
        function Albumslideright(){
            slideright(artistalbum)
        }
        function singleslideleft(){
            slideleft(albumsingle)
        }
        function singleslideright(){
            slideright(albumsingle)
        }
        function compslideleft(){
            slideleft(albumcompilation)
        }
        function compslideright(){
            slideright(albumcompilation)
        }
        function apponslideleft(){
            slideleft(albumappearson)
        }
        function apponslideright(){
            slideright(albumappearson)
        }
    return (
        <div className="artistdetail" style={{paddingTop:'10px'}}>
            <div className='artistdetailheader'>
                <img src={selectedArtist.images[0]?.url}></img>
                <div className='playlistinfo'>
                    <span>{selectedArtist.name}</span>
                </div>
            </div>
            <div className="container-song1">
            <h2>New Releases</h2>
            <table>
                <tbody className="tbody2"> 
                {artistSingles.slice(0,4).map((track)=>(
                    <tr className="trackshover" key={track.uri} onClick={()=>{setSelectedSong(track),setOnShow(true)}}>
                        <td>
                            <div className="trackhome3">
                                <img src={track.images[0]?.url} style={{ width: '45px', height: '45px' ,borderRadius:'5px'}} alt="Album" />
                                <div className="trackdes"><span className="trackname">{track.name}</span><p className="nopaddingtext">{track.artists[0].name}</p></div>
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
            {artistAlbums.length>0 && (
                <div style={{marginTop:'10px'}}>
                <h2>Albums</h2>
                <div className="divscrollable">
                {artistAlbums.length>4 && (<button onClick={Albumslideleft} style={{left:'0'}}><i className="fa-solid fa-chevron-left"></i></button>)}
                <div className="container-artist" ref={artistalbum}>
                    {artistAlbums.map((item)=>(
                        <div className="artistcontainer" key={item.id} onClick={()=>setactiveComponent(<AlbumDetail currAccessToken={currAccessToken} currAlbumDetail={item} setSelectedSong={setSelectedSong} setOnShow={setOnShow} setAlbumDetailImage={setAlbumDetailImage}/>)}>
                            <img src={item.images[0].url} style={{borderRadius:'10px'}}></img>
                            <p className="homeitemname">{item.name}</p>
                        </div>
                    ))}
                </div>
                {artistAlbums.length>4 && (<button onClick={Albumslideright} style={{right:'0'}}><i className="fa-solid fa-chevron-right"></i></button> )}   
                </div>
            </div>
            )}
            {artistSingles.length>0 && (
                <div>
                <h2>Popular Singles</h2>
                <div className="divscrollable">
                    {artistSingles.length>4 && (<button onClick={singleslideleft} style={{left:'0'}}><i className="fa-solid fa-chevron-left"></i></button>)}
                <div className="container-artist" ref={albumsingle}>
                    {artistSingles.map((item)=>(
                        <div className="artistcontainer" key={item.id} onClick={()=>{setSelectedSong(item);setOnShow(true);setAlbumDetailImage(null)}}>
                            <img src={item.images[0].url} style={{borderRadius:'10px'}}></img>
                            <p className="homeitemname">{item.name}</p>
                        </div>
                    ))}
                </div>
                {artistSingles.length>4 && (<button onClick={singleslideright} style={{right:'0'}}><i className="fa-solid fa-chevron-right"></i></button>)}    
                </div>    
            </div>
            )}
            {artistCompilation.length>0 && (
                <div style={{marginTop:'10px'}}>
                <h2>Compilation</h2>
                <div className="divscrollable">
                    {artistCompilation.length>4 && (<button onClick={compslideleft} style={{left:'0'}}><i className="fa-solid fa-chevron-left"></i></button>)}
                    <div className="container-artist" ref={albumcompilation}>
                        {artistCompilation.map((item)=>(
                            <div className="artistcontainer" key={item.id} onClick={()=>setactiveComponent(<AlbumDetail currAccessToken={currAccessToken} currAlbumDetail={item} setSelectedSong={setSelectedSong} setOnShow={setOnShow} setAlbumDetailImage={setAlbumDetailImage}/>)}>
                                <img src={item.images[0].url} style={{borderRadius:'10px'}}></img>
                                <p className="homeitemname">{item.name}</p>
                            </div>
                        ))}
                    </div>
                    {artistCompilation.lenght>4 && (<button onClick={compslideright} style={{right:'0'}}><i className="fa-solid fa-chevron-right"></i></button>)}    
                </div>
            </div>
            )}
            {artistAppearsOn.length>0 && (
                <div style={{marginTop:'10px'}}>
                <h2>Appears On</h2>
                <div className="divscrollable">
                {artistAppearsOn.length>4 && (<button onClick={apponslideleft} style={{left:'0'}}><i className="fa-solid fa-chevron-left"></i></button>)}
                <div className="container-artist" ref={albumappearson}>
                    {artistAppearsOn.map((item)=>(
                        <div className="artistcontainer" key={item.id} onClick={()=>setactiveComponent(<AlbumDetail currAccessToken={currAccessToken} currAlbumDetail={item} setSelectedSong={setSelectedSong} setOnShow={setOnShow} setAlbumDetailImage={setAlbumDetailImage}/>)}>
                            <img src={item.images[0].url} style={{borderRadius:'10px'}}></img>
                            <p className="homeitemname">{item.name}</p>
                        </div>
                    ))}
                </div>
                {artistAppearsOn.length>4 && (<button onClick={apponslideright} style={{right:'0'}}><i className="fa-solid fa-chevron-right"></i></button>)}    
                </div>
            </div>
            )}
        </div>
    )
}

export default ArtistDetail
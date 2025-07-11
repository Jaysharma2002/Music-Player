import React,{useRef} from 'react'
import '../styles/Home.css'
function Home({popularAlbum,popularSingle,popularSingle2,popularSingle3,popularSingle4,setSelectedSong,setOnShow,setAlbumDetailImage,setAlbum}){
    const singleslider=useRef(null);
    const albumslider=useRef(null);
    const singleslider2=useRef(null);
    const singleslider3=useRef(null);
    const singleslider4=useRef(null);

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
        slideleft(albumslider)
    }
    function Albumslideright(){
        slideright(albumslider)
    }
    function singleslideleft(){
        slideleft(singleslider)
    }
    function singleslideright(){
        slideright(singleslider)
    }
    function singleslideleft2(){
        slideleft(singleslider2)
    }
    function singleslideright2(){
        slideright(singleslider2)
    }
    function singleslideleft3(){
        slideleft(singleslider3)
    }
    function singleslideright3(){
        slideright(singleslider3)
    }
    function singleslideleft4(){
        slideleft(singleslider4)
    }
    function singleslideright4(){
        slideright(singleslider4)
    }
    return(
        <>
        <div style={{marginTop:'10px'}}>
                <p className='hometitle'>Popular Albums </p>
                <div className="divscrollable">
                <button onClick={Albumslideleft} style={{left:'0'}}><i className="fa-solid fa-chevron-left"></i></button>
            <div className="container-artist" ref={albumslider}>
            {popularAlbum.map((album)=>(
                <div className="artistcontainer" key={album.id} onClick={()=>{setAlbum(album)}}>
                    <img src={album.images[0].url} style={{borderRadius:'10px'}}></img>
                    <p className="homeitemname">{album.name}</p>
                </div>
            ))}
        </div>
        <button onClick={Albumslideright} style={{right:'0'}}><i className="fa-solid fa-chevron-right"></i></button>    
        </div>
        </div>
        <div>
            <p className='hometitle'>Popular Singles by A.R. Rahman</p>
            <div className="divscrollable">
            <button onClick={singleslideleft} style={{left:'0'}}><i className="fa-solid fa-chevron-left"></i></button>
            <div className="container-artist" ref={singleslider}>
            {popularSingle.map((item)=>(
                <div className="artistcontainer" key={item.id} onClick={()=>{setSelectedSong(item);setOnShow(true);setAlbumDetailImage(null)}}>
                    <img src={item.images[0].url} style={{borderRadius:'10px'}}></img>
                    <p className="homeitemname">{item.name}</p>
                </div>
            ))}
            </div>
            <button onClick={singleslideright} style={{right:'0'}}><i className="fa-solid fa-chevron-right"></i></button>    
        </div>    
        </div>
        <div>
            <p className='hometitle'>Popular Singles by Arijit Singh</p>
            <div className="divscrollable">
            <button onClick={singleslideleft2} style={{left:'0'}}><i className="fa-solid fa-chevron-left"></i></button>
            <div className="container-artist" ref={singleslider2}>
            {popularSingle2.map((item)=>(
                <div className="artistcontainer" key={item.id} onClick={()=>{setSelectedSong(item);setOnShow(true);setAlbumDetailImage(null)}}>
                    <img src={item.images[0].url} style={{borderRadius:'10px'}}></img>
                    <p className="homeitemname">{item.name}</p>
                </div>
            ))}
            </div>
            <button onClick={singleslideright2} style={{right:'0'}}><i className="fa-solid fa-chevron-right"></i></button>    
        </div>    
        </div>
        <div>
            <p className='hometitle'>Popular Singles by {popularSingle3[0]?.artists[0]?.name}</p>
            <div className="divscrollable">
            <button onClick={singleslideleft3} style={{left:'0'}}><i className="fa-solid fa-chevron-left"></i></button>
            <div className="container-artist" ref={singleslider3}>
            {popularSingle3.map((item)=>(
                <div className="artistcontainer" key={item.id} onClick={()=>{setSelectedSong(item);setOnShow(true);setAlbumDetailImage(null)}}>
                    <img src={item.images[0].url} style={{borderRadius:'10px'}}></img>
                    <p className="homeitemname">{item.name}</p>
                </div>
            ))}
            </div>
            <button onClick={singleslideright3} style={{right:'0'}}><i className="fa-solid fa-chevron-right"></i></button>    
        </div>    
        </div>
        <div>
            <p className='hometitle'>Popular Singles by {popularSingle4[0]?.artists[0]?.name}</p>
            <div className="divscrollable">
            <button onClick={singleslideleft4} style={{left:'0'}}><i className="fa-solid fa-chevron-left"></i></button>
            <div className="container-artist" ref={singleslider4}>
            {popularSingle4.map((item)=>(
                <div className="artistcontainer" key={item.id} onClick={()=>{setSelectedSong(item);setOnShow(true);setAlbumDetailImage(null)}}>
                    <img src={item.images[0].url} style={{borderRadius:'10px'}}></img>
                    <p className="homeitemname">{item.name}</p>
                </div>
            ))}
            </div>
            <button onClick={singleslideright4} style={{right:'0'}}><i className="fa-solid fa-chevron-right"></i></button>    
        </div>    
        </div>
    </>
    )
}

export default Home
import React,{useEffect} from "react";
import '../styles/Episode.css'
function Episode({searchEpisodeResult}){
    useEffect(()=>{
        window.scrollTo(0,0)
    },[])
    return (
        <div className="Episode-container">
        {searchEpisodeResult.length>0?(searchEpisodeResult.map((episode)=>(
            <div className="allepisodecontainer" key={episode.id}>
                <img src={episode.images[0]?.url}/>
                <div className="episodemetadata">
                    <span className="episode_name">{episode.name}</span>
                    <span className="episode_des">{episode.description.slice(0,50)}..</span>
                    <span className="episode_releasedate">{Math.floor(episode.duration_ms/60000)}.
                        {(Math.floor((episode.duration_ms%60000)/1000)).toFixed(0)}
                    </span>
                </div>
            </div>
        ))):(<p>No Episodes Found</p>)}
        </div>
    )

}

export default Episode
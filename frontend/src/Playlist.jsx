import React, { useState } from "react";
import "../styles/Playlist.css";

function Playlist({ userPlaylist,setSelectedPlaylist}) {
  const [searchLibrary, setSearchLibrary] = useState("");

  // Filter user playlists based on the search query
  const filteredPlaylists = userPlaylist.filter((playlist) =>
    playlist.name.toLowerCase().includes(searchLibrary.toLowerCase())
  );

  return (
    <div className="playlist">

      <h1>Your Library</h1>
      <input type="text" value={searchLibrary} placeholder=" Search Playlist..." onChange={(e) => setSearchLibrary(e.target.value)}/>

      {filteredPlaylists.length > 0 ? (
        filteredPlaylists.map((playlist) => (
          <div className="playlistitems" key={playlist.id} onClick={()=>setSelectedPlaylist(playlist)}>
            <div className="playlistitemimage">
              <img
                src={playlist.images[0]?.url || "/placeholder.jpg"}
                alt="Playlist Cover"
              />
            </div>
            <div className="playlistiteminfo">
              <span className="homeitemname" style={{ color: "white",overflow: "hidden", textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{playlist.name}</span>
              <span className="fadeitemname">
                {playlist.type}. {playlist.owner?.display_name || "Unknown"}
              </span>
            </div>
          </div>
        ))
      ) : (
        <p style={{ color: "white" }}>No matching playlists found.</p>
      )}
    </div>
  );
}

export default Playlist;

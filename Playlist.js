import React from 'react';
import TrackList from '../TrackList/TrackList';
import './Playlist.css';

class Playlist extends React.Component {
  render() {
    return(
      <div className="Playlist">
        <default value={"New Playlist"}/>
        <TrackList tracks={this.props.playlistTracks}/>
        <a className="Playlist-save">SAVE TO SPOTIFY</a>
      </div>
    )
  }
}

export default Playlist;

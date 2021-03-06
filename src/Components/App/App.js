import React, { Component } from "react";

import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";
import Spotify from "../../util/Spotify";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: [],
      playlistName: "My Playlist",
      playlistTracks: []
    }; //end of this.state
    this.addTrack = this.addTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  } //end of the constructor

  removeTrack(track) {
    const tracks = this.state.playlistTracks;
    const filterTracks = tracks.filter(currentTrack => currentTrack.id !== track.id);
    this.setState({ playlistTracks: filterTracks });
  }

  updatePlaylistName(name) {
    this.setState({ playlistName: name });
  }

  addTrack(track) {
    const tracks = this.state.playlistTracks;
    if (tracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }
    tracks.push(track);
    this.setState({ playlistTracks: tracks });
  }

  savePlaylist() {
    const playlistTracks = this.state.playlistTracks;
    const trackURIs = playlistTracks.map(currentTrack => currentTrack.uri);
    Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {
      this.setState({ playlistName: "My Playlist", playlistTracks: [] });
    });
  }

  search(term) {
    Spotify.search(term).then(tracks => {
      this.setState({ searchResults: tracks });
    });
  }

  render() {
    return (
      <div>
        <h1>
          Ja<span className="highlight">mmm</span>ing
        </h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults
              searchResults={this.state.searchResults}
              onAdd={this.addTrack}
            />
            <Playlist
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.state.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;

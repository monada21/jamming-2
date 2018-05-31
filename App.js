import React, { Component } from 'react';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.addTrack= this.addTrack.bind(this);
    this.state = {searchResults:[
      { name: 'The Man',
        artist: 'Aloe Blacc',
        album: 'Lift Your Spirit',
        id: 0
        }
      ]
    }
    this.state = {playlistName: 'Best Songs',
    playlistTracks:
      [ {name: 'The Motto',
        artist: 'Drake',
        album: 'Take Care',
        id: 1},

        {name:'Is This Love',
        artist:'Bob Marley',
        album:'Legend',
        id: 2 },

      ]
    }
  }

  addTrack(track) {
    let tracks = this.state.playlistTracks;
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id ))
      {return;
    }
    tracks.push(track);
    this.setState({playlistTracks:tracks});
      }

    render() {
      return(
        <div>
          <h1>Ja<span className="highlight">mmm</span>ing</h1>
          <div className="App">
            <SearchBar />
            <div className="App-playlist">
              <SearchResults searchResults={this.state.searchResults} />
              <Playlist playlistName= {this.state.playlistName} playlistTracks= {this.state.playlistTracks}/>
            </div>
          </div>
        </div>
    )
  }
}

export default App;

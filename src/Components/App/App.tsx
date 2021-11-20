import React, { Component } from 'react'
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import { TrackType } from '../../types';
import Spotify from '../../util/Spotify';


type PropsType = {};
type StateType = {
  searchResults: TrackType[],
  playlistName: string,
  playlistTracks: TrackType[]
};

export default class App extends Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName : 'New Playlist',
      playlistTracks: [],
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  search(searchTerm: string) {
    Spotify.search(searchTerm).then(tracks => {
      this.setState({searchResults: tracks});
    });
  }

  addTrack(xTrack: TrackType): void {
    if (this.state.playlistTracks.includes(xTrack)) {
      return;
    }
    let track = this.state.searchResults.filter(track => track.id === xTrack.id)[0];
    let new_results = this.state.searchResults.filter(track => track.id !== xTrack.id);
    let new_playlist = [...this.state.playlistTracks, track];
    this.setState({ searchResults: new_results, playlistTracks: new_playlist });
  }

  removeTrack(xTrack: TrackType): void {
    let new_playlist = this.state.playlistTracks.filter(track => track.id !== xTrack.id);
    this.setState({ playlistTracks: new_playlist });
  }

  updatePlaylistName(newName: string) {
    this.setState({ playlistName: newName });
  }

  async savePlaylist() {
    Spotify.savePlaylist(
      this.state.playlistName, this.state.playlistTracks
    );
    this.setState({playlistName: 'New Playlist', playlistTracks: []});
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
          <SearchResults
            results={this.state.searchResults}
            onAdd={this.addTrack}
            onRemove={this.removeTrack}
          />
          <Playlist
            name={this.state.playlistName}
            tracks={this.state.playlistTracks}
            onAdd={this.addTrack}
            onRemove={this.removeTrack}
            onNameChange={this.updatePlaylistName}
            onSave={this.savePlaylist}
          />
          </div>
        </div>
      </div>
    )
  }
}

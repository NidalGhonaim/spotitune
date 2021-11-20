import React, { Component } from 'react'
import './Playlist.css';
import TrackList from '../TrackList/TrackList'
import { TrackType } from '../../types';

type PropsType = {
  name: string,
  tracks: TrackType[],
  onAdd: (xTrack: TrackType) => void,
  onRemove: (xTrack: TrackType) => void,
  onNameChange: (newName: string) => void,
  onSave: () => void
};
type StateType = {};

export default class Playlist extends Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    let newName = e.target.value;
    this.props.onNameChange(newName);
  }

  render() {
    return (
      <div className="Playlist">
        <input value={this.props.name} onChange={this.handleNameChange} />
        <TrackList
          tracks={this.props.tracks}
          onRemove={this.props.onRemove}
          isRemoval={true}
        />
        <button className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</button>
      </div>
    )
  }
}

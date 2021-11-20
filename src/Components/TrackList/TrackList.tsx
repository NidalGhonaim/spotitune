import React, { Component } from 'react'
import './TrackList.css';
import Track from '../Track/Track';
import { TrackType } from '../../types';

type PropsType = {
  tracks: TrackType[],
  onAdd?: (xTrack: TrackType) => void,
  onRemove?: (xTrack: TrackType) => void,
  isRemoval: boolean
};
type StateType = {};

export default class TrackList extends Component<PropsType, StateType> {
  render() {
    return (
      <div className="TrackList">
        {this.props.tracks.map((track) => (
          <Track
            key={track.id}
            track={track}
            onAdd={this.props.onAdd}
            onRemove={this.props.onRemove}
            isRemoval={this.props.isRemoval}
          />
        ))}
      </div>
    )
  }
}

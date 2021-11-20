import React, { Component } from 'react';
import { TrackType } from '../../types';
import './Track.css';

type PropsType = {
  track: TrackType,
  onAdd?: (xTrack: TrackType) => void,
  onRemove?: (xTrack: TrackType) => void,
  isRemoval: boolean,
};
type StateType = {};

export default class Track extends Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }

  renderAction() {
    if(this.props.isRemoval) {
      return <button className="Track-action" onClick={this.removeTrack}> - </button>
    } else {
      return <button className="Track-action" onClick={this.addTrack}> + </button>
    }
  }

  addTrack() {
    if(typeof this.props.onAdd === 'function') {
      this.props.onAdd(this.props.track);
    }
  }

  removeTrack() {
    if(typeof this.props.onRemove === 'function') {
      this.props.onRemove(this.props.track);
    }
  }

  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <p>{this.props.track.artist} | {this.props.track.album}</p>
        </div>
        {this.renderAction()}
      </div>
    )
  }
}

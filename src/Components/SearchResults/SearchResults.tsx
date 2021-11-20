import React, { Component } from 'react';
import './SearchResults.css';
import TrackList from '../TrackList/TrackList';
import { TrackType } from '../../types';

type PropsType = {
  results: TrackType[]
  onAdd: (xTrack: TrackType) => void
  onRemove: (xTrack: TrackType) => void
};
type StateType = {};

export default class SearchResults extends Component<PropsType, StateType> {
  render() {
    return (
      <div className="SearchResults">
        <h2>Results</h2>
        <TrackList
          tracks={this.props.results}
          onAdd={this.props.onAdd}
          isRemoval={false}
        />
      </div>
    )
  }
}

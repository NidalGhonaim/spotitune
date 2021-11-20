import React, { Component } from 'react'
import './SearchBar.css';

type PropsType = {
  onSearch: (search_term: string) => void
};
type StateType = {
  term: string
};

export default class SearchBar extends Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    this.state = { term: '' }
    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  search() {
    if (this.state.term !== '') {
      this.props.onSearch(this.state.term);
    }
  }

  handleTermChange(e: React.ChangeEvent<HTMLInputElement>) {
    let newTerm = e.target.value;
    this.setState({ term: newTerm });
  }

  handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
    if(e.key === 'Enter') {
      this.search();
    }
  }

  render() {
    return (
      <div className="SearchBar">
        <input
          placeholder="Enter A Song, Album, or Artist"
          onChange={this.handleTermChange}
          onKeyPress={this.handleKeyPress}
        />
        <button className="SearchButton" onClick={this.search}>SEARCH</button>
      </div>
    )
  }
}

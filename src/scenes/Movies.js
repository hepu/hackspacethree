import React, { Component } from 'react';
import Header from '../components/Header'
import SearchableList from '../containers/SearchableList'

class Movies extends Component {
  render() {
    return (
      <div>
        <Header />
        <SearchableList />
      </div>
    );
  }
}

export default Movies;

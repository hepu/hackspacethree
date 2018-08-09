import React, { Component } from 'react';
import TheMovieDbService from '../../services/TheMovieDbService'
import YearFilter from '../../components/YearFilter'

class SearchableList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      query: '',
      lastResponse: {},
      year: new Date().getFullYear()
    }
    this.onSubmit = this.onSubmit.bind(this)
    this.onChangeInput = this.onChangeInput.bind(this)
  }

  fetchMovies() {
    TheMovieDbService.movie.search(
      this.state.query,
      { year: this.state.year }
    ).then((json) => {
      this.setState({
        lastResponse: json
      })
    }).catch((error) => {
      console.error('ERROR', error)
    })
  }

  onSubmit(event) {
    event.preventDefault()
    this.fetchMovies()
  }

  onChangeInput(event) {
    this.setState({
      query: event.target.value
    })
  }

  render() {
    return (
      <div>
        <form
          onSubmit={this.onSubmit}>
          <input
            value={this.state.value}
            onChange={this.onChangeInput}
            placeholder='Search for a movie, series and videos'
            style={{
              backgroundColor: '#F3F6F7',
              width: '100%',
              border: 0,
              padding: 20,
              fontSize: 20
            }}/>
            {this.renderFilters()}
        </form>
        {this.renderResults()}
      </div>
    );
  }

  renderResults() {
    const {
      lastResponse
    } = this.state

    if (!lastResponse.results) {
      return (
        <div>No results found</div>
      )
    }

    return lastResponse.results.map((movie) => {
      return (
        <div key={movie.id}>{JSON.stringify(movie.title)}</div>
      )
    })
  }

  renderFilters() {
    return (
      <YearFilter
        placeholder='Please select a year'
        selectedValue={this.state.year}
        onSelect={(selection) => {
          this.setState({ year: selection }, () => {
            this.fetchMovies()
          })
        }}/>
    )
  }
}

export default SearchableList;

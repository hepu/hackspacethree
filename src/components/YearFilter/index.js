import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css'
import TheMovieDbService from '../../services/TheMovieDbService'

export default class YearFilter extends Component {
  constructor(props) {
    super(props)
    const years = []
    const date = new Date()
    for (var i = date.getFullYear()+2; i > 1900; i--) {
      years.push(i)
    }
    this.state = {
      opened: false,
      searchTerm: '',
      years
    }
    this.onChange = this.onChange.bind(this)
  }

  static propTypes = {
    onChange: PropTypes.func,
    selectedValue: PropTypes.any,
    placeholder: PropTypes.string,
    onSelect: PropTypes.func
  }

  static defaultProps = {
    onChange: () => {},
    onSelect: () => {},
  }

  onChange(event) {
    this.setState({
      searchTerm: event.target.value
    })
  }

  toggleOpen() {
    this.setState({
      opened: !this.state.opened
    })
  }

  filteredData() {
    const {
      years,
      searchTerm
    } = this.state

    return years.filter((item) => { return item.toString().includes(searchTerm) })
  }

  selectItem(item) {
    const {
      onSelect
    } = this.props

    this.setState({
      opened: false,
      searchTerm: ''
    })
    onSelect(item)
  }

  render() {
    return (
      <div id='year-filter'>
        <div>Año</div>
        {this.renderSelect()}
        {this.state.opened ? this.renderData() : null}
      </div>
    )
  }

  renderSelect() {
    const {
      selectedValue,
      placeholder
    } = this.props

    return (
      <div className="input" onClick={() => this.toggleOpen()}>
        <div className="value">
          {selectedValue || placeholder}
        </div>
        <div className="caret">\/</div>
      </div>
    )
  }

  renderData() {
    const data = this.filteredData()
    let results = []

    if (data.length > 0) {
      results = data.map((item, index) => {
        return (
          <div
            className='item'
            key={index}
            onClick={() => this.selectItem(item)}>
            {item}
          </div>
        )
      })
    }

    return (
      <div className='data-container'>
        <input
          type="text"
          name="term"
          autoFocus
          onChange={this.onChange}/>
        {results}
      </div>
    )
  }
}

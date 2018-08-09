import React, { Component } from 'react';
import logo from '../assets/images/logo.png'

class Header extends Component {
  render() {
    return (
      <div className="header">
        <div style={{ width: '80%', display: 'inline-block' }}>
          <img src={logo} />
        </div>
        <div style={{ width: '19%', display: 'inline-block', textAlign: 'right' }}>
          <span>Movies</span>
          <span>Series</span>
          <span>Favorites</span>
        </div>
      </div>
    );
  }
}

export default Header;

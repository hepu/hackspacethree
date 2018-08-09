import React from 'react'
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'

// Scenes
import Movies from '../scenes/Movies'

const routes = (
  <Router>
    <div>
      <Route path="/" component={Movies} exact/>
    </div>
  </Router>
)

export default routes

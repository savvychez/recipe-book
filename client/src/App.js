import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './styles/App.css';

import Nav from './components/Nav.js'
import Feed from './components/Feed.js'
import Writer from './components/Writer.js'
import Article from './components/Article.js'


function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          <Route path='/' exact component={Feed} />
          <Route path='/compose' component={Writer} />
          <Route path='/recipe' component={Article} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

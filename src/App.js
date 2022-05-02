import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HeroesList from './HeroesList';
import HeroEdit from "./HeroEdit";


class App extends Component {
  render() {
    return (
        <Router>
          <Switch>
            <Route path='/' exact={true} component={Home}/>
            <Route path='/heroes' exact={true} component={HeroesList}/>
            <Route path='/heroes/:id' component={HeroEdit}/>
          </Switch>
        </Router>
    )
  }
}

export default App;

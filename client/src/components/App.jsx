import React, { Component } from 'react';
import '../stylesheets/App.css';
import Login from './Login';
import Logout from './Logout';
import RecipeList from './RecipeList';
import RecipeEdit from './RecipeEdit';
import {BrowserRouter as Router, Route, NavLink, Switch} from 'react-router-dom';
import RecipeSearch from './RecipeSearch';
import Recipe from './Recipe';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <Navigation />
          <Main />
        </div>
      </Router>
    );
  }
}

const Navigation = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item"><NavLink exact className="nav-link" activeClassName="active" to="/">Search for Recipes</NavLink></li>
      {
        localStorage.getItem("jwt") ?
      <li className="nav-item"><NavLink exact className="nav-link" activeClassName="active" to="/recipes">My Recipes</NavLink></li>
    :
    <li> </li>  
    }
      {
        localStorage.getItem("jwt") ?
          <li className="nav-item"><NavLink exact className="nav-link" to="/logout">Log Out</NavLink></li>
        :
          <li className="nav-item"><NavLink exact className="nav-link" activeClassName="active" to="/login">Log In</NavLink></li>
      }
    </ul>
  </nav>
);
const Main = () => (
  <Switch>
    <Route exact path="/" component={RecipeSearch} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/logout" component={Logout} />
    <Route exact path="/recipes" component={RecipeList} />
    <Route exact path="/recipe/:recipeId" component={Recipe} />
    <Route exact path="/recipe/edit/:id" component={RecipeEdit} />
  </Switch>
);

export default App;
import React, { Component } from 'react';
import  axios  from 'axios';
import { Link } from 'react-router-dom';

class RecipeList extends Component {
  constructor() {
    super();
    this.state = { recipes: [] };
  }

  componentDidMount() {
    let token = "Bearer " + localStorage.getItem("jwt");
    axios({method: 'get', url: '/api/recipes', headers: {'Authorization': token }})
      .then(response => { 
        console.log(response.data);
        this.setState({ recipes: response.data })
      })
      .catch(error => console.log('error', error));
  }
  handleDelete(id) {
    let token = "Bearer " + localStorage.getItem("jwt");
    console.log('toke toke', token)
    axios({ method: 'delete', url: `/api/recipes/${id}`, headers: {'Authorization': token}})
      .then(() => {
        this.props.history.push("/recipes");
      })
      .catch(error => console.log('error', error));
  }
  handleNotesChange = (event) => {
    console.log('this', event);
    const recipes = this.state.recipes;
    // recipes[i].notes = event

  // this.setState({recipes: recipes});
}
  render() {
    return (
      <div>
        {this.state.recipes.map((recipe, i) => {
          return(
            <div key={recipe.id}>
              
              <h2><Link to={`/recipe/${recipe.recipeId}`}>{recipe.title}</Link></h2>
              {recipe.notes}
             

              <div><Link to={`/recipe/edit/${recipe.id}`}>Manage This Recipe</Link></div>
              <hr/>
            </div>
          )     
        })}
      </div>
    )
  }
}

export default RecipeList;
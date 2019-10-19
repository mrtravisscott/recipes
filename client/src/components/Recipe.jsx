import React, {Component} from 'react';
import axios from 'axios';

class Recipe extends Component {
    constructor(){
        
        super();
        this.state = {
            recipeId: '',
            recipe: {extendedIngredients: []},
            nutrition: { good: [], bad: []}
        }
    }
    componentDidMount(){
        console.log('i mount', this.props);
        const id = this.props.match.params.recipeId;
        this.setState({recipeId: this.props.match.params.recipeId})
        this.getRecipes(id);
        this.getNutrition(id);
    }
    getRecipes = async (id) => {
        console.log('state', this.state);
        const recipe = await fetch(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${id}/information`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
                "x-rapidapi-key": "9f70a3e336mshc7564059d2d8a00p1a222djsn48a2cb062637"
            }
        });
        const parsedResponse = await recipe.json()
        console.log(parsedResponse);
        this.setState({ recipe: parsedResponse});
        console.log('lookie', this.state)
    }
    getNutrition = async (id) => {
        const nutrition = await fetch("https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/20714/nutritionWidget.json", {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
                "x-rapidapi-key": "9f70a3e336mshc7564059d2d8a00p1a222djsn48a2cb062637"
            }
        })
        const parsedResponse = await nutrition.json()
        this.setState({ nutrition: parsedResponse});
        console.log('lookie', this.state);
    }
    saveToList ()  {
        const formData = {
            recipeId: this.state.recipeId,
            title: this.state.recipe.title,
            notes: this.state.notes
        };
        console.log('i happenedsfdsdsfds');
        let token = "Bearer " + localStorage.getItem("jwt")
        axios({ method: 'post', url: '/api/recipes', headers: {'Authorization': token }, data: formData})
          .then((response) => {
              console.log('resp', response);
            this.props.history.push(`/recipe/${response.data.recipeId}`);
          })
          .catch(error => console.log('error', error));
        // const nutrition = await fetch("http://localhost:3001/recipes", {
        //     "method": "GET",
        //     // credentials: 'include'
        //     // body: JSON.stringify(formData),F
        // })
        // const parsedResponse = await nutrition.json()
        
        // console.log('lookie', parsedResponse);
    }
    handleNotesChange = (event) => {
        console.log('this', this);
      this.setState({notes: event.target.value});
    }
    render(){
        let recipeIngredients =  this.state.recipe.extendedIngredients.map( (d,i) => {
            return <li
              key={i}
             
            >
                {d.originalString}
             
            </li>
          })
          let badNutrition =  this.state.nutrition.bad.map( (d,i) => {
            return <li
              key={i}
             
            >
                {d.title} {d.amount} {d.percentOfDailyNeeds}%
             
            </li>
          })
          let goodNutrition =  this.state.nutrition.good.map( (d,i) => {
            return <li
              key={i}
             
            >
                {d.title} {d.amount} {d.percentOfDailyNeeds}%
             
            </li>
          })
        return(
            <div>
                <img src={this.state.recipe.image}></img>
                <h1>{this.state.recipe.title}</h1>
                <h2>Ingredients: </h2>
                <div>{recipeIngredients} </div>
                <h2>Instructions: </h2>
                <div>{this.state.recipe.instructions}</div>
                <h2>Nutrition: </h2>
                <div>{badNutrition}</div>
                <div>{goodNutrition}</div>
                <form>
        <label>
            Type a note about this recipe
            <input type="text" value={this.state.notes} onChange={this.handleNotesChange} />
        </label>
        <input type="submit" value="Save to My Recipes" onClick={() => this.saveToList()}/>
        </form>
            </div>
        )
    }
}

export default Recipe
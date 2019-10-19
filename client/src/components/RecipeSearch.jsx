import React, {Component} from 'react';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { Link } from 'react-router-dom';
const options = [
    { value: 'pescetarian', label: 'Pescetarian' },
    { value: 'vegetarian', label: 'Vegetarian' },
    { value: 'vegan', label: 'Vegan' },
    { value: 'lacto vegetarian', label: 'Lacto vegetarian'},
    { value: 'ovo vegetarian', label: 'Ovo vegetarian' }
  ];
  const intoleranceOptions = [
    { value: 'dairy', label: 'Dairy' },
    { value: 'egg', label: 'Egg' },
    { value: 'gluten', label: 'Gluten' },
    { value: 'peanut', label: 'Peanut'},
    { value: 'seasame', label: 'Seasame' },
    { value: 'seafood', label: 'Seafood' },
    { value: 'shellfish', label: 'Shellfish' },
    { value: 'soy', label: 'Soy' },
    { value: 'sulfite', label: 'Sulfite' },
    { value: 'tree nuts', label: 'Tree nuts' },
    { value: 'wheat', label: 'Wheat' }
  ];
  

class RecipeSearch extends Component {
    constructor() {
        super();
        this.state = {
            recipes: [],
            diet: {value: null},
            intolerances:{value: null},
            excludeIngredients:{value: null},
            searchValue: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    getQuery(){
        const params =
        {
            "diet": this.state.diet.value,
            "excludeIngredients": this.state.excludeIngredients.value,
            "intolerances": this.state.intolerances.value,
            "number": "10",
            "offset": "0",
            "query": this.state.searchValue,
        }
        let query = Object.keys(params)
             .map((k) => {
                 if(params[k]){
                    return encodeURIComponent(k) + '=' + encodeURIComponent(params[k])
                 }
                 else { return; }
                }
                 )
             .join('&');
        return query;
    }
    getRecipes = async() => {

        try {
            const query = this.getQuery()
            const url = "https://cors-anywhere.herokuapp.com/https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search?" + query;
            const recipes = await fetch(url , {
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
                    "x-rapidapi-key": "9f70a3e336mshc7564059d2d8a00p1a222djsn48a2cb062637"
                }
            });
            const recipesJson = await recipes.json();
            return recipesJson;
        } catch (err) {
            console.log(err, 'error in catch block')
            return err
    }
}
    componentDidMount(){
      // this.getRecipes().then((data) => console.log(data,  ' from famous quotes'));
    }
    handleDietChange = diet => {
        this.setState(
          { diet },
          () => console.log(`Option diet selected:`, this.state.diet, this.state)
        );
      };

    handleIntoleranceChange = intolerances => {
        this.setState(
          { intolerances },
          () => console.log(`Option diet 1 selected:`, this.state.intolerances, this.state)
        );
      };
      handleExcludeChange = (newValue, actionMeta) => {
        console.group('Value Changed');
        console.log(newValue);
        console.log(`action: ${actionMeta.action}`);
        console.groupEnd();
        let data = {value: ""};
        if (newValue){
            for (let i = 0; i < newValue.length; i++){
                data.value += newValue[i].value;
                if (i + 1 !== newValue.length){
                    data.value += ', '
                } 
            }
        }
        
        this.setState(
          { excludeIngredients: data },
          () => console.log(`Option diet 2 selected:`, this.state.excludeIngredients, this.state)
        );
      };
      handleSearchChange = (event) => {
          console.log('this', this);
        this.setState({searchValue: event.target.value});
      }
    
      handleSubmit = (event) => {
        this.getRecipes().then((data) => {
            console.log(data,  ' from famous quotes');
            this.setState({recipes: data.results})
         })
        event.preventDefault();
        // this.getRecipes().then((data) => console.log(data,  ' from famous quotes'));
      }

    render() {
        const { diet } = this.state;
        const { intolerances } = this.state;
        const imageSty = {height: '100px', width: '100px'};
        let recipes =  this.state.recipes.map( (d,i) => {
            return <li
              key={i}
             
            >
             <Link to={`/recipe/${d.id}`}>{d.title}</Link> Ready in: {d.readyInMinutes} minutes
             <img style={imageSty} src={`https://spoonacular.com/recipeImages/${d.image}`}></img>
            </li>
          })
       // const { excludeIngredients  } = this.state;
      return (
          <div>
        <Select
        // value={diet}
        onChange={this.handleDietChange}
        options={options}
        placeholder = 'Select your diet'
      />
       <CreatableSelect
        isMulti
        onChange={this.handleExcludeChange}
        placeholder='Type in ingredients you do not want in recipe'
      />
        <Select
        // value={intolerances}
        onChange={this.handleIntoleranceChange}
        options={intoleranceOptions}
        placeholder = 'Select your intolerances'
        />
        <form>
        <label>
            Search for recipes
            <input type="text" value={this.state.searchValue} onChange={this.handleSearchChange} />
        </label>
        <input type="submit" value="Submit" onClick={this.handleSubmit}/>
        </form>
        {recipes}
        </div>
      );
    }
}

export default RecipeSearch;
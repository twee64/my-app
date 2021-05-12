import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


const Recipe = props => (
    <tr>
      <td><a className="nav-link" data-bs-toggle="tab">{props.recipe.username}</a></td>
      <td><a className="nav-link" data-bs-toggle="tab">{props.recipe.title}</a></td>
      <td><a className="nav-link" data-bs-toggle="tab"><img src = "assets/img/spe cials-1.png"/></a></td>
      <td><a className="nav-link" data-bs-toggle="tab">{props.recipe.ingredients}</a></td>
      <td><a className="nav-link" data-bs-toggle="tab">{props.recipe.instruction}</a></td>
      <td>
      <Link to={"/edit/"+props.recipe._id}>edit</Link> | <a className="nav-link" data-bs-toggle="tab" href="#" onClick={() => { props.deleteRecipe(props.recipe._id) }}>delete</a>
      </td>
    </tr>
  )

export default class RecipesList extends Component {
    constructor(props){
        super(props);

        this.deleteRecipe = this.deleteRecipe.bind(this);
        this.state = {recipes:[]}
    }

    componentDidMount(){
        axios.get('http://localhost:5000/recipes/')
        .then(response => {
            this.setState({ recipes: response.data})
        })
        .catch ((error) => {
            console.log(error);
        })
    }

    deleteRecipe(id) {
        axios.delete('http://localhost:5000/recipes/'+id)
          .then(response => { console.log(response.data)});
    
        this.setState({
          exercises: this.state.recipes.filter(el => el._id !== id) //filter, only return certain elements back to the exercise // pass back those that is not in the bracket
        })
      }
      RecipesList() {
        return this.state.recipes.map(currentrecipe => {
          return <Recipe recipe={currentrecipe} deleteRecipe={this.deleteRecipe} key={currentrecipe._id}/>;
        })
      }
    

    render () {
        return (
        <div className="section-title">
        <p>Recipe List</p>

  <div className="container">
        <table className="table">
          <thead className="thead-light ">
            <tr>
              <th className="text-center">User Name</th>
              <th className="text-center">Recipe</th>
              <th className="text-center">Image</th>
              <th className="text-center">Ingredients</th>
              <th className="text-center">Instructions</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="nav-item">
             { this.RecipesList() }
          </tbody>
        </table>
        </div>
        
      </div>
        )
    }
}


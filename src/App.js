import React from 'react';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './assets/css/style.css';


import Navbar from "./components/navbar.component"
import RecipeList from "./components/recipes-list.component";
import EditRecipe from "./components/edit-recipe.component";
import CreateRecipe from "./components/create-recipe.component";
import DeleteRecipe from "./components/delete-recipe.component";
import CreateUser from "./components/create-user.component";


function App() {
  return (
    <div className ="App">
          <div class="container-fluid container-xl d-flex align-items-center justify-content-lg-between">

          <h1 class="logo me-auto me-lg-0"><a href="App.js">Vegan Recipes</a></h1>
      </div>
      <header className = "app-header"></header>
    <Router>
      <div className="container">
      <Navbar />
      <br/>
      <Route path="/" exact component={RecipeList} />
      <Route path="/edit/:id" component={EditRecipe} />
      <Route path="/create" component={CreateRecipe} />
      <Route path="/delete" component={DeleteRecipe} />
      <Route path="/user" component={CreateUser} />
      </div>
    </Router>
    </div>
  );
}

export default App;

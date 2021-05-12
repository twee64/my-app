import React, {Component} from 'react';
import axios from 'axios';

export default class EditRecipe extends Component {
    constructor (props){
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeInstruction =  this.onChangeInstruction.bind(this);
        this.onChangeIngredients = this.onChangeIngredients.bind(this);
        this.onChangeimage = this.onChangeimage.bind(this);
        this.onSubmit = this.onSubmit.bind(this);


        this.state = {
            username : '',
            title: '',
            image : '',
            ingredients : [],
            instruction: '',
            users : []
        }
    }

    componentDidMount(){

        axios.get('http://localhost:5000/recipes/'+this.props.match.params.id)
        .then(response => {
        this.setState({
          username: response.data.username,
          title: response.data.title,
          image: response.data.image,
          ingredients: (response.data.ingredients),
          instruction: (response.data.instruction)
        })   
      })
      .catch(function (error) {
        console.log(error);
      })


        axios.get('http://localhost:5000/users/')
        .then(response => {
          if (response.data.length > 0) {
            this.setState({
              users: response.data.map(user => user.username),
              username: response.data[0].username
            })
          }
        })
        .catch((error) => {
          console.log(error);
        })
    }  

    onChangeUsername(e){
        this.setState({
            username: e.target.value
        });
    }

    onChangeTitle(e){
        this.setState({
            title: e.target.value
        });
    }
    onChangeimage(e){
        this.setState({
            image: e.target.value
        });
    }
    onChangeIngredients(e){
        this.setState({
            ingredients: e.target.value
        });
    }

    onChangeInstruction(e){
        this.setState({
            instruction: e.target.value
        });
    }
    

    onSubmit(e){
        e.preventDefault();
        const recipe ={
            username: this.state.username,
            title: this.state.title,
            image: this.state.image,
            ingredients: this.state.ingredients,
            instruction: this.state.instruction
        }
        console.log(recipe)

        axios.post('http://localhost:5000/recipes/update/'+ this.props.match.params.id, recipe)
        .then(res => console.log(res.data));
    
        window.location = '/';
    }

    render () {
        return (
            <div>
      <h3>Edit Recipe</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Username: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}>
              {
                this.state.users.map(function(user) {
                  return <option 
                    key={user}
                    value={user}>{user}
                    </option>;
                })
              }
          </select>
        </div>

        <div className="form-group"> 
          <label>Title: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.title}
              onChange={this.onChangeTitle}
              />
        </div>
        <div className="form-group"> 
          <label>Image: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.image}
              onChange={this.onChangeimage}
              />
        </div>

        <div className="form-group"> 
          <label>Ingredients: </label>
          <input type="text"
              required
              className="form-control"
              value={this.state.ingredients}
              onChange={this.onChangeIngredients}
              />
        </div>

        <div className="form-group"> 
          <label>Instruction: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.instruction}
              onChange={this.onChangeInstruction}
              />
        </div>

        <div className="form-group">
          <input type="submit" value="Edit Vegan Recipe" className="btn btn-primary" />
        </div>
      </form>
    </div>
        )
    }
}
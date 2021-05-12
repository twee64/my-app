

import React, {Component} from 'react';
import axios from 'axios';
// import {upload} from 'upload-file.components';
// import fileUpload from '../../backend/routes/file-upload';

export default class CreateRecipe extends Component {
    constructor (props){
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeInstruction =  this.onChangeInstruction.bind(this);
        this.onChangeIngredients = this.onChangeIngredients.bind(this);
        this.handleFile = this.handleFile.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
        this.onChangeImage= this.onChangeImage.bind(this);
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

    onChangeImage(e){
        this.setState({
            image: e.target.value
        });
    }


    state ={
      file:null
    }
     
    handleFile(e){

      let file = e.target.files[0]
      this.setState({file:file})
    }

    handleUpload(e){
        // console.log(this.state, "the state is blabla");

        let file = this.state.file
        let formdata = new FormData()

        formdata.append('image', file)
        formdata.append('name',' thuy')

        axios.post('http://localhost:5000/recipes/add', formdata)
        .then(res => console.log(res.data));

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
            // imageURL: this.state.imageURL,
            ingredients: this.state.ingredients,
            instruction: this.state.instruction,
            image: this.state.image
        }
        console.log(recipe)

        axios.post('http://localhost:5000/recipes/add', recipe)
        .then(res => console.log(res.data));
    
        window.location = '/';
    }

    render () {
        return (
      <div class="section-title">
      <p>Create new Vegan Recipe</p>
      <form onSubmit={this.onSubmit} className ="php-email-form">
          
        <div class="row">
        <div className="col-lg-4 col-md-6 form-group"> 
        {/* <input type="text" name="name" class="form-control" id="name" placeholder="Your Name" data-rule="minlen:4" data-msg="Please enter at least 4 chars"/> */}
          {/* <div class="validate"></div> */}
          <label>User Name </label>

          <select ref="userInput"
              required
              name ="username"
              className="form-control"
              placeholder="Your Name"
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

        <div className="col-lg-4 col-md-9 form-group"> 
          <label>Title </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.title}
              onChange={this.onChangeTitle}
              />
        </div>
        </div>
        <div className="row">
        <div className="col-lg-4 col-md-6 form-group"> 
          <label for="image">Select Image </label>
          <input  type="file" name ="file"
              required
              className="form-control"
              value={this.state.image}
              onChange={this.onChangeImage}
              />
        </div>

        {/* <div className="form-group">
          <label>Select Files</label>
          <input type="file" name="file"     
          onChange={this.onChangeImage}

          /> 

            </div> */}

        <div className="col-lg-4 col-md-6 form-group"> 
          <label>Ingredients </label>
          <input type="text"
              required
              className="form-control"
              value={this.state.ingredients}
              onChange={this.onChangeIngredients}
              />
        </div>
        </div>

        <div className="form-group mt-3"> 
          <label>Instruction </label>
          <textarea type="text"
              required
              className="form-control"
              rows="8"
              value={this.state.instruction}
              onChange={this.onChangeInstruction}
              ></textarea>
        </div>
        {/* <div class="">
                <textarea class="form-control" name="message" rows="8" placeholder="Message" required></textarea>
              </div> */}
        
        
        <div class="text-center"><button type="submit">Create Vegan Recipe</button></div>
      </form>
    </div>
        )
    }
}
import React, {Component} from 'react';
import axios from 'axios';

export default class CreateUser extends Component {

    constructor (props){
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username : '',
           
        }
    }
    onChangeUsername(e){
        this.setState({
            username: e.target.value
        });
    }

    onSubmit(e){
        e.preventDefault();
        const user ={
            username: this.state.username,
        }
        console.log(user);

        axios.post('http://localhost:5000/users/add', user)
        .then(res => console.log(res.data));
  
        this.setState({
            username: ''
          })
        }


    render () {
        return (
            <div className="section-title">
            <p>Create New User</p>
                <form onSubmit={this.onSubmit}>
                <div className="form-group"> 
                    <label>Username </label>
                    <input  type="text"
                        required
                        className="form-control"
                        value={this.state.username}
                        onChange={this.onChangeUsername}
                />
          </div>
          <div className ="php-email-form">
          <div class="text-center"><button type="submit">Create User</button></div>
          </div>
        </form>
      </div>
        )
    }
}
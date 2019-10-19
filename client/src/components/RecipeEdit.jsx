import React from 'react';
import axios from 'axios';

class RecipeEdit extends React.Component {
  constructor() {
    super();
    this.state = { title: '', notes: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleDelete= this.handleDelete.bind(this);
  
  }

  componentDidMount() {
    let token = "Bearer " + localStorage.getItem("jwt");
    axios({method: 'get', url: `/api/recipes/1`, headers: {'Authorization': token }})
      .then((response) => { 
        console.log(response.data);
        this.setState(response.data)
      })
      .catch(error => console.log('error', error));
  }

  handleSubmit(event) {
    event.preventDefault();
    let token = "Bearer " + localStorage.getItem("jwt")
    axios({ method: 'patch', url: `/api/recipes/${this.state.id}`, headers: {'Authorization': token }, data: this.state})
      .then(() => {
        this.props.history.push(`/recipes`);
      })
      .catch(error => console.log('error', error));
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  handleDelete(event) {
    event.preventDefault();
    console.log(this)
    let token = "Bearer " + localStorage.getItem("jwt");
    console.log('toke toke', token)
    axios({ method: 'delete', url: `/api/recipes/${this.state.id}`, headers: {'Authorization': token}})
      .then(() => {
        this.props.history.push("/recipes");
      })
      .catch(error => console.log('error', error));
  }
  handleCancel() {
    this.props.history.push(`/articles/${this.state.id}`);
  }

  render() {
    return (
      <div>
        <h1>Edit {this.state.title}</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input type="text" name="title" value={this.state.title} onChange={this.handleChange} className="form-control" />
          </div>
          <div className="form-group">
            <label>notes</label>
            <textarea name="notes" rows="5" value={this.state.notes} onChange={this.handleChange} className="form-control" />
          </div>
          <div className="btn-group">
            <button type="submit" className="btn btn-dark">Update</button>
            <button type="button" onClick={this.handleCancel} className="btn btn-secondary">Cancel</button>
            <button type="button" onClick={this.handleDelete} className="btn btn-secondary">Delete from list</button>
          </div>
        </form>
      </div>
    );
  }
}

export default RecipeEdit;
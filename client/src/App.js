import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import './App.css';

class App extends Component{
  constructor(props){
    super(props)

    this.state = {
      data: [],
      name: '',
      description: '',
      price: undefined,
      id: undefined,
    }
  }

  getAll = () => {
    axios.get('http://localhost:3050/api/products')
      .then(res => this.setState({ data: res.data }))
      // .then(res => console.log(res.data))
      .catch(err => console.log(err))
  }

  getOne = () => {
    const {id} = this.state;

    axios.get(`/api/products/${id}`)
    .then(res => console.log(res.data))
    .catch(err => console.log(err))
  }

  create = () => {

    const { name, description, price } = this.state;
    
    axios.post('/api/products', {name, description, price})
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }

  delete = () => {

    const { id } = this.state;

    axios.delete(`/api/products/${id}`)
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }

  update = () => {
    const { id, description } = this.state;


    axios.put(`/api/products/${id}?desc=${description}`)
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }

  updateState = (e) => {
    const newState = {};
    newState[e.target.name] = e.target.value;
    this.setState(newState);
  }

  render(){
    return(
      <div className='App'>
        <img src={logo} className='App-logo'/>
        <h1>Products</h1>
        <button onClick={this.getAll}>GET ALL</button>
        
        <button onClick={this.delete}>DELETE</button>


        <section className='section-form'>
          Name: <input onChange={this.updateState} name='name'/>
          Description: <input onChange={this.updateState} name='description'/>
          Price: <input onChange={this.updateState} name='price'/>
        </section>
        <button onClick={this.create}>CREATE</button>

        <section>
          Find One:
          <input onChange={this.updateState} name='id' />
        </section>
        <button onClick={this.getOne}>GET ONE</button>

        <button onClick={this.update}>UPDATE</button>
      <ul>
        {this.state.data.map(product => {
          return <li key={product.product_id}>
            <h6>{product.product_id} {product.name}</h6>
            <p>{product.description}</p>
            <p>{product.price}</p>
            <img src={product.image_url} />
            </li>
        })}
        </ul>
      </div>
    )
  }
}

export default App;

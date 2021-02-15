import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }
  //fetch the data
     fetchData=()=>{
       //Set up the URL to use
       let url = '/api/pets';
       //Set up  conditions for different inputs

       if(this.state.filters !=='all'){
         // concat the url
        return url = url + `?type=${this.state.filters.type}`
       }
       fetch(url)
       .then(resp=>resp.js())
       .then(pets=> this.setState(pets))
  }
  // update the filters type
  handleChangeFilterType = type=>{
    this.setState({
      filters:{type:type}
    })
  }
  handleAdoptedPets = petId=>{
    this.setState({
      adoptedPets: [...this.state.adoptedPets, petId],
    })
  }
  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters 
              filters ={this.state.filters}
              
              onChangeType={this.handleChangeFilterType} 
              onFindPetsClick={this.fetchData}
              />
            </div>
            <div className="twelve wide column">
              <PetBrowser 
              pets={this.state.pets}
              adoptedPets={this.state.adoptedPets}
            onAdoptPet={this.handleAdoptedPets}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App

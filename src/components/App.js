import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      adoptedPets:true,
      filters: {
        type: 'all'
      }
    }
  }
 //Update this.state.filters
// When the input is changed(select, textarea, input)
 onChangeType = (event)=> {
   this.setState ({
     //Spread operator allows to give the original value unchanged
     filters:{
     ...this.state.filters,
     type: event.target.value

   }
 })
 }
  onFindPetsClick=()=> {
    let endPoint = '/api/pets';
    if(this.state.filters.type !=='all'){
      //Allow to fech different types
     endPoint = endPoint + `?type=${this.state.filters.type}`
    }
    // fetch
    fetch(endPoint)
    .then(resp =>resp.json())
    //fetch all pets
    .then(p => this.setState({p}))

  }

  onAdoptPet = (petId)=>{
    //Iterate over the pets

    const pets =this.state.pets.map(pet=>{
      //Find the pets based on the PetId
      return pet.id === petId ? {...pet , isAdopted:true} : pet })
     this.setState({pets})

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
              
              onChangeType={this.onChangeType} 
              onFindPetsClick={this.onFindPetsClick}
             
              />
            </div>
            <div className="twelve wide column">
              <PetBrowser 
                onAdoptPet={this.onAdoptPet}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App

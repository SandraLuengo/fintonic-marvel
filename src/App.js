import React, { Component } from 'react';
import './App.scss';
import SearchBar from './components/SearchBar/SearchBar';
import CharacterCard from './components/CharacterCard/CharacterCard';
import AppService from './AppService';

class App extends Component {
  constructor(props){
    super();
    this.state={
      characterInfo:false,
      err:false
    }
    this.appService = new AppService();
    
  }

  onChangeHandler = e => {

    let finding=e.target.value;

    finding.length>1?(
      this.appService.getCharacterData(finding)
      .then(characterInfo=> this.setState({...this.state,characterInfo}))
      .catch(err=> this.setState({...this.state,err}))
    ): finding.length===0&&this.setState({...this.state,characterInfo:false});
    
  }
  render() {
    const {characterInfo,err} = this.state;
    return (
      <div className="App">
        <SearchBar changeFuncion={this.onChangeHandler}/>
        {characterInfo&&<CharacterCard characterArray={characterInfo}/>}
        {err&&<div>{err}</div>}
      </div>
    )
  }
}

export default App;

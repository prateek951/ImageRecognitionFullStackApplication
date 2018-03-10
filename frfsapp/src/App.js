import React, { Component } from 'react';
import Particles from "react-particles-js";
import Clarifai from 'clarifai';
import FaceRecognition from "./components/FaceRecognition";
import Navigation from './components/Navigation';
import Logo from "./components/Logo";
import ImageLinkForm from "./components/ImageLinkForm";
import SignIn from './components/Signin/Signin';
import Register from './components/Signin/Register';

import Rank from "./components/Rank";
import './App.css';

const app = new Clarifai.App({
  apiKey: "b36bbd677f724f3088c1fe38242d85ac"
});


const particlesOps = {
  particles: {
    number: {
      value : 200,
      density : {
        enable: true,
        value_area: 800
      }
    }
  }
};
class App extends Component {
  /** Initial state of the application**/
  constructor(){
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {

      },
      route: 'signin',
      isLoggedIn: false
    }
  }
    calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }
  displayFacebox = box => {
    console.log(box);
    this.setState({
      box
    })
  }

  onInputChange = (event) =>{
    this.setState({input : event.target.value});
  }
  onButtonSubmit = () => {
    // {input} = this.state;

    this.setState({
      imageUrl: this.state.input
    });
    // console.log('Click');
    app.models.predict(
        Clarifai.FACE_DETECT_MODEL,
        this.state.input
      )
      .then(response => 
          // console.log(response);
          // console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
          this.displayFacebox(this.calculateFaceLocation(response)))
          .catch(err => console.log(err));
  }
  onRouteChange = (route) => {
    if(route === 'signout'){
      this.setState({isLoggedIn : false});
    }else if(route === 'home'){
      this.setState({isLoggedIn : true});
    }
    this.setState({route : route})
  }
  render() {
    const {isLoggedIn, imageUrl, route, box} = this.state;
    return (
    <div className="App">
      <Particles className="particles" params={particlesOps} />
      <Navigation isLoggedIn={isLoggedIn}onRouteChange={this.onRouteChange}/>
      { route === 'home'
      ?   <div>
          <Logo />
          <Rank />
          <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
          <FaceRecognition box={box} imageUrl={imageUrl} />
        </div>
      : (route === 'signin'?
        <SignIn onRouteChange={this.onRouteChange}/> 
        :
        <Register onRouteChange={this.onRouteChange}/>
      )
      }
    </div>
    );
  }
}

export default App;

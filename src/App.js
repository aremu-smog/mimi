import React from 'react';
import './Style.css';
import { tsConstructorType } from '@babel/types';

class App extends React.Component {

  constructor(){
    super()
    this.state = {
      topText: "",
      bottomText: "",
      imgUrl : "./images/dummy.png",
      imgStatus: false,
      errorMessage : "",
    }
  }

  updateText = (e) => {
    const {name,value} = e.target
    this.setState({
      [name] : value
    })
  }

  getRandomImage = () =>{
    this.setState({
      imgStatus : false
    })
    
    fetch("https://api.imgflip.com/get_memes").
    then(res => res.json())
    .then(data => {
      const allData = data.data.memes;
      const allDataLength = allData.length;
      const randomIndex = Math.floor(Math.random() * allDataLength)
      this.setState({
        imgUrl: data.data.memes[randomIndex].url,
        imgStatus : true
      })
    }).catch(
      this.setState({
        errorMessage : "Unable to connect to the API"
      })
    )

  }

  componentDidMount(){
    this.getRandomImage();
  }

  handleSubmit = (e) =>{
    e.preventDefault();
    this.getRandomImage();
  }
  render(){
    let feedback = ""
    if(feedback === ""){
      feedback = this.state.imgStatus === true ? "Click here to generate image" : "Loading Image..."
    }else{
      feedback = this.state.errorMessage
    }
    return (
      <div class="wrapper">
        <div class="app">
            <header> <h1>MEME GENERATOR</h1></header>
            <section class="inner">
              <form onSubmit={this.handleSubmit}>
                <div><input type="text" name="topText" onChange={this.updateText} placeholder="Enter top text here" /></div>
                <div><input type="text" name="bottomText" onChange={this.updateText} placeholder="Enter bottom text here" /></div>
                <div>
                    <button>{feedback}</button>
                </div>
                </form>
                <section class="meme">
                    <img src={this.state.imgUrl} alt="" width="100%" />
                    <h1 class="topText">{this.state.topText}</h1>
                    <h1 class="bottomText">{this.state.bottomText}</h1>
                </section>
            </section>
  
        </div>
    </div>
    );

  }
  
}

export default App;

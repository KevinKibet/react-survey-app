import React, { Component } from 'react';
import './App.css';
const firebase = require("firebase");
const uuid = require("uuid");




  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyB8tS4D5ML58hmrvvsTpvY3MT2tDFGyMZU",
    authDomain: "survey-app-2393b.firebaseapp.com",
    databaseURL: "https://survey-app-2393b.firebaseio.com",
    projectId: "survey-app-2393b",
    storageBucket: "survey-app-2393b.appspot.com",
    messagingSenderId: "669523557039"
  };
  firebase.initializeApp(config);


class Survey extends Component {

   constructor(props){
     super(props);
     this.state = {
       uid: uuid.v1(),
       YourName: '',
       Answers:{
       	Answer1:'',
       	Answer2:'',
       	Answer3:''
       	
       },
       isSubmited: false
     };
this.AnswerSelected = this.AnswerSelected.bind(this)
   }


submit(){
       var name = this.refs.name.value
       this.setState({YourName:name}, console.log(this.state))
  	}


AnswerSelected(event){
   var answer = this.state.Answers ;
   if(event.target.name === 'answer1'){
     answer.Answer1 = event.target.value ;
   }else if(event.target.name === 'answer2'){
    answer.Answer2 = event.target.value ;
   }else if(event.target.name === 'answer3'){
    answer.Answer3 = event.target.value ;
   }
  this.setState({Answers:answer}, console.log(this.state))
}  	


Quizsub(){

firebase.database().ref('surveydb/'+this.state.uid).set({
	username: this.state.YourName,
	answers:this.state.Answers
});
 this.setState({isSubmited : true});
}
 
  render() {


  	
 
var nameS;
var questions;

if(this.state.YourName==='' && this.state.isSubmited ===false){
	nameS =<div>

 <h3>Please Enter Your Name</h3>
   <form onSubmit={this.submit.bind(this)}>
    <input className="nn" type="text" placeholder= "Enter your name!" ref = "name"/>
   </form>
       
	</div>

	questions = '';
}else if(this.state.YourName!=='' && this.state.isSubmited ===false){
  nameS = <div>
    <h3> Welcome to My survey Questions:{this.state.YourName}</h3>

  </div>
    questions = <div>
      <h3> Here are some questions</h3>
       <form onSubmit={this.Quizsub.bind(this)}>
          <div className="cards">
          
          <label>whats car do you like ?:</label> <br/><br/>
           <input type="radio" name="answer1" value="audi" onChange={this.AnswerSelected} />Audi
           <input type="radio" name="answer1" value="mercedes" onChange={this.AnswerSelected} />Mercedes
           <input type="radio" name="answer1" value="VolksWagen" onChange={this.AnswerSelected} />VolksWagen
          <input type="radio" name="answer1" value="bmw" onChange={this.AnswerSelected} />Beamer
          
          </div><br/>



           <div className="card">
          <label>from the four sports below, which do you pefer ?:</label> <br/><br/>
           <input type="radio" name="answer2" value="soccer" onChange={this.AnswerSelected} />Soccer
           <input type="radio" name="answer2" value="basketball" onChange={this.AnswerSelected} />Basket ball
           <input type="radio" name="answer2" value="golf" onChange={this.AnswerSelected} />Golf
           <input type="radio" name="answer2" value="boxing" onChange={this.AnswerSelected} />Boxing
             </div><br/>



           <div className="card">
          <label>which city do you like ? :</label> <br/><br/>
           <input type="radio" name="answer3" value="Nairobi" onChange={this.AnswerSelected} />Nairobi
           <input type="radio" name="answer3" value="Eldoret" onChange={this.AnswerSelected} />Eldoret
           <input type="radio" name="answer3" value="Kisumu" onChange={this.AnswerSelected} />Kisumu
           <input type="radio" name="answer3" value="Mombasa" onChange={this.AnswerSelected} />Mombasa
           </div>



        <input type="submit"  value="submit"></input>

       </form>
       
    </div>
}else if(this.state.isSubmited===true){

   nameS = <div><h2> Thanks for your submission {this.state.YourName}</h2></div>

}
   

    return (
      <div className="App">
        <h1> {nameS} </h1>
        <div>{questions}</div>
      </div>
    );
  }
}

export default Survey;


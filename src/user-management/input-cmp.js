import React, { Component } from 'react';

export class InputCmp extends React.Component{
	
	constructor(props){
    	
    	super(props);
		this.init = this.init.bind(this);
		this.handleChangeName = this.handleChangeName.bind(this);
		this.handleChangeEmail = this.handleChangeEmail.bind(this);
		this.handleChangeNumber = this.handleChangeNumber.bind(this); 
		this.submit = this.submit.bind(this);
		this.editChecker = this.editChecker.bind(this);

		this.init();
	}

	//init the state
	init(){
		console.log("this.props.item", this.props.item);
		if(!!this.props.item){
			this.state = {
				name: this.props.item.name,
				id: this.props.item.id,
				number: this.props.item.number,
				// email: this.props.item.email,
				errorMsg: ""
			};
		}else{
			this.state = {
				name: "",
				// id: "",
				number: "",
				email: "",
				errorMsg: ""
			};
		}
	}

	//Handle the name change in the input box
	handleChangeName(e){
		this.setState({ name: e.target.value });
	};

	//Handle the number chang in the input box
	handleChangeNumber(e) {
		this.setState({ number: e.target.value });
	}

	//Handle the email change in the input box
	handleChangeEmail(e) {
		this.setState({ email: e.target.value });
	}

	//validate all input information
	inputValidation() {
		let errorCollector = "Please provide:";
		// var phoneRex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
		if (this.state.name.length < 5) {
			//compose error if lenght of name less than 5
			errorCollector = errorCollector.concat(" Name ");
		}
		if (this.state.email.indexOf("@") === -1) {
			//compose error if email address is not contains @
			errorCollector = errorCollector.concat(" Email ");
		}
		if (!this.state.number) {
			errorCollector = errorCollector.concat(" Number ");
		}
		if (errorCollector === "Please provide:") {
			return;
		} else {
			return errorCollector;
		}
	}
	//compose and submit the item
	submit(e){
		e.preventDefault();
		let validationMsg = this.inputValidation();
		//if there in no error msg return for input validation
		if (validationMsg === undefined) {
			//compose the new item
			let item = {
				name: this.state.name,
				number: this.state.number,
				email: this.state.email
			}
			//if id is not exist then this is the new item
			if (!this.state.id){
				item.id = Date.now();
				this.props.handleSubmit(item);
			}else{
				//this is the edit item
				item.id = this.state.id;
				this.props.handleEdit(item);
			}

		}else{
			this.setState({ errorMsg: validationMsg })
			return;
		}
		
	}
	//render the edit function
 	editChecker(){
		  if (!this.state.id) {
				  return (<button>Add new</button>);
	 		}else{
				  return (
					<div className="edit-group">
				  	 <button onClick={this.props.cancel}>Cancel</button>
					 <button onClick={this.submit}>Save</button>
				  </div>
				         );
	 		}
 	}
 	
 	//cancel the edit
 	cancel(){
 		this.setState()
 	}

	render(){
		return(
	       <div className="input-section">
			<form onSubmit={this.submit}>
		      <input onChange={this.handleChangeName} value={this.state.name} placeholder="Full Name"/>
		      <input className="email" onChange={this.handleChangeEmail} value={this.state.email} placeholder="Email Address" />
		      <input onChange={this.handleChangeNumber} value={this.state.number} placeholder="Phone Number" />
			  {this.editChecker()}
		    </form>
			{!!this.state.errorMsg ? <p className="error-msg">{this.state.errorMsg}</p> : null}
		  </div> 
		       )
	}
}
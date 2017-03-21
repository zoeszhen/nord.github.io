import React, { Component } from 'react';
import logo from './logo.svg';
import Mddelete from 'react-icons/lib/md/delete'
import Mdedit from 'react-icons/lib/md/edit'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleChangeNumber = this.handleChangeNumber.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this);
    this.inputValidation = this.inputValidation.bind(this);
        //generate 20 user data with json
    var initData = require("./data.json");
    this.state = { 
    userList: initData, 
      name: "", 
      email: "", 
      number: "", 
      errorMsg:"",
    };
  }
// name: "", email: "" , number: ""
  render() {
    return (
      <div className="App">
      <div className="list-header">
        <img src={logo} className="company-logo" alt="logo" />
        </div>
        <div className="list-body">
          <h1 className="body-title">List of Participants</h1>
          <div className="input-section">
            <form onSubmit={this.handleSubmit}>
              <input onChange={this.handleChangeName} value={this.state.name} placeholder="Full Name"/>
              <input className="email" onChange={this.handleChangeEmail} value={this.state.email} placeholder="Email Address" />
              <input onChange={this.handleChangeNumber} value={this.state.number} placeholder="Phone Number" />
              <button>Add new</button>
            </form>
              {!!this.state.errorMsg ? <p className="error-msg">{this.state.errorMsg}</p> : null}
          </div> 
          <TableList items={this.state.userList} />
        </div>
     </div>
    );
  }

  handleChangeName(e) {
    this.setState({ name: e.target.value });
  };

  handleChangeEmail(e) {
    this.setState({ email: e.target.value });
  };

  handleChangeNumber(e) {
    this.setState({ number: e.target.value });
  };

  inputValidation(){
    var errorCollector = "Please provide:";
    // var phoneRex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

    if (!this.state.name || this.state.name.length < 5) {
      errorCollector = errorCollector.concat(" Name "); 
    }
    if (!this.state.email || this.state.email.indexOf("@") === -1) {
      errorCollector = errorCollector.concat(" Email ");
    }
    if (!this.state.number) {
      errorCollector = errorCollector.concat(" Number ");
    }
    if (errorCollector === "Please provide:"){
      return;
    }else{
      return errorCollector;
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    var res = this.inputValidation();
    if (!!res) {
      this.setState({ errorMsg: res });
      return;
    }
    var newItem = {
      number: this.state.number,
      email: this.state.email,
      name: this.state.name,
      id: Date.now()
    };

    this.setState((prevState) => ({
      userList: [newItem].concat(prevState.userList),
      name: "", 
      email: "", 
      number: "" ,
      errorMsg: ""
    }));
  }
}

class TableList extends React.Component {
  constructor(props){
    super(props);
    this.state={
      editModeId: ""
    }
  }
  
  handleDelete(item) {
    var index = this.props.items.indexOf(item);
    delete this.props.items[index];
    this.setState({ userList: this.props.items })
    return;
  }

  changeEditMode(item){
    console.log(item);
    this.setState({ editModeId: item.id });
  }

  normalList(item){
    return(<div className="result-list-body" key={item.id}>
            <div className="input-item">
              <span className="result-name">{item.name}</span>
              <span className="result-email">{item.email}</span>
              <span>{item.number}</span>
            </div>
            <div className="edit-set">
              <Mdedit className="icon" onClick={
                ()=>{
                  this.changeEditMode(item)
                }} />
              <Mddelete className="icon" onClick={()=>{
                this.handleDelete(item);
                        }} />
            </div>
           </div>)
  }

  editList(item){
    console.log("item", item);
    return(
        <div className="input-section">
          <form onSubmit={this.handleSubmit}>
            <input onChange={this.handleChangeName} value={item.name} placeholder="Full Name" />
            <input className="email" onChange={this.handleChangeEmail} value={item.email} placeholder="Email Address" />
            <input onChange={this.handleChangeNumber} value={item.number} placeholder="Phone Number" />
            <button>Add new</button>
          </form>
          {!!this.state.errorMsg ? <p className="error-msg">{this.state.errorMsg}</p> : null}
        </div> 
      )
  }

  render() {
    return (
      <div className="list-result"> 
        <div className="list-body-title">
          <span className="result-name">Name</span>
          <span className="result-email">Email</span>
          <span>Phone Number</span>
        </div>
        {this.props.items.map(item => (
          this.state.editModeId !== item.id ? this.normalList(item) : this.editList(item)         
        ))}
      </div>
    );
  }
}
export default App;

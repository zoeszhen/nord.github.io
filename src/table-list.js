import React, {Component}from 'react';
import Mddelete from 'react-icons/lib/md/delete';
import Mdedit from 'react-icons/lib/md/edit';
import { InputCmp } from './input-cmp';


export class TableList extends React.Component{
  constructor(props){
    super(props);
    let init = require("./data.json");
    
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.cancel = this.cancel.bind(this);
    this.sort = this.sort.bind(this);

    this.state = {
      userList: init,
      editModeId:""
    };

    this.asc = true;
  }
  
  handleDelete(item) {

    let index = this.state.userList.indexOf(item);
    delete this.state.userList[index];
    this.setState({ userList: this.state.userList });
    return;
  }

  changeEditMode(item){
    this.setState({ editModeId: item.id });
  }

  cancel() {
    this.setState({ editModeId: "" });
  }

  normalList(item){
    return(
           <div className="result-list-body" key={item.id}>
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
    return(
    <InputCmp item={item} cancel={this.cancel} handleEdit={this.handleEdit} />
      );
  }

  handleSubmit(item) {
    this.setState((prevState) => ({
      userList: [item].concat(prevState.userList),
      editModeId: ""
    }));
  }

  handleEdit(item) {
    let tempUserList = [].concat(this.state.userList);
    let element = tempUserList.find( x =>{
        return x.id === item.id
      });
      element.name = item.name;
      element.number = item.number;
      element.email = item.email;

      this.setState({
      userList: tempUserList,
      editModeId: ""
    })
  }

  sort(field){
    let tempUserList = [].concat(this.state.userList);
    let ascending = (a, b) => {
    let itemA = a[field].toUpperCase(); // ignore upper and lowercase
    let itemB = b[field].toUpperCase(); // ignore upper and lowercase
      if (itemA < itemB) {
        return -1;
      }
      if (itemA > itemB) {
        return 1;
      }

      // names must be equal
      return 0;
    };

    let descending = (a, b) => {
      let itemA = isNaN(parseFloat(a[field])) ? a[field] : a[field].toUpperCase(); // ignore upper and lowercase
      let itemB = isNaN(parseFloat(b[field])) ? b[field]: b[field].toUpperCase(); // ignore upper and lowercase
      if (itemA < itemB) {
        return 1;
      }
      if (itemA > itemB) {
        return -1;
      }

      // names must be equal
      return 0;
    };

    if (this.asc) {
         tempUserList.sort(ascending);
    }else{
      tempUserList.sort(descending);
    }

    this.asc = !this.asc;
    
    this.setState({ userList: tempUserList});
  }

  render() {
    return (
      <div>
      <InputCmp handleSubmit={this.handleSubmit} />
        <div className="list-result"> 
          <div className="list-body-title">
          <span className="result-name" onClick={() => {
            this.sort('name');
          }}>Name</span>
          <span className="result-email" onClick={() => {
            this.sort('email');
          }}>Email</span>
          <span onClick={() => {
            this.sort('number');
          }}>Phone Number</span>
          </div>
          {this.state.userList.map(item => (
            this.state.editModeId !== item.id ? this.normalList(item) : this.editList(item)         
          ))}
        </div>
      </div>
    );
  }
}
import React from 'react';
import Mddelete from 'react-icons/lib/md/delete';
import Mdedit from 'react-icons/lib/md/edit';
import MdArrowDownward from "react-icons/lib/md/arrow-downward";
import MdArrowUpward from"react-icons/lib/md/arrow-upward"
import { InputCmp } from './input-cmp';

export class TableList extends React.Component{
  constructor(props){
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.cancel = this.cancel.bind(this);
    this.sort = this.sort.bind(this);
    this.arrowChecker = this.arrowChecker.bind(this);
    this.state = {
      //generate 20 users with json
      //need little tweaks
      userList: require("./data.json"),
      editModeId:""
    };
     
    //indicate sort direction
    this.direction = { name: "", upward: false };
  }

  //delete the user from list
  handleDelete(item) {

    let index = this.state.userList.indexOf(item);
    delete this.state.userList[index];
    this.setState({ userList: this.state.userList });
    return;
  }
  // change to the edit mode
  changeEditMode(item){
    this.setState({ editModeId: item.id });
  }
  //cancel the edit session
  cancel() {
    this.setState({ editModeId: "" });
  }
  //render the not edit mode list
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
  //render list input
  editList(item){
    return(
    <InputCmp key={item.id} item={item} cancel={this.cancel} handleEdit={this.handleEdit} />
      );
  }
  //add item to user list
  handleSubmit(item) {
    this.setState((prevState) => ({
      userList: [item].concat(prevState.userList),
      editModeId: ""
    }));
  }
  //handle edit 
  handleEdit(item) {
    let tempUserList = [].concat(this.state.userList);
    //find the correct id insert the new data
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

      // must be equal
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

      // must be equal
      return 0;
    };

    if (this.direction.upward) {
         tempUserList.sort(ascending);
    }else{
      tempUserList.sort(descending);
    }

    this.direction.upward = !this.direction.upward;
    this.direction.name = field;
    
    this.setState({ userList: tempUserList});
  }
  
  //check sort data and direction
  arrowChecker(field){
    if (field !== this.direction.name){
      return;
    }
    if (!this.direction.upward){
      return (< MdArrowDownward />)
    }else{
      return (< MdArrowUpward />)
    }
  }

  render() {
    return (
      <div>
      <InputCmp handleSubmit={this.handleSubmit} />
        <div className="list-result"> 
          <div className="list-body-title">
          <span className="result-name" onClick={() => {
            this.sort('name');
          }}>Name{this.arrowChecker('name')}</span>
          <span className="result-email" onClick={() => {
            this.sort('email');
          }}>Email{this.arrowChecker('email')}</span>
          <span onClick={() => {
            this.sort('number');
          }}>Phone Number{this.arrowChecker('number')}</span>
          </div>
          {this.state.userList.map(item => (
            this.state.editModeId !== item.id ? this.normalList(item) : this.editList(item)         
          ))}
        </div>
      </div>
    );
  }
}
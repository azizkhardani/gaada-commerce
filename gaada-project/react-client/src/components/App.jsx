import React from "react";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
import Home from "./Home.jsx";
import Profile from "./Profile.jsx"
import Field from "./Field.jsx"
import Basket from "./Basket.jsx"
import Ticket from "./Ticket.jsx"
import axios from "axios";

export default class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      users: [],
      view: "home",
      user:{},
      basket: []
        };
    this.changeView = this.changeView.bind(this);
    this.getItems = this.getItems.bind(this);
    this.getUsers = this.getUsers.bind(this);
  }

  componentDidMount() {
    this.getItems();
    this.getUsers()
  }

  getUsers () {
    axios.get('/users').then(res =>{
      this.setState({users : res.data})
      console.log(this.state.users , "users") 
    }).catch(err=>{
      console.log(err);
    })
    
  }
  getItems() {
    axios.get("/items").then((res) => {
      this.setState({ items: res.data });
      console.log(this.state.items, "items");
    }).catch(err=>{
      console.log(err);
    })
  }

  changeView(option) {
      this.setState({
        view: option,
      });
  }

  renderView() {
    const { view, items,basket } = this.state;

    if (view === "home") {
      return <Home items={items} changeView={this.changeView} basket={basket}/>;
    } else if (view === "login") {
      return <Login handleChange={()=> this.changeView('profil')}/>;
    } else if (view === "sign up") {
      return <Signup handleChange={()=> this.changeView('field')} />;
    }
    else if (view === "field"){
      return <Field  changeView={this.changeView} user={this.state.user}/>;
    }
    else if (view === "profil"){
      return <Profile users={this.state.users} items={this.state.items} />
    }else if(view === "basket") {
     return <Basket basket={this.state.basket} changeView={this.changeView}/>
    }else{
      return <Ticket basket={this.state.basket} changeView={this.changeView}/>
    }
  }

 

  render() {
    return (
      <div>
        <div className="nav">
          <span 
          className="logo"
          style={{cursor:"pointer"}}
          onClick={() => this.changeView("home")}> Ga3da commerce </span>
          <span
            className={
              this.state.view === "home" ? "nav-selected" : "nav-unselected"
            }
            style={{cursor:"pointer"}}
            onClick={() => this.changeView("home")}>  Home </span>
          <span
            className="nav-unselected"
            style={{cursor:"pointer"}}
            onClick={() => this.changeView("login")}> Login </span>
          <span
            className="nav-unselected"
            style={{cursor:"pointer"}}
            onClick={() => this.changeView("sign up")}> Sign up </span>
            </div>
        <div>
          {this.renderView()}
        </div>
      </div>
    );
  }
}

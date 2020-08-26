import React from "react";
import Axios from "axios";
import { connect } from "react-redux";
import { loginUser } from "../redux/reducer";

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      newUser: false,
    };
  }

  login = () => {
    const { email, password } = this.state;
    Axios.post("/auth/login", { email, password })
      .then((res) => {
        this.props.loginUser(res.data);
        this.props.history.push("/front_page");
      })
      .catch((err) => {
        console.log(err);
        alert("You Fail At Life!");
      });
  };

  register = () => {
    const { email, password, firstName, lastName } = this.state;
    Axios.post("/auth/register", { email, password, firstName, lastName })
      .then((res) => {
        this.props.loginUser(res.data);
        this.props.history.push("/front_page");
      })
      .catch((err) => {
        console.log(err);
        alert("You Are A Failure!");
      });
  };

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  toggle = () => {
    this.setState({ newUser: !this.state.newUser });
  };

  render() {
    const { email, password, firstName, lastName } = this.state;
    return (
      <div className="login">
        <div className="login-container">
          <h1>Welcome!</h1>
          {!this.state.newUser ? (
            <div>
              <input
                name="email"
                type="text"
                value={email}
                placeholder="Email"
                onChange={(e) => this.changeHandler(e)}
              />
              <input
                name="password"
                type="password"
                value={password}
                placeholder="Password"
                onChange={(e) => this.changeHandler(e)}
              />
              <div className="btn-container">
                <button onClick={this.login}>Login</button>
                <button onClick={this.toggle}>Sign Up</button>
              </div>
            </div>
          ) : (
            <div>
              <input
                name="firstName"
                type="text"
                value={firstName}
                placeholder="First Name"
                onChange={(e) => this.changeHandler(e)}
              />
              <input
                name="lastName"
                type="text"
                value={lastName}
                placeholder="Last Name"
                onChange={(e) => this.changeHandler(e)}
              />
              <input
                name="email"
                type="text"
                value={email}
                placeholder="Email"
                onChange={(e) => this.changeHandler(e)}
              />
              <input
                name="password"
                type="password"
                value={password}
                placeholder="Password"
                onChange={(e) => this.changeHandler(e)}
              />
              <div className="btn-container">
                <button onClick={this.register}>Register</button>
                <button onClick={this.toggle}>Already have an account</button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { loginUser })(Login);

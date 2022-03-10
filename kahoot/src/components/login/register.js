import React from "react";
import kahoot from "../../kahoot.png";

export class Register extends React.Component {
  state ={ 
    username: "",
    email: "",
    password: "",
    errors: {},
  }

  onChange = (e) => {
    this.setState({[e.target.name] : e.target.value});
  }

  formValidation = () => {
    const {username, email, password} = this.state;
    let isValid = true;
    const errors = {};

    if (username.trim().length <5){
      errors.usernameLength = "Username must be of Length 5 or higher!";
      isValid = false;
    }
    if (!email.includes(".") || !email.includes("@") || email.trim().length < 5){
      errors.emaildot= "Email must be valid!";
      isValid = false;
    }
    if (password.trim().length <8){
      errors.passwordLength = "Password must be of Length 8 or higher!";
      isValid = false;
    }
    this.setState({errors});
    return isValid;
  }

  onSubmit = (e) => {
    e.preventDefault();
    const isValid = this.formValidation();
  }
  constructor(props) {
    super(props);
  }

  render() {
    const{username, email, password, errors} = this.state;
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="header">Register</div>
        <div className="content">
          <div className="image">
            <img src={kahoot} />
          </div>
          <div className="form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input type="text" name="username" placeholder="username" value={username} onChange={this.onChange} />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="text" name="email" placeholder="email" value={email} onChange={this.onChange}/>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" placeholder="password" value={password} onChange={this.onChange}/>
            </div>
          </div>
        </div>
        <div className="footer">
          <button type="button" className="btn" onClick={this.onSubmit}>
            Register
          </button>

          {Object.keys(errors).map((key)=>{
              return <div style={{color: 'red'}} key={key} >{errors[key]}</div>
          })}
        </div>
      </div>
    );
  }
}
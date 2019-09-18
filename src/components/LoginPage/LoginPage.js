import React, { Component } from 'react';
import { connect } from 'react-redux';

//STYLING IMPORTS
import './LoginPage.css';

//MATERIAL-UI IMPORTS
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import { AccountCircle, VpnKey } from '@material-ui/icons';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class LoginPage extends Component {
  state = {
    username: '',
    password: ''
  };

  login = event => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'LOGIN',
        payload: {
          username: this.state.username,
          password: this.state.password
        }
      });
    } else {
      this.props.dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  handleInputChangeFor = propertyName => event => {
    this.setState({
      [propertyName]: event.target.value
    });
  };

  handleEnter = event => {
    if (event.key === 'Enter') {
      this.login(event);
    }
  };

  render() {
    return (
      <div className="LoginPage">
        {this.props.errors.loginMessage && (
          <p className="alert" role="alert">
            {this.props.errors.loginMessage}
          </p>
        )}

        <div className="login-form">
          <FormControl>
            <TextField
              onChange={this.handleInputChangeFor('username')}
              id="username"
              label="Enter username..."
              value={this.state.username}
              type="text"
              margin="normal"
              onKeyPress={this.handleEnter}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                )
              }}
            />
            <TextField
              onChange={this.handleInputChangeFor('password')}
              id="password"
              label="Enter password..."
              value={this.state.password}
              type="password"
              margin="normal"
              onKeyPress={this.handleEnter}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <VpnKey />
                  </InputAdornment>
                )
              }}
            />
            <Button
              type="submit"
              color="primary"
              variant="contained"
              onClick={this.login}
            >
              Login
            </Button>

            <Button
              size="small"
              onClick={() => {
                this.props.dispatch({ type: 'SET_TO_REGISTER_MODE' });
              }}
            >
              Register
            </Button>
          </FormControl>
        </div>
      </div>
    );
  }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(mapStateToProps)(LoginPage);

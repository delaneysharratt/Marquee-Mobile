import React, { Component } from 'react';
import { connect } from 'react-redux';

//STYLING IMPORTS
import './RegisterPage.css';

//MATERIAL-UI IMPORTS
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import { AccountCircle, VpnKey } from '@material-ui/icons';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class RegisterPage extends Component {
  state = {
    username: '',
    password: ''
  };

  registerUser = event => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'REGISTER',
        payload: {
          username: this.state.username,
          password: this.state.password
        }
      });
    } else {
      this.props.dispatch({ type: 'REGISTRATION_INPUT_ERROR' });
    }
  }; // end registerUser

  handleInputChangeFor = propertyName => event => {
    this.setState({
      [propertyName]: event.target.value
    });
  };

  handleEnter = event => {
    if (event.key === 'Enter') {
      this.registerUser(event);
    }
  };

  render() {
    return (
      <div className="RegisterPage">
        {this.props.errors.registrationMessage && (
          <p className="alert" role="alert">
            {this.props.errors.registrationMessage}
          </p>
        )}

        <div className="register-form">
          <FormControl>
            <TextField
              onChange={this.handleInputChangeFor('username')}
              id="create-username"
              label="Create username..."
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
              id="create-password"
              label="Create password..."
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
              onClick={this.registerUser}
            >
              Register
            </Button>

            <Button
              size="small"
              onClick={() => {
                this.props.dispatch({ type: 'SET_TO_LOGIN_MODE' });
              }}
            >
              Login
            </Button>
          </FormControl>
        </div>
      </div>
    );
  }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
const mapStateToProps = ({ errors }) => ({ errors });
// const mapStateToProps = state => ({
//   errors: state.errors,
// });

export default connect(mapStateToProps)(RegisterPage);

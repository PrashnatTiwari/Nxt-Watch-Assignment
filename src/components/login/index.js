import {Component} from 'react'
import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
    isChecked: false,
  }

  onClickCheckbox = () => {
    this.setState(prevState => ({
      isChecked: !prevState.isChecked,
    }))
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  onChangePassword = event => {
    this.setState({
      password: event.target.value,
    })
  }

  onChangeUsername = event => {
    this.setState({
      username: event.target.value,
    })
  }

  onSubmitLoginForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const apiUrl = 'https://apis.ccbp.in/login'
    const userDetails = {
      username,
      password,
    }
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  renderLoginData = () => {
    const {showSubmitError, errorMsg, username, password, isChecked} =
      this.state
    return (
      <div className="login-card-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
          className="image"
          alt=""
        />
        <form className="form-container" onSubmit={this.onSubmitLoginForm}>
          <label htmlFor="username" className="username-label">
            USERNAME
          </label>
          <input
            type="text"
            className="username-input"
            id="username"
            placeholder="Username"
            onChange={this.onChangeUsername}
            value={username}
          />
          <label htmlFor="password" className="username-label">
            PASSWORD
          </label>
          <input
            type={isChecked ? 'text' : 'password'}
            className="username-input"
            id="password"
            placeholder="Password"
            onChange={this.onChangePassword}
            value={password}
          />
          <div className="show-password-container">
            <input
              type="checkbox"
              id="showPassword"
              className="show-password-input"
              onClick={this.onClickCheckbox}
            />
            <label htmlFor="showPassword" className="show-password-label">
              Show Password
            </label>
          </div>
          <button className="login-button" type="submit">
            Login
          </button>
          {showSubmitError && <p className="warning-msg">{errorMsg}</p>}
        </form>
      </div>
    )
  }

  render() {
    return <div className="login-bg-container">{this.renderLoginData()}</div>
  }
}

export default Login

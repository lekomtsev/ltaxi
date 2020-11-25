/* eslint react/prop-types: 0 */
import React from 'react'
import LoginPage from '../../views/Login/LoginPage'
import {connect} from 'react-redux'
import {loginActions}  from '../../modules/Auth/authentication'

class Login extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: '',
      submitted: false,
      tempPasswordHidden: false,
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(evt) {
    const { name, value } = evt.target;
    this.setState({ [name]: value });
  }

  handleSubmit (evt) {
    evt.preventDefault()

    this.setState({ submitted: true })
    const { username, password } = this.state

    const { dispatch } = this.props
    if (username && password) {
      dispatch(loginActions.login(username, password))
    }
  }

  render() {
    const { username, password, submitted, tempPasswordHidden } = this.state
    const { loggingIn } = this.props

    return (
      <LoginPage
        loggingIn={loggingIn}
        username={username}
        password={password}
        submitted={submitted}
        tempPasswordHidden={tempPasswordHidden}
        handleChange ={this.handleChange}
        handleSubmit={this.handleSubmit}
      />
    )
  }
}


function mapStateToProps(state) {
  const loggingIn = state.auth.get('loggingIn')

  return {
    loggingIn
  }
}

const connectedLoginPage = connect(mapStateToProps)(Login);
export { connectedLoginPage as Login }

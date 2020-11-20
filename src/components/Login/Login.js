/* eslint react/prop-types: 0 */
import React from 'react'
import LoginPage from '../../views/Login/LoginPage'
import {connect} from "react-redux";

class Login extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: '',
      submitted: false,
      tempPasswordHidden: false,
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

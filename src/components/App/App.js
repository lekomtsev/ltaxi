import React from 'react'
import {Router, Route, Switch} from 'react-router'
import { connect } from 'react-redux'
import { history } from '../../helpers'
import Layout from '../../layouts/Layout/Layout'
import { PrivateRoute } from '../../routes'
import { Login } from '../../components/Login/Login'

/*const routes = [
  {
    path: '/login',
    component: Login
  },
  {
    path: '/about',
    component: Login // change to About
  },
  {
    path: '/faq',
    component: Login // change to Login
  },
]*/

class App extends React.Component {
  constructor(props) {
    super(props)
    // const { dispatch } = this.props

    /*history.listen((location, action) => {
      dispatch(alertActions.clear())
    })*/
  }

  render() {

    return (
      <div className='jumbotron'>
        <div className='container'>
          <div className="col-sm-8">

            <Router history={history}>
              <Switch>
                {
                  /*routes.map((route, index) => {
                    return <Route key={index} {...route} />
                  })*/

                  <Route path='/login' component={Login} />
                }

                {/*<PrivateRoute component={Layout}/>*/}
                <PrivateRoute component={Layout}/>
              </Switch>
            </Router>

          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const {alert} = state
  return {
    alert
  }
}

export default connect(mapStateToProps)(App);

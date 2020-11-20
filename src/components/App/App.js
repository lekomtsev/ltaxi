import React from 'react'
import { Router, Route, Switch } from 'react-router'
import { connect } from 'react-redux'
import { history } from '../../helpers'



// import logo from '../../logo.svg'
import Header from '../Header/Header'
import Main from '../Main/Main'
import Footer from '../Footer/Footer'

class App extends React.Component {
  constructor(props) {
    super(props)
    const { dispatch } = this.props

    history.listen((location, action) => {
      dispatch(alertActions.clear())
    })
  }

  render() {

    return (
      <div className='jumbotron'>
        <div className='container'>
          <div className="col-sm-8">


            <Router>
              <Switch>
                <Route />
              </Switch>
            </Router>
          </div>
        </div>
      </div>
    )
  }
}

export default App

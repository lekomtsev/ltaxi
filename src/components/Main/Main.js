import React from 'react'
import './Main.scss'
import Order from '../Order/Order'
import Display from '../Display/Display'

class Main extends React.Component {

  handleSubmit() {

  }


  render() {

    return (
      <main className="main">
        <div className="container">
          <Order />
          <Display />
          <button
            className="main__button button button--primary button--md"
            onClick={this.handleSubmit}
          >Заказать</button>
        </div>
      </main>
    )
  }
}

export default Main

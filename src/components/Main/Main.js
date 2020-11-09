import React from 'react'
import './Main.scss'

class Main extends React.Component {

  handleSubmit() {

  }


  render() {

    return (
      <main className="main">
        <div className="container">
          {/*Order*/}
          {/*Display*/}
          <button
            className="button button--primary button--md"
            onClick={this.handleSubmit}
          >Заказать</button>
        </div>
      </main>
    )
  }
}

export default Main

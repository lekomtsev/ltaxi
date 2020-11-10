/* eslint react/prop-types: 0 */
import React from 'react'
import './Main.scss'
import Order from '../Order/Order'
import Display from '../Display/Display'
import { connect } from 'react-redux'

class Main extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isValid: false,
      inputValue: ''
    }
  }

  /**
   * Обработчик кнопки Заказать
   */

  handleSubmit = () => {
    // console.log(evt, 'evt - button')
    // Проверяем на пустоту
    // инпут и массив экипажей
    console.log( this.props.handleCrews, 'this.props.handleCrews' )

    this.checkValidateOrder()

    // const inputValue = this.props.inputValue
    // console.log(crews, inputValue, 'crews - inputValue')

    /*if (this.isValidOrder()) {
      console.log( 'ОТПРАВКА ЗАЯВКИ !!!' )
    } else {
      console.log( 'ВЫКЛЮЧАЕМ КНОПКУ !!!' )
      this.setState({ isValidate: false })
    }*/
  }

  checkValidateOrder = () => {
    const inputValue = document.querySelector('#search-input').value.trim()
    console.log(inputValue, 'inputValue')
    // const isValidate = this.state.isValidate
    const crews = this.props.handleCrews

    if (inputValue && crews.length) {
      this.setState({ isValid: true })
    } else {
      this.setState({ isValid: false })
    }

    console.log( 'checkValidateOrder' )
  }

  render() {
    console.log( this.state, 'this.state Main' )


    let button

    // if (this.isValidOrder()) {
    // if ('232') {
      button = <button className="main__button button button--primary button--md"
        onClick={this.handleSubmit} >Заказать</button>
    // } else {
      // button = <span className="main__button button button--primary button--md">Заказать</span>
    // }

    console.log( this.props, 'props from Main' )

    return (
      <main className="main">
        <div className="container">
          <Order />
          <Display />
          {button}
        </div>
      </main>
    )
  }
}

function mapStateToProps(state) {
  console.log(state, 'state from Main')

  return {
    handleCrews: state.map.preparedCrews,
    inputValue: state.searchFrom.inputValue,
  }
}

export default connect(mapStateToProps)(Main)

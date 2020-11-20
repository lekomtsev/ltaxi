/* eslint react/prop-types: 0 */
import React from 'react'
import './Main.scss'
import Order from '../Order/Order'
import Display from '../Display/Display'
import {connect} from 'react-redux'

// export const createOrder = React.createContext(false)

class Main extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      inputValue: '',
      isClickedOrderButton: false,

      /*validate: {
        // Проверка поля, проверка экипажей,
        // проверка правильности ввода в инпуте...
        isValid: true,
        isFirstClick: true,
        isFirstRender: true,
      }*/
    }
  }

  /**
   * Обработчик кнопки Заказать
   */

  handleSubmit = () => {
    // console.log( this.props.handleCrews, 'this.props.handleCrews' )
    // const searchInput = document.querySelector('#search-input')
    // const inputValue = searchInput.value.trim()
    // this.checkValidateOrder(inputValue)

    /*this.setState({
      isClickedOrderButton: true
    })

    console.log( this.state.isClickedOrderButton, 'this.state.isClickedOrderButton' )*/

    // this.props.submitOrder(this.state.isClickedOrderButton)
    /*if (this.state.isValid
      && !this.state.isFirstClick
      && !this.state.isFirstRender) {
      console.log('ОТПРАВКА ЗАЯВКИ !!!')
    } else {
      console.log('Кидаем ошибку под инпутом !!!')
      this.setState({isValidate: false})
    }
    !this.state.isFirstClick || this.setState({isFirstClick: false})*/
  }

  /**
   * Проверка валидации полей
   *
   * Нужно перепилить обработку ошибок
   *
   */

  /*checkValidateOrder = (value) => {
    if (typeof value === 'undefined') {
      value = document.querySelector('#search-input').value.trim()
    }

    const crews = this.props.handleCrews
    this.setState({ inputValue: value })

    value && crews.length
      ? this.setState({ isValid: true })
      : this.setState({ isValid: false })

      // console.log( 'checkValidateOrder' )
  }*/

  /**
   * Обработчик котрый вызывается сразу после обновления
   *
   * Проверяем обновления экипажей, если есть изменения
   * проводим проверку чтобы изменить state
   * @param prevProps
   *
   * Рассмотреть альтернативу - shouldComponentUpdate(nextProps, nextState)
   */

  componentDidUpdate(prevProps) {
    if (this.props.handleCrews !== prevProps.handleCrews) {
      // this.checkValidateOrder()
    }
    // !this.state.isFirstRender || this.setState({ isFirstRender: false })
    // console.log( this.state.isClickedOrderButton, 'this.state.isClickedOrderButton' )
    // this.props.submitOrder(this.state.isClickedOrderButton)
  }

  componentDidMount() {
    console.log('componentDidMount')

  }

  componentWillUnmount() {
    console.log('componentWillUnmount')

    this.setState({
      isClickedOrderButton: false
    })

    console.log( this.state.isClickedOrderButton, 'isClickedOrderButton' )
  }

  /**
   * Обработка ошибок инпут и карта
   *  - подкрасить инпут и вывести внизу текст об ошибке
   *  - подкарсить карту и вывести ошибку вверху карты
   */

  handleErrors() {
  }

  render() {
    // const disabled = !this.state.isValid ? 'disabled' : ''
    // const disabled = this.state

    return (
      <main className="main">
        <div className="container">


          <Order
            dataSearch={ this.dataSearch }
            // isClickedOrderButton={ this.state.isClickedOrderButton }
            onButtonClick={this.handleSubmit.bind(this)}
          />

          <Display />

          {/*<createOrder.Provider value={this.state.isClickedOrderButton}>
          </createOrder.Provider>*/}

          <button className="main__button button button--primary button--md"
                  onClick={this.handleSubmit}
                  disabled={ this.state.isClickedOrderButton }>Заказать
          </button>
        </div>
      </main>
    )
  }
}

function mapStateToProps(state) {

  console.log(state, 'props from Main' )

  return {
    handleCrews: state.map.preparedCrews,
    inputValue: state.searchFrom.inputValue,
    isClickedOrderButton: state.main.isClickedOrderButton,
  }
}

function mapDispatchToProps(dispatch) {

  // const data = this.state.isClickedOrderButton

  return {
    submitOrder: (data) => dispatch({
      type: 'submitOrder',
      value: data
    })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)

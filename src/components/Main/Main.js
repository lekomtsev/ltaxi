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
      isValid: true,
      inputValue: '',
      isFirstClick: true,
      isFirstRender: true,
    }
  }

  /**
   * Обработчик кнопки Заказать
   */

  handleSubmit = () => {
    // console.log( this.props.handleCrews, 'this.props.handleCrews' )

    const searchInput = document.querySelector('#search-input')
    const inputValue = searchInput.value.trim()

    this.checkValidateOrder(inputValue)

    if (this.state.isValid
      && !this.state.isFirstClick
      && !this.state.isFirstRender) {

      console.log( 'ОТПРАВКА ЗАЯВКИ !!!' )

    } else {
      console.log( 'Кидаем ошибку под инпутом !!!' )

      this.setState({ isValidate: false })
    }

    !this.state.isFirstClick || this.setState({ isFirstClick: false })
  }

  /**
   * Проверка валидации полей
   */

  checkValidateOrder = (value) => {
    if (typeof value === 'undefined') {
      value = document.querySelector('#search-input').value.trim()
    }

    const crews = this.props.handleCrews
    this.setState({ inputValue: value })

    value && crews.length
      ? this.setState({ isValid: true })
      : this.setState({ isValid: false })

      // console.log( 'checkValidateOrder' )
  }

  /**
   * Обработчик котрый вызывается сразу после обновления
   *
   * Проверяем обновления экипажей, если есть изменения
   * проводим проверку чтобы изменить state
   * @param prevProps
   */

  componentDidUpdate(prevProps) {

    if (this.props.handleCrews !== prevProps.handleCrews) {
      this.checkValidateOrder()
    }

    !this.state.isFirstRender || this.setState({ isFirstRender: false })
  }

  /**
   * Обработка ошибок инпут и карта
   *  - подкрасить инпут и вывести внизу текст об ошибке
   *  - подкарсить карту и вывести ошибку вверху карты
   */

  handleErrors() {}

  render() {
    const disabled = !this.state.isValid ? 'disabled' : ''

    return (
      <main className="main">
        <div className="container">
          <Order
            inputValueChange={this.checkValidateOrder}
            props={{
              isValid: this.state.isValid,
              inputValue: this.state.inputValue
            }}
          />
          <Display />
          <button className="main__button button button--primary button--md"
            onClick={this.handleSubmit} disabled={disabled}>Заказать</button>
        </div>
      </main>
    )
  }
}

function mapStateToProps(state) {

  return {
    handleCrews: state.map.preparedCrews,
    inputValue: state.searchFrom.inputValue,
  }
}

export default connect(mapStateToProps)(Main)

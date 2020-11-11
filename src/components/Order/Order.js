/* eslint react/prop-types: 0 */
import React from 'react'
import './Order.scss'
import SelectedCrew from '../SelectedCrew/SelectedCrew'
import { connect } from 'react-redux'

class Order extends React.Component {

  handleSearch = (evt) => {
    // Записываем значение в хранилище
    // this.props.handleInputSearch(evt.target.value)

    // this.props.onFilterTextChange(evt.target.value)
    this.props.inputValueChange(evt.target.value)
  }

  render() {
    const { handleCrews } = this.props
    const { isValid, inputValue } = this.props.props
    // console.log(this.props, 'this.props - Order')

    const errorClass = (!isValid && !inputValue) ? 'error' : null
    const classInput = ['search__input', errorClass].filter(Boolean).join(' ')

    return (
      <div className="order">
        <div className="order__list">
          <div className="search order__item">
            <div className="search__label">Откуда</div>
            <input
              className={classInput}
              placeholder="Введите адрес"
              id="search-input"
              type="text"
              onChange={this.handleSearch}
            />
            {
              (!isValid && !inputValue) ? (<div className="error__hint">Введите адрес в поле!</div>) : null
            }
          </div>
          <div className="order__item selected-crew">
            <div className="selected-crew__label">Подходящий экипаж</div>
            {
              !!handleCrews.length && (<SelectedCrew crew={handleCrews[0]}/>)
            }
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {

  return {
    handleCrews: state.map.preparedCrews,
    // inputValue: state.searchFrom.inputValue,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handleInputSearch: (data) => dispatch({
      type: 'changeInput',
      value: data
    })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Order)

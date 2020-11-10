/* eslint react/prop-types: 0 */
import React from 'react'
import './Order.scss'
import SelectedCrew from '../SelectedCrew/SelectedCrew'
import { connect } from 'react-redux'

class Order extends React.Component {

  handleSearch = (evt) => {
    // console.log(evt, 'evt - handleSearch')
    console.log(this.props, 'evt - handleSearch')

    // Записывае значение в хранилище
    this.props.handleInputSearch(evt.target.value)
  }

  render() {
    const { handleCrews } = this.props
    console.log(!!handleCrews, 'handleCrews')

    return (
      <div className="order">
        <div className="order__list">
          <div className="search order__item">
            <div className="search__label">Откуда</div>
            <input
              className="search__input"
              placeholder="Введите адрес"
              id="search-input"
              type="text"
              onChange={this.handleSearch}
            />
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
  console.log(state, 'state from Order')

  return {
    handleCrews: state.map.preparedCrews,
    inputValue: state.searchFrom.inputValue,
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

import React from 'react'
import './Order.scss'

class Order extends React.Component {

  handleSearch(evt) {
    console.log(evt, 'evt - handleSearch')

  }

  render() {

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

          <div className="order__item">
            selected auto
          </div>

        </div>
      </div>
    )
  }
}

export default Order

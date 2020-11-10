/* eslint react/prop-types: 0 */
import React from 'react'
import './Display.scss'
import YandexMap from '../YandexMap/YandexMap'
import Crews from '../Crews/Crews'
import {connect} from 'react-redux'

class Display extends React.Component {

  render() {
    console.log(this.props.handleCrews, 'this props')

    const isEmptyArrayCrews = this.props.handleCrews.length

    return (
      <div className="display">
        <div className="display__map">
          <YandexMap/>
        </div>
        <div className="display__crews">
          {
            isEmptyArrayCrews && this.props.handleCrews.map((car, index) => {
              return (
                // Экипажи
                <Crews
                  key={index}
                  title={`${car.car_mark} ${car.car_model}`}
                  color={car.car_color}
                  distance={car.distance}
                />
              )
            })
          }
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  console.log(state, 'state from Display')

  return {
    // inputValue: state.searchInput.inputValue,
    handleCrews: state.map.preparedCrews
  }
}

export default connect(mapStateToProps)(Display)

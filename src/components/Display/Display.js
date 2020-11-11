/* eslint react/prop-types: 0 */
import React from 'react'
import './Display.scss'
import YandexMap from '../YandexMap/YandexMap'
import Crews from '../Crews/Crews'
import {connect} from 'react-redux'

class Display extends React.Component {

  render() {
    const crews = this.props.handleCrews

    return (
      <div className="display">
        <div className="display__map">
          <YandexMap />
        </div>
        <div className="display__crews">
          {
            !!crews.length && crews.map((car, index) => {
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

  return {
    handleCrews: state.map.preparedCrews
  }
}

export default connect(mapStateToProps)(Display)

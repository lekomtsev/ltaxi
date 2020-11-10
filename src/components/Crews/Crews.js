/* eslint react/prop-types: 0 */
import React from 'react'
import './Crews.scss'
import car from '../../assets/images/car.svg'

export default function Crews (props) {

  return (
    <div className="crew">
      <div className="crew__header">
        <img src={car} alt="Car"/>
      </div>
      <div className="crew__body">
        <div className="crew__title">{props.title}</div>
        <div className="crew__description">
          <div className="crew__color">{props.color}</div>
          <div className="crew__distance">{props.distance} м</div>
        </div>
      </div>
    </div>
  )
}

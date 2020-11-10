import React from 'react'
import './SelectedCrew.scss'

export default function selectedCrew(props) {
  const { crew } = props

  return (
    <div className="selected-crew__auto">
      <div className="selected-crew__auto-title">{`${crew.car_mark} ${crew.car_model}`}</div>
      <div className="selected-crew__auto-color">{crew.car_color}</div>
      <div className="selected-crew__auto-number">{crew.car_number}</div>
    </div>
  )
}

/* eslint react/prop-types: 0 */
import React from 'react'
import './YandexMap.scss'
// import {YMaps, Map} from 'react-yandex-maps'
// import crewsData from '../../assets/data/crews-data.json'
import {connect} from 'react-redux'

// import { defaultState, style, options, modules, getTime } from './options'


class YandexMap extends React.Component {
  constructor(props) {
    super(props)

    this.ymaps = null

    this.state = {
      isOpen: true,
    }
  }

  /**
   * Запускается после того,
   * как компонент отрендерился
   */

  componentDidMount() {
    console.log('componentDidMount')

  }

  /**
   * Запускается после того,
   * как компонент отработал
   */

  componentWillUnmount() {
    console.log('componentWillUnmount')

  }



  render() {

    console.log( this.ymaps )

    return (
      <div className="map"></div>
    )
  }
}


function mapStateToProps(state) {

  return {
    preparedCrews: state.map.preparedCrews,
    inputValue: state.searchFrom.inputValue,
    isClickedOrderButton: state.main.isClickedOrderButton,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handlePreparedCrews: (data) => dispatch({
      type: 'handleCrews',
      value: data
    }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(YandexMap)

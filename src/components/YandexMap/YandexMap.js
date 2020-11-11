/* eslint react/prop-types: 0 */
import React from 'react'
import './YandexMap.scss'
import {YMaps, Map} from 'react-yandex-maps'
import crewsData from '../../assets/data/crews-data.json'
import {connect} from 'react-redux'

const defaultState = {
  center: [56.868654, 53.180669],
  zoom: 15,
}

const style = {
  width: '100%',
  height: '100%',
}

// https://yandex.ru/dev/maps/jsapi/doc/2.1/ref/reference/Map.html/
const options = {
  suppressMapOpenBlock: true,
}

// https://yandex.ru/dev/maps/jsapi/doc/2.1/ref/reference/SuggestView.html/
const modules = [
  'SuggestView',
  'geocode',
  'geoObject.addon.balloon',
  'Placemark',
]

function YandexMap(props) {
  const ymaps = React.useRef(null)
  const placemarkRef = React.useRef(null)
  const mapRef = React.useRef(null)
  // const errorClass = !props.preparedCrews.length ? 'error' : null
  // const mapClasses = ['map', errorClass].filter(Boolean).join(' ')

  /**
   * Обработка клика по карте
   */

  const handleMapClick = (evt) => {
    const coords = evt.get('coords')

    if (placemarkRef.current) {
      placemarkRef.current.geometry.setCoordinates(coords)
    } else {

      // Формируем placemark
      placemarkRef.current = new ymaps.current.Placemark(coords,
        {iconCaption: 'loading..'},
        {
          preset: 'islands#yellowDotIconWithCaption',
          draggable: true
        }
      )

      // Устанавливаем placemark
      mapRef.current.geoObjects.add(placemarkRef.current)

      // Обработка драга
      placemarkRef.current.events.add('dragend', function () {
        handleAddress(placemarkRef.current.geometry.getCoordinates())
      })

      // Достает адрес, даллее отправляет
      // запрос на сервер
      handleAddress(coords)
    }
  }

  /**
   * Обработка после загрузки карты
   * Нужно сделать:
   *  - прелодаер
   *
   */

  const handleMapLoading = () => {
    // Подключение встроенного поиска
    new ymaps.current.SuggestView('search-input')

    // Можно подкючить прелоадер и дальнейший
    // необходимый функционал....

  }

  /**
   * Обработка Адреса и Отправка данных на сервер
   */

  const handleAddress = (coords) => {
    placemarkRef.current.properties.set('iconCaption', 'Загружаю...')

    ymaps.current
      .geocode(coords)
      .then((res) => {
        const firstGeoObject = res.geoObjects.get(0)
        const searchInput = document.querySelector('#search-input')

        // getLocalities, getThoroughfare, getPremise, getAdministrativeAreas,
        // getAddressLine, getPremiseNumber(номер здания), getThoroughfare
        const street = firstGeoObject.getThoroughfare() || firstGeoObject.getPremise()
        const buildingNumber = firstGeoObject.getPremiseNumber()
        const userSelectedAddress = [street, buildingNumber].filter(Boolean).join(', ')

        // setAddress(userSelectedAddress)

        // Заполняем адрес в инпуте
        // Возможно нужно будет добавлять город
        searchInput.value = userSelectedAddress

        placemarkRef.current.properties.set({
          iconCaption: userSelectedAddress,
          balloonContent: firstGeoObject.getAddressLine()
        });

        // Отправка запроса на сервер
        dispatchCrews(coords, userSelectedAddress)
      });
  }

  /**
   * Обработка Адреса и Отправка данных на сервер
   */

  const dispatchCrews = (coords, userSelectedAddress) => {
    // Формируем данные для отправки на сервак
    const dataSendServer = getDataSendServer(coords, userSelectedAddress)

    // !!! Здесь данные котрые отпряем на Сервер
    // далее Сервер нам как-то ответчает, думаем что
    // все хорошо и к нам пришли данные
    console.log(dataSendServer, 'Данные котрые уходят на СЕРВЕР')

    // Эмулируем задержку и вызываем обработку
    // котрая добавит метки на карте
    setTimeout(function () {
      // addCrewToMap(crewsData) - моковые данные

      addCrewsToMap()

    }, 1500)
  }

  /**
   * Добавляем экипаже на нашей карте
   *
   * Беру моковые данные из data
   */

  const addCrewsToMap = () => {
    // Данные из папки data
    const crewsInfo = crewsData.data.crews_info

    // Отрисовка точек на карте
    crewsInfo.forEach(function (crew) {

      mapRef.current.geoObjects.add(
        new ymaps.current.Placemark([crew.lat, crew.lon],
          {iconCaption: crew.driver_name},
          {
            preset: "islands#greenDotIconWithCaption",
            draggable: false
          })
      )

    })

    // Автоматический зум если не влазим в карту
    // https://yandex.ru/dev/maps/jsapi/doc/2.1/ref/reference/Map.html/#method_detail__setBounds
    mapRef.current.setBounds(mapRef.current.geoObjects.getBounds(), {
      checkZoomRange: true,
      zoomMargin: 21
    })

    // Сортируем по расстоянию
    const preparedCrews = crewsInfo.sort(function (min, max) {
      return min.distance - max.distance
    })

    // Записывем данные в хранилище
    // eslint-disable-next-line react/prop-types
    props.handlePreparedCrews(preparedCrews)
  }

  /**
   * Формируем данные для запроса на сервер
   *
   * !!! Внимание НЕ успел описать функцию которая
   * будет возвращать время - формат времени ГГГГММДДччммсс
   */

  const getDataSendServer = (coords, userSelectedAddress) => {

    return {
      "source_time": "20200101010101",
      "addresses": [
        {
          "address": userSelectedAddress,
          "lat": coords[0],
          "lon": coords[1]
        }
      ]
    }
  }

  return (
    <div className="map">
      <YMaps query={{apikey: '15889421-76d3-4520-8621-2336844763e1'}}>
        <Map
          onLoad={(ymapsInstance) => {
            ymaps.current = ymapsInstance
            handleMapLoading()
          }}
          onClick={handleMapClick}
          instanceRef={mapRef}
          defaultState={defaultState}
          style={style}
          options={options}
          modules={modules}
        >
          {/*state.showPlacemark && (
              <Placemark geometry={this.state.placemarkGeometry}/>
          )*/}
        </Map>
      </YMaps>
    </div>
  )
}

function mapStateToProps(state) {

  return {
    preparedCrews: state.map.preparedCrews,
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

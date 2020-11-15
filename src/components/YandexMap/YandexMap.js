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
  'suggest',
  'Map',
]


/**
 * Функция возвращает время в формате: ГГГГММДДччммсс
 * @returns {string}
 */

function getTime() {
  const now = new Date();
  const year = now.getFullYear().toString().padStart(2, '0')
  const month = (now.getMonth() + 1).toString().padStart(2, '0')
  const day = now.getDate().toString().padStart(2, '0')
  const hours = now.getHours().toString().padStart(2, '0')
  const minutes = now.getMinutes().toString().padStart(2, '0')
  const seconds = now.getSeconds().toString().padStart(2, '0')

  return `${year}${month}${day}${hours}${minutes}${seconds}`;
}


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

    console.log(evt, 'evt ------ handleMapClick')
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
    console.log('handleMapLoading')

    // https://codepen.io/dicemasters/pen/poJywYg
    const customProvider = {
      /*suggest: function(request, options) {
        console.log(request, options, 'customProvider')
        console.log(options.results, 'options result customProvider')
        var arr = [
          {displayName: 'auto', value: 'ford'},
          {displayName: 'auto', value: 'mazda'}
        ]
        return ymaps.current.vow.resolve(arr)
      }*/

      suggest: function (request, options) {
        delete options['provider']

        return ymaps.current.suggest(request, options).then(items => {
          var arrayResult = []
          var arrayPromises = []

          function pushGeoData(displayName, value, jsonData) {
            arrayResult.push({displayName: displayName, value: value, jsonData: jsonData});
          }

          items.forEach(i => {

            arrayPromises.push(ymaps.current.geocode(i.value).then(gc => {

              let displayName = ""
              let value = i.value

              if (!i.value.match(/.*подъезд.*/) && i.value.trim().match(/^.+ [а-яА-Я]+$/)) {
                let geoObject = gc.geoObjects.get(0)

                if (geoObject) {
                  let jsonData = JSON.stringify({
                    'city': geoObject.getLocalities()[0] || geoObject.getAdministrativeAreas()[0],
                    'street': geoObject.getThoroughfare() || geoObject.getLocalities()[0],
                    'house': geoObject.getPremiseNumber(),
                  })

                  if (geoObject.getCountryCode() === "RU") {
                    value = value.replace(geoObject.getCountry() + ", ", "");
                    value = value.replace(geoObject.getAdministrativeAreas()[0] + ", ", "")

                    displayName = value
                    value = value.replace("undefined", "")
                    displayName = displayName.replace("undefined", "")


                    const buildingNumber = geoObject

                    console.log(buildingNumber, jsonData, 'json DAta')


                    pushGeoData(displayName, value, jsonData)
                  }
                }
              }
            }))
          })

          return Promise.all(arrayPromises).then(function () {
            return ymaps.current.vow.resolve(arrayResult)
            // return ymaps.current.vow.resolve(arr)
          })
        })
      }
    }

    console.log( customProvider, 'customProvider' )

    // Подключение встроенного поиска
    const SuggestView = new ymaps.current.SuggestView('search-input', {
      // provider: customProvider,

    })

    // Срабатывает при выборе из выпадашки
    SuggestView.events.add("select", function(e){
      console.log(e.get('item').value, 'SuggestView value')
    })
    // console.log(suggestView, 'suggestView')


    // Можно подключить прелоадер и дальнейший
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
      "source_time": getTime(),
      "addresses": [
        {
          "address": userSelectedAddress,
          "lat": coords[0],
          "lon": coords[1]
        }
      ]
    }
  }

  console.log(props, 'props Yandex map')
  console.log(props.isClickedOrderButton, 'props Yandex map')

  /************/

  const geocode = () => {
    // Забираем запрос из поля ввода
    const request = props.inputValue || ''

    // Геокодируем введненные данные
    ymaps.current.geocode(request).then(function (res) {
      console.log(res, 'res from geocode')

      const resGeoObjects = res.geoObjects.get(0)
      let error = null
      let hint = null

      console.log(resGeoObjects, 'resGeoObjects')

      if (resGeoObjects) {
        switch (resGeoObjects.properties.get('metaDataProperty.GeocoderMetaData.precision')) {
          case 'exact':
            break
          case 'number':
          case 'near':
          case 'range':
            error = 'Неточный адрес, требуется уточнение';
            hint = 'Уточните номер дома';
            break;
          case 'street':
            error = 'Неполный адрес, требуется уточнение';
            hint = 'Уточните номер дома';
            break;
          case 'other':
          default:
            error = 'Адрес не найден'
            hint = 'Уточните адрес'
        }

      } else {
        error = 'Адрес не найден';
        hint = 'Уточните адрес';
      }

      console.log(error, hint, 'error - hint')


      // Если геокодер возвращает пустой массив или неточный результат, то показываем ошибку.
      if (error) {
        // showError(error);
        // showMessage(hint);
      } else {

        showResult(resGeoObjects);
      }


    }, function (evt) {
      console.log(evt)
    })


  }


  const showResult = (obj) => {
    console.log('showResult')
    // Удаляем сообщение об ошибке, если найденный адрес совпадает с поисковым запросом.
    // $('#suggest').removeClass('input_error');
    // $('#notice').css('display', 'none');

    // var mapContainer = $('#map')

    const bounds = obj.properties.get('boundedBy')

    console.log(bounds, 'bounds')

    // Рассчитываем видимую область для текущего положения пользователя.
    /*const mapState = ymaps.current.util.bounds.getCenterAndZoom(
      bounds,
      [700, 350]
      // [mapContainer.width(), mapContainer.height()]
    )*/

    // console.log(mapState, 'mapState')

    // Сохраняем полный адрес для сообщения под картой.
    const address = [obj.getCountry(), obj.getAddressLine()].join(', ')

    // Сохраняем укороченный адрес для подписи метки.
    const shortAddress = [obj.getThoroughfare(), obj.getPremiseNumber(), obj.getPremise()].join(' ')

    // Убираем контролы с карты.
    // mapState.controls = [];

    console.log(address, shortAddress, '123')

    // Создаём карту.
    createMap(obj, shortAddress);
    // Выводим сообщение под картой.
    // showMessage(address);

    // mapRef.current.setCenter(mapState.center, mapState.zoom);

    // placemarkRef.geometry.setCoordinates(mapState.center);
    // placemarkRef.properties.set({iconCaption: shortAddress, balloonContent: shortAddress});
  }

  function createMap(state, caption) {
    console.log('create map')
    // Если карта еще не была создана,
    // то создадим ее и добавим метку с адресом.

    console.log(state.ge, 'create map')

    if (!placemarkRef.current) {
      // map = new ymaps.Map('map', state);
      placemarkRef.current = new ymaps.current.Placemark(
        mapRef.current.getCenter(), {
          iconCaption: caption,
          balloonContent: caption
        }, {
          preset: 'islands#redDotIconWithCaption'
        });
      mapRef.current.geoObjects.add(placemarkRef.current);

      // Если карта есть, то выставляем новый центр карты и меняем
      // данные и позицию метки в соответствии с найденным адресом.
    } else {

      mapRef.current.setCenter(state.center, state.zoom);
      placemarkRef.current.geometry.setCoordinates(state.center);
      placemarkRef.current.properties.set({iconCaption: caption, balloonContent: caption});
    }
  }

  const testHandleSubmitOrder = () => {
    console.log(props, 'props testHandleSubmitOrder')

    // const inputFromValue = props.inputValue || ''

    geocode()
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


      <button onClick={testHandleSubmitOrder}>Test Button</button>

    </div>
  )
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

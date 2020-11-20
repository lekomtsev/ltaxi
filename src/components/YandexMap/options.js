
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

export { defaultState, style, options, modules, getTime };

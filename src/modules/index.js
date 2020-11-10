// Здесь подключаем все reducer
import { combineReducers } from 'redux'
import searchFrom from './SearchFrom/search-from'
import map from './Map/map'

export default combineReducers({
  searchFrom,
  map
})

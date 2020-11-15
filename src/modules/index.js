// Здесь подключаем все reducer
import { combineReducers } from 'redux'
import searchFrom from './SearchFrom/search-from'
import map from './Map/map'
import main from './Main/main'

export default combineReducers({
  searchFrom,
  map,
  main,
})

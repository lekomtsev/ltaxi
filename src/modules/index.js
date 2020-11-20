// Здесь подключаем все reducer
import { combineReducers } from 'redux'
import searchFrom from './SearchFrom/search-from'
import map from './Map/map'
import main from './Main/main'
import auth from './Auth/authentication'

export default combineReducers({
  searchFrom,
  map,
  main,
  auth,
})

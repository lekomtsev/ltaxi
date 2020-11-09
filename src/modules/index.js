// Здесь подключаем все reducer
import { combineReducers } from 'redux'
import searchFrom from './SearchFrom/search-from'
// import handleCrews from './reducers/map'

export default combineReducers({
  searchFrom
})

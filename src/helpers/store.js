import { createStore } from 'redux'
import rootReducer from '../modules'


// Передавать можем только один reducer
export const store = createStore(rootReducer)

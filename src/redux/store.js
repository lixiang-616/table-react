
import {createStore} from 'redux'
import countReducer from './count_reducers'
const store = createStore(countReducer)
export default store
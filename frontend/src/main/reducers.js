import { combineReducers } from 'redux'

const rooteReducer = combineReducers({
    dashboard: () => ({sumary: {credit: 100, deb: 50}})
})

export default rooteReducer







//este aquivo vai concatenar todos os reducers da app

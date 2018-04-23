import { combineReducers } from 'redux'

import DashboardReducer from '../dashboard/dashBoardReducer'

const rooteReducer = combineReducers({
    dashboard: DashboardReducer
})

export default rooteReducer







//este aquivo vai concatenar todos os reducers da app

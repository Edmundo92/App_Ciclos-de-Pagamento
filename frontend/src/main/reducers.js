import { combineReducers } from 'redux'

import DashboardReducer from '../dashboard/dashBoardReducer'
import TabReducer from '../commom/tab/tabReducer'

const rooteReducer = combineReducers({
    dashboard: DashboardReducer,
    tab: TabReducer
})

export default rooteReducer







//este aquivo vai concatenar todos os reducers da app

import { combineReducers } from 'redux'

import DashboardReducer from '../dashboard/dashBoardReducer'
import TabReducer from '../commom/tab/tabReducer'
import BillingCycleReducer from '../billingCycle/billingCycleReducer'

const rooteReducer = combineReducers({
    dashboard: DashboardReducer,
    tab: TabReducer,
    billingCycle: BillingCycleReducer
})

export default rooteReducer







//este aquivo vai concatenar todos os reducers da app

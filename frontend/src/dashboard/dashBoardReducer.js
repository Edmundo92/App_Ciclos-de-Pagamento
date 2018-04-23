const INITIAL_STATE = {summary: {credit: 100, debt: 50}}

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'BILLING_SUMMARY_FETCHED':
        console.log(action.payload.data)
            return { ...state, summary: action.payload.data }
        default:
            return state
    }
}
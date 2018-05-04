import axios from 'axios'
import { toastr } from 'react-redux-toastr'
import { reset as resetForm, initialize } from 'redux-form'
import { showTabs, selectTab } from '../commom/tab/tabActions'

const BASE_URL = 'http://localhost:3003/api'
const INITIAL_VALUES = {}

export function getList(){
    const request = axios.get(`${BASE_URL}/billingCycles`)
    return {
        type: 'BILLING_CYCLES_FETCHED',
        payload: request
    }
}


export function create(values){
    return dispatch => {
        axios.post(`${BASE_URL}/billingCycles`, values)
        .then(resp => {
            toastr.success('Sucesso', 'Operação Realizada com sucesso.')
            dispatch(init())
        })
        .catch(e => {
            e.response.data.errors.forEach(error => {
                toastr.error('Erro', error)
            })
        })
    }

    
    // return {
    //     type: 'TEMP'
    // }
}

// export function create(values){
//     return dispatch => {
//         axios.post(`${BASE_URL}/billingCycles`, values)
//         .then(resp => {
//             toastr.success('Sucesso', 'Operação Realizada com sucesso.')
//             dispatch([
//                 resetForm('billinCycleForm'),
//                 getList(),
//                 selectTab('tabList'),
//                 showTabs('tabList','tabCreate')
//             ])
//         })
//         .catch(e => {
//             e.response.data.errors.forEach(error => {
//                 toastr.error('Erro', error)
//             })
//         })
//     }

    
//     // return {
//     //     type: 'TEMP'
//     // }
// }


// Ao clicar no btn editar, vai ocultar as demais abas e ficará apenas a aba de alterar
export function showUpdate(billingCycle) {
    return [
        showTabs('tabUpdate'),
        selectTab('tabUpdate'),
        initialize('billingCycleForm', billingCycle )
    ]
}

export function init() {
    return [
        showTabs('tabList', 'tabCreate'),
        selectTab('tabList'),
        getList(),
        initialize('billingCycleForm', INITIAL_VALUES)// inicializar o form com os valores que estao na constante INITIAL_VALUES
    ]
}
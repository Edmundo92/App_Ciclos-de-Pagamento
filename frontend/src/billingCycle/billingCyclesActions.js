import axios from 'axios'
import { toastr } from 'react-redux-toastr'
import { reset as resetForm, initialize } from 'redux-form'
import { showTabs, selectTab } from '../commom/tab/tabActions'

const BASE_URL = 'http://localhost:3003/api'
// const INITIAL_VALUES = {}
const INITIAL_VALUES = {credits: [{}]}

export function getList(){
    const request = axios.get(`${BASE_URL}/billingCycles`)
    return {
        type: 'BILLING_CYCLES_FETCHED',
        payload: request
    }
}


export function create(values){
    return submit(values, 'post')
}

export function update(values) {
    return submit(values, 'put')
}

export function remove(values) {
    return submit(values, 'delete')
}

function submit(values, method) {
    return dispatch => {
        const id = values._id ? values._id : ''
        axios[method](`${BASE_URL}/billingCycles/${id}`, values)
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
//showUpdate e showDelete têm o mesmo code, refatorar usando uma func de formas a reaproveitar e n duplicar code
export function showUpdate(billingCycle) {
    return [
        showTabs('tabUpdate'),
        selectTab('tabUpdate'),
        initialize('billingCycleForm', billingCycle )
    ]
}

export function showDelete(billingCycle) {
    return [
        showTabs('tabDelete'),
        selectTab('tabDelete'),
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
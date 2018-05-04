import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { reduxForm, Field } from 'redux-form'

import { init } from './billingCyclesActions'
import labelAndInput from '../commom/form/labelAndInput'

class BillingCycleForm extends Component {
    render() {
        const { handleSubmit } = this.props
        return (
            <form role="form" onSubmit={handleSubmit}>
                <div className="box-body">
                    <Field name="name" component={labelAndInput} label="Nome"
                        cols="12 4" placeholder="Informe o nome" />
                    <Field name="month" component={labelAndInput} type="number"
                        label="Mês" cols="12 4" placeholder="Informe o mês" />
                    <Field name="year" component={labelAndInput} type="number"
                        label="Ano" cols="12 4" placeholder="Informe o ano" />
                </div>
                <div className="box-footer">
                    <button type="submit" className="btn btn-primary">Submit</button>
                    <button type="button" className="btn btn-default" onClick={this.props.init}>Cancelar</button>
                </div>
            </form>
        )
    }
}

/*
    Chamei o destroyOnUnmount pela seguinte questao
    Nessa app estamos a usar 2 instancias do componente <Form />, mas iremos usar 3.
    E o que eu quero fazer, é que quando clicar no btn editar/alterar ele deve trazer os dados da linha em que eu cliquei para a aba
    alterar e dessa forma eu posso alterar, mas o que acontece é que o redux por ter 2 instancias desse componente, ele n exibi as duas ao mesmo tempo
    logo, se ele renderizar uma, ao clicar na no btn editar, ele destroi o componente que está renderizado no momento e constroi o que foi pedido, dessa forma
    ele apaga os dados da linha que foi pedida. o destroyOnUnmount com o valor false, evita que o componente seja destruido e juntamente com os dados

*/

BillingCycleForm = reduxForm({form: 'billingCycleForm', destroyOnUnmount: false})(BillingCycleForm)
const mapDispatchToProps = dispatch => bindActionCreators({ init }, dispatch)

export default connect(null, mapDispatchToProps)(BillingCycleForm)
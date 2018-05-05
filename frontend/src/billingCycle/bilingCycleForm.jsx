import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { reduxForm, Field, formValueSelector } from 'redux-form'

import { init } from './billingCyclesActions'
import labelAndInput from '../commom/form/labelAndInput'
import ItemtList from './itemList'
import Summary from './summary'

class BillingCycleForm extends Component {

    //+c.value -> o mais na frente da var, permite que o js converta um valor que vem como string em um valor númerico
    calculateSummary(){
        const sum = (t, v) => t + v
        return {
            sumOfCredits: this.props.credits.map(c => +c.value || 0).reduce(sum),
            sumOfDebits: this.props.debts.map(d => +d.value || 0).reduce(sum)
        }
    }

    render() {
        const { handleSubmit, readOnly, credits, debts } = this.props
        const { sumOfCredits, sumOfDebits } = this.calculateSummary()

        return (
            <form role="form" onSubmit={handleSubmit}>
                <div className="box-body">
                    <Field name="name" component={labelAndInput} label="Nome" readOnly={readOnly}
                        cols="12 4" placeholder="Informe o nome" />
                    <Field name="month" component={labelAndInput} type="number" readOnly={readOnly}
                        label="Mês" cols="12 4" placeholder="Informe o mês" />
                    <Field name="year" component={labelAndInput} type="number" readOnly={readOnly}
                        label="Ano" cols="12 4" placeholder="Informe o ano" />

                    <Summary credit={sumOfCredits} debt={sumOfDebits}/>

                    <ItemtList cols="12 6" list={credits} readOnly={readOnly} field="credits" legend="Créditos" />
                    <ItemtList cols="12 6" list={debts} readOnly={readOnly} field="debts" legend="Débitos" showStatus={true}/>
                </div>
                <div className="box-footer">
                    <button type="submit" className={`btn btn-${this.props.submitClass}`}>
                        {this.props.submitLabel}
                    </button>
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

// 'billingCycleForm', é o id do formulário
BillingCycleForm = reduxForm({form: 'billingCycleForm', destroyOnUnmount: false})(BillingCycleForm)
const selector = formValueSelector('billingCycleForm')

const mapStateToProps = state => ({credits: selector(state, 'credits'), debts: selector(state, 'debts')})
const mapDispatchToProps = dispatch => bindActionCreators({ init }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(BillingCycleForm)
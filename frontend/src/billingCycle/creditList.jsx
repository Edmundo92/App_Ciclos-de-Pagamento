import React, { Component } from 'react'
import { Field, arrayInsert, arrayRemove } from 'redux-form'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Grid from '../commom/layout/grid'
import Input from '../commom/form/input'

class CreditList extends Component {

    add(index, item = {}) {
        if(!this.props.readOnly){
            this.props.arrayInsert('billingCycleForm', 'credits', index, item)
        }
    }

    remove(index) {
        //remove se os elementos do array forem > 1 e se o campo n for somente leitura
        if(!this.props.readOnly && this.props.list.length > 1){
            this.props.arrayRemove('billingCycleForm', 'credits', index)
        }
    }

    renderRows() {
        const list = this.props.list || []
        return list.map((item, index) => (
            <tr key={index}>
                <td><Field name={`credits[${index}].name`} component={Input} 
                    placeholder="Informe o nome" readOnly={this.props.readOnly}/></td>
                <td><Field name={`credits[${index}].value`} component={Input} 
                    placeholder="Informe o valor" readOnly={this.props.readOnly}/></td>
                <td>
                    <button type="button" className="btn btn-success"
                        onClick={() => this.add(index + 1)}><i className="fa fa-plus"></i></button>
                    <button type="button" className="btn btn-warning"
                        onClick={() => this.add(index + 1, item)}><i className="fa fa-clone"></i></button>
                    <button type="button" className="btn btn-danger"
                        onClick={() => this.remove(index)}><i className="fa fa-trash-o"></i></button>
                </td>
            </tr>
        ))
    }


    render() {
        return (
            <Grid cols={this.props.cols}>
                <fieldset>
                    <legend>Créditos</legend>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Valor</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderRows()}
                        </tbody>
                    </table>
                </fieldset>
            </Grid>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({arrayInsert, arrayRemove}, dispatch)

export default connect(null, mapDispatchToProps)(CreditList)



/*
    import { Field, arrayInsert, arrayRemove } from 'redux-form' - este treclho é que faz com que os campos inputs sejam:
    add, clonados e removidos

*/
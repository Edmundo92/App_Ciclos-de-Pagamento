import React from 'react'

import Grid from '../commom/layout/grid'
import Row from '../commom/layout/row'
import ValueBox from '../commom/widget/valueBox'

export default ({credit, debt}) => (
    <Grid cols="12">
        <fieldset>
            <legend>Resumo</legend>
            <Row>
                <ValueBox cols="12 4" color="green" icon="bank" value={`R$ ${credit}`} texto="Total de Créditos"/>
                <ValueBox cols="12 4" color="red" icon="credit-card" value={`R$ ${debt}`} texto="Total de Débitos"/>
                <ValueBox cols="12 4" color="blue" icon="money" value={`R$ ${credit - debt}`} texto="Valor consolidado"/>
            </Row>
        </fieldset>
    </Grid>
)
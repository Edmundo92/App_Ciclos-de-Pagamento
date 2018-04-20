import React from 'react'
import '../commom/template/dependencies'

import Header from '../commom/template/header'
import SideBar from '../commom/template/sidebar'
import Footer from '../commom/template/footer'

export default props =>(
    <div className="wrapper">
        <Header />
        <SideBar />
        <div className="content-wrapper">
            <h1>Conteudo</h1>
        </div>
        <Footer />
    </div>
)
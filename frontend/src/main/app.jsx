import React from 'react'
import '../commom/template/dependencies'

import Header from '../commom/template/header'
import SideBar from '../commom/template/sidebar'
import Footer from '../commom/template/footer'
// import Routes from './routes'
import Messages from '../commom/msg/messages'

export default props =>(
    <div className="wrapper">
        <Header />
        <SideBar />
        <div className="content-wrapper">
            {props.children}
        </div>
        <Footer />
        <Messages />
    </div>
)
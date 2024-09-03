import React from 'react'
import { connect } from 'react-redux'
import { Outlet } from 'react-router-dom'
function Main(props) {
    return (
        <Outlet />
    )
}
export default connect(
    state => ({
        routerMenu: state.routerMenu
    })
)(Main);

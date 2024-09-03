

import React, { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { Menu } from 'antd';
import store from "../redux/store"
import { connect } from 'react-redux'
import { createFetchMenu } from "../redux/count_aciton"
function Side(props) {
    const location = useLocation().pathname
    const [current, setCurrent] = useState(location);
    useEffect(() => {
        // store.dispatch(createFetchMenu(current))
    }, [current]);
    return (
        <Menu
            style={{
                width: 200,
                height: 'calc(100vh - 60px)',
            }}
            onSelect={(e) => { setCurrent(e.key) }}
            mode="inline"
            theme='dark'
            defaultSelectedKeys={[useLocation().pathname]}
        >
            <Menu.Item key='/Detail/jobManagemen'>
                <NavLink to='/Detail/jobManagemen'>作业管理</NavLink>
            </Menu.Item>
            <Menu.Item key='/Detail/explorationProject'>
                <NavLink end to='/Detail/explorationProject'>勘探项目</NavLink>
            </Menu.Item>
        </Menu>
    )
}
// export default connect(
//     state => ({
//         topMenu: state.topMenu
//     })
// )(Side);
const mapStateToProps = (state) => ({
    topMenu: state.topMenu,
    routerMenu: state.routerMenu
});
export default connect(mapStateToProps)(Side);

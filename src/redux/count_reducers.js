/*
    该文件是用于创建一个为Count服务的reducer，reducer的本质就是一个函数
    reducer函数会接到两个参数，分别为：之前的状态（preState），动作对象（action）
*/
import { FETCHMENU } from "./constant"
const state = {
    menuData: [],
    routerMenu: '',
    topMenu: [],
    menuList: [],
}

export default function countReducer(preState = state, action) {
    const { type, data } = action
    switch (type) {
        case FETCHMENU:
            return {
                ...state,
                routerMenu: data
            }
        default:
            return preState
    }
}

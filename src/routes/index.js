import React from "react"
import { Navigate } from "react-router-dom"
import JobManagemen from '../pages/jobManagemen'
import ExplorationProject from '../pages/explorationProject'
import Login from '../components/login'
import Dashboard from '../components/Dashboard'
import Detail from '../components/Detail'
export default [
    {
        path: '/',
        element: <Login />
    },
    {
        path: '/dashboard',
        element: <Dashboard />,
    },
    {
        path: '/Detail',
        element: <Detail />,
        children: [
            {
                path: '',
                element: <Navigate to='/Detail/jobManagemen' /> //二级路由重定向
            },
            {
                path: 'jobManagemen',
                element: <JobManagemen />

            },
            {
                path: 'explorationProject',
                element: <ExplorationProject />
            },
        ]
    },

]
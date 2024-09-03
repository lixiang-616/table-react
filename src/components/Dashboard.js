import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd'
export default function Dashboard() {
    const navigate = useNavigate()
    return (
        <>
            <Button onClick={() => {
                navigate('/Detail/jobManagemen')
            }}>跳转</Button>
        </>
    )
}

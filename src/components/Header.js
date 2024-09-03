import { Button } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'
export default function Header() {
  const navigator = useNavigate()
  return (
    <div style={{ height: '60px', lineHeight: '60px', paddingRight: '30px', background: '#333', textAlign: 'right', color: '#fff' }}>
      <Button onClick={() => { navigator('/dashboard') }} style={{background:'#333',border:'none',color:'#fff'}}>Header</Button>
    </div>
  )
}

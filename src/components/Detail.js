import React from 'react'
import Header from './Header'
import Side from './Side'
import Main from './Main'

export default function Detail() {
    return (
        <>
            <Header></Header>
            <div style={{ display: 'flex' }}>
                <Side></Side>
                <Main></Main>
            </div>
        </>
    )
}

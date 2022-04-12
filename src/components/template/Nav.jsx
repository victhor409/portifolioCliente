import React from 'react'
import {Link} from 'react-router-dom'

import "./Nav.css"

export default props=>

<aside className='menu-area'>
    <nav className='menu'>
        <Link to="/">
            <i className='fa fa-home'></i>Inicio
        </Link>
        <Link to="/cliente">
            <i className='fa fa-cliente'></i>Clientes
        </Link>
    </nav>
</aside>
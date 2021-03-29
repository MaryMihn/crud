import React, { useContext } from 'react'
import {NavLink, useHistory} from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export const NavBar = () => {
    const history = useHistory()
    const auth = useContext(AuthContext)
    const logoutHandler= event =>{
        event.preventDefault()
        auth.logout()
        history.push('/')
    }

    return (
        <nav>
            <div className="nav-wrapper blue darken-1">
                <ul id="nav-mobile" class="right hide-on-med-and-down">
                    <li><NavLink to="/create">create</NavLink></li>
                    <li><NavLink to="/links">profile</NavLink></li>
                    <li><a href='/' onClick={logoutHandler}>logout</a></li>
                </ul>
            </div>
        </nav>
    )
}
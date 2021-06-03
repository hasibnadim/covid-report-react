import React from 'react'
import logo from '../../logo.png'
import "./style.css"
export default function Header() {
    return (
        <nav>
            <div className="img-div">
                <img src={logo} alt="logo" />
            </div>
            <ul>
                <li>Home</li>
            </ul>
        </nav>
    )
}

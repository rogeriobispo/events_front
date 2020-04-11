import React from 'react'
import { Navbar } from "react-bootstrap"
import { user } from '../../services/authentication/auth'
import headerTitle from './headerTitle'
import './privatelayout.css'


export default function PrivateLayout(props) {
  return (
    <div className="App container">
      <Navbar fluid collapseOnSelect className="barSup  borderRightLeft">
        <headerTitle />
      </Navbar>

      {props.children}
    </div>
  );
}

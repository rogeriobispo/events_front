import React from 'react';
import { Navbar } from "react-bootstrap";
import HeaderTitle from './headerTitle'
import './publiclayout.css'
export default function PublicLayout(prop) {
  return (
    <div className="App container">
      <Navbar fluid collapseOnSelect>
        <HeaderTitle />
      </Navbar>
      {prop.children}
    </div>
  );
}

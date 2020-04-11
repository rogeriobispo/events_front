import React from 'react';
import { Navbar } from "react-bootstrap";
import HeaderTitle from './headerTitle'
import CreateEvent from './createEvent'

export default function PublicLayout(prop) {
  return (
    <div className="App container">
      <Navbar fluid collapseOnSelect>
        <CreateEvent />
        <HeaderTitle />

      </Navbar>
      {prop.children}
    </div>
  );
}

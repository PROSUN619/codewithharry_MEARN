import React from "react";
import { useContext } from 'react'
import AlertContext from "../contexts/notes/AlertContext";


export default function Alert() {
  //   debugger;

  const context = useContext(AlertContext)
  const { alert } = context;

  //console.log(alert);
  return (
        
    <div style={{ height: '50px' }}>
        {alert && <div className={`alert alert-${alert.type}`} role="alert">
        {alert.message}
      </div>}
    </div>

  );
}

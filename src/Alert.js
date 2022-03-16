import React from "react";

function Alert({ detail }) {
  return (
    <div className="alert">
      <h2 className="alert_heading">Alert</h2>
      <p className="alert_para">{detail}</p>
      <p className="ok">ok</p>
    </div>
  );
}

export default Alert;

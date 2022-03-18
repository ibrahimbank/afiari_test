import React from "react";
import edit from "./assest/edit.png";
import deleteBtn from "./assest/delete.png";

function TableBody({ contact }) {
  return (
    <div>
      {contact.map((con, key) => (
        <tr key={key} className="table_row user__data">
          <td className="table__data ">{con.mail} </td>
          <td className="table__data">{con.selectedCountry}</td>
          <td className="table__data">{con.selectedState} </td>
          <td className="table__data">{con.selectedCities} </td>
          <td className="table__data edit__delete">
            <img src={edit} alt="edit" className="edit" />
            <img className="delete" src={deleteBtn} alt="delete" />
          </td>
        </tr>
      ))}
    </div>
  );
}

export default TableBody;

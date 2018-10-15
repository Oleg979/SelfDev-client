import React from "react";

export default ({ text, time, onDelete, isChecked, onChange }) => (
  <div>
    <p>
      <b>{text}</b> <i>{time}</i>{" "}
      <input
        type="checkbox"
        name="isChecked"
        checked={isChecked}
        onChange={() => onChange()}
      />
      <a className="delete" onClick={() => onDelete()}>
        X
      </a>
    </p>
  </div>
);

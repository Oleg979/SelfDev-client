import React from "react";

export default ({ text, time, onDelete }) => (
  <div>
    <p>
      <b>{text}</b> <i>{time}</i>{" "}
      <a className="delete" onClick={() => onDelete()}>
        X
      </a>
    </p>
  </div>
);

import React from "react";

export default ({ text, time, tag, onDelete, isChecked, onChange }) => (
  <div className="task">
    <div className="task-info">
      <div className="tag">{tag}: </div>
      <div className="text">{text}</div>
      <div className="time">{time}</div>
    </div>
    <div className="task-methods">
      <a
        className={
          !isChecked
            ? "waves-effect waves-light btn red lighten-1"
            : "waves-effect waves-light btn  teal lighten-2"
        }
        style={{ marginRight: "5px" }}
        onClick={() => onChange(isChecked ? true : false)}
      >
        <i class="material-icons right">{!isChecked ? "error" : "done"}</i>
        {!isChecked ? "complete" : "done"}
      </a>
      <a
        class="waves-effect waves-light btn red lighten-1"
        onClick={() => onDelete()}
      >
        <i class="material-icons right">delete</i>
        delete
      </a>
    </div>
  </div>
);

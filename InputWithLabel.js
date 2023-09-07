import React from "react";

export default function InputWithLabel(props) {
  return (
    <div>
      <label>
        <b>{props.title}</b>
        <br></br>
        <input
          type={props.type}
          placeholder={props.placeholder}
          required
          value={props.value}
          onChange={props.onChange}
          style={{ width: "95%", padding: "8px" }}
        ></input>
      </label>
      <br></br>
      <br></br>
    </div>
  );
}

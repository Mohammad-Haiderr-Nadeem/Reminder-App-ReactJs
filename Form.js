import React from "react";

export default function Form( props ) {
  return (
    <div>
      <label htmlFor="Task">
        <b>Task</b>
        <br></br>
        <input
          type="text"
          name="task"
          placeholder="Add Task"
          required
          value={props.task}
          onChange={props.handleOnChangeTask}
          style={{ width: "95%", padding: "8px" }}
        ></input>
      </label>
      <br></br>
      <br></br>
      <label htmlFor="Date">
        <b>Day</b>
        <br></br>
        <input
          type="date"
          name="myDate"
          placeholder="Please select your date.."
          required
          value={props.myDate}
          onChange={props.handleOnChangeDate}
          style={{ width: "95%", padding: "8px" }}
        ></input>
      </label>
      <br></br>
      <br></br>
      <label htmlFor="Time">
        <b>Time</b>
        <br></br>
        <input
          type="time"
          name="myDate"
          placeholder="Add time"
          required
          value={props.myTime}
          onChange={props.handleOnChangeTime}
          style={{ width: "95%", padding: "8px" }}
        ></input>
      </label>
      <br></br>
      <br></br>
      <label htmlFor="description">
        <b>Description</b>
        <br></br>
        <input
          type="text"
          name="task"
          placeholder="Add Description"
          required
          value={props.description}
          onChange={props.handleOnChangeDescription}
          style={{ width: "95%", padding: "8px" }}
        ></input>
      </label>
    </div>
  );
}

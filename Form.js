import React from "react";
import InputWithLabel from "./InputWithLabel";

export default function Form(props) {
  return (
    <div>
      <InputWithLabel
        title="Task"
        type="text"
        value={props.task}
        onChange={props.handleOnChangeTask}
        placeholder="Add Task"
      />
      <InputWithLabel
        title="Date"
        type="date"
        value={props.myDate}
        onChange={props.handleOnChangeDate}
        placeholder="Add Date"
      />
      <InputWithLabel
        title="Time"
        type="time"
        value={props.myTime}
        onChange={props.handleOnChangeTime}
        placeholder="Add Time"
      />
      <InputWithLabel
        title="Description"
        type="text"
        value={props.description}
        onChange={props.handleOnChangeDescription}
        placeholder="Add Description"
      />
    </div>
  );
}

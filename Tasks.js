import React, { useEffect, useState } from "react";
import styles from "./Tasks.module.css";
import ListOfTasks from "./ListOfTasks";
import axios from "axios";
import moment from "moment";

export default function Tasks({ tasks, setTasks }) {
  const [task, setTask] = useState("");
  const [myDate, setMyDate] = useState("");
  const [myTime, setMyTime] = useState("");
  const [description, setDescription] = useState("");
  const [mergeDateAndTime, setMergeDateAndTime] = useState("");
  const [formatDateAndTime, setFormatDateAndTime] = useState("");
  const [taskOpen, setTaskOpen] = useState(true);
  const [toggleButton, setToggleButton] = useState("Close");
  const [color, setColor] = useState("red");
  const [isReminderSet, setIsReminderSet] = useState(false);

  const handleSubmit = (e) => {
    addTask();
    e.preventDefault();
  };

  useEffect(() => {
    if (myDate && myTime) {
      const mergedDateTime = myDate + " " + myTime;
      setMergeDateAndTime(mergedDateTime);
      const formattedDateTime = moment(mergedDateTime).format(
        "MMMM Do YYYY h:mm a"
      );
      setFormatDateAndTime(formattedDateTime);
    }
    getTaskList();
  }, [myDate, myTime]);

  const getTaskList = async () => {
    try {
      const response = await axios.get("http://localhost:4000/myTasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const addTask = async () => {
    if (task && myDate && myTime && description) {
      try {
        const response = await axios.post("http://localhost:4000/myTasks", {
          text: task,
          date: myDate,
          time: myTime,
          dateAndTime: mergeDateAndTime,
          desc: description,
          checked: isReminderSet,
        });
        setTasks([...tasks, response.data]);
        setTask("");
        setMyDate("");
        setDescription("");
      } catch (error) {
        console.error("Error adding task:", error);
      }
    }
  };

  const handleOnChangeTask = (e) => {
    setTask(e.target.value);
  };

  const handleOnChangeDate = (e) => {
    setMyDate(e.target.value);
  };

  const deleteTask = async (index) => {
    try {
      await axios.delete(`http://localhost:4000/myTasks/${index}`);
      const updatedTasks = tasks.filter((i) => i !== index);
      setTasks(updatedTasks);
      getTaskList();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleToggle = () => {
    if (toggleButton === "Close") {
      setTaskOpen(false);
      setToggleButton("Open");
      setColor("green");
    } else if (toggleButton === "Open") {
      setTaskOpen(true);
      setToggleButton("Close");
      setColor("red");
    }
  };

  const handleReminderChange = () => {
    setIsReminderSet(!isReminderSet);
  };

  const handleOnChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleOnChangeTime = (e) => {
    setMyTime(e.target.value);
  };

  return (
    <main>
      <div className={styles.container}>
        <span style={{ fontWeight: "bold", fontSize: "40px", color: "black" }}>
          Task Tracker
          <button
            onClick={handleToggle}
            style={{
              backgroundColor: color,
              color: "white",
              padding: "5px",
              width: "90px",
              marginLeft: "10%",
            }}
          >
            {toggleButton}
          </button>
        </span>

        {taskOpen && (
          <div>
            <br></br>
            <br></br>
            <form onSubmit={handleSubmit}>
              <label htmlFor="Task">
                <b>Task</b>
                <br></br>
                <input
                  type="text"
                  name="task"
                  placeholder="Add Task"
                  value={task}
                  onChange={handleOnChangeTask}
                  style={{ width: "100%" }}
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
                  value={myDate}
                  onChange={handleOnChangeDate}
                  style={{ width: "100%" }}
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
                  value={myTime}
                  onChange={handleOnChangeTime}
                  style={{ width: "100%" }}
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
                  value={description}
                  onChange={handleOnChangeDescription}
                  style={{ width: "100%" }}
                ></input>
              </label>
              <br></br>
              <br></br>
              <label htmlFor="reminder" style={{ marginRight: "40%" }}>
                {" "}
                Set Reminder
              </label>
              <input type="checkbox" onChange={handleReminderChange} />
              <br></br>
              <button type="submit" className={styles.mySubmitButton}>
                Save Task
              </button>
              <br></br>
            </form>
          </div>
        )}
        <ListOfTasks
          tasks={tasks}
          deleteTask={deleteTask}
          isReminderSet={isReminderSet}
        ></ListOfTasks>
      </div>
    </main>
  );
}

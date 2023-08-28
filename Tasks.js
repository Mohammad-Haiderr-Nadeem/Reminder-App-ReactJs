import React, { useEffect, useState } from "react";
import styles from "./Tasks.module.css";
import ListOfTasks from "./ListOfTasks";
import axios from "axios";
import moment from "moment";
import { Link } from "react-router-dom";
import Form from "./Form";

export default function Tasks({ tasks, setTasks }) {
  const [task, setTask] = useState("");
  const [myDate, setMyDate] = useState("");
  const [myTime, setMyTime] = useState("");
  const [description, setDescription] = useState("");
  const [taskOpen, setTaskOpen] = useState(true);
  const [isReminderSet, setIsReminderSet] = useState(false);

  const handleSubmit = (e) => {
    addTask();
    e.preventDefault();
  };

  useEffect(() => {
    getTaskList();
  }, []);

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
          dateAndTime: `${myDate} ${myTime}`,
          desc: description,
          checked: isReminderSet,
        });
        setTasks([...tasks, response.data]);
        setTask("");
        setMyDate("");
        setDescription("");
        setMyTime("");
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
    setTaskOpen(!taskOpen);
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
          {taskOpen ? (
            <button
              onClick={handleToggle}
              style={{
                backgroundColor: "red",
                color: "white",
                padding: "5px",
                width: "90px",
                marginLeft: "5%",
              }}
            >
              Open
            </button>
          ) : (
            <button
              onClick={handleToggle}
              style={{
                backgroundColor: "green",
                color: "white",
                padding: "5px",
                width: "90px",
                marginLeft: "5%",
              }}
            >
              Close
            </button>
          )}
        </span>

        {taskOpen && (
          <div>
            <br></br>
            <br></br>
            <form onSubmit={handleSubmit}>
              <Form
                task={task}
                handleOnChangeTask={handleOnChangeTask}
                myDate={myDate}
                handleOnChangeDate={handleOnChangeDate}
                myTime={myTime}
                handleOnChangeTime={handleOnChangeTime}
                description={description}
                handleOnChangeDescription={handleOnChangeDescription}
              ></Form>
              <br></br>
              <br></br>
              <label htmlFor="reminder" style={{ marginRight: "40%" }}>
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
          getTaskList={getTaskList}
        ></ListOfTasks>
        <Link to="/tasks/about">
          <p style={{ textAlign: "center", color: "blue", fontWeight: "bold" }}>
            About
          </p>
        </Link>
      </div>
    </main>
  );
}

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AllListOfTasks.module.css";
import axios from "axios";

export default function AllListOfTasks({ tasks, setTasks }) {
  const [canEdit, setCanEdit] = useState(false);
  const [editedText, setEditedText] = useState("");
  const [editedDate, setEditedDate] = useState("");
  const [editedTime, setEditedTime] = useState("");
  const [editedIndex, setEditedIndex] = useState(-1);
  const [editedDateAndTime, setEditedDateAndTime] = useState("");
  const [editedDescription, setEditedDescription] = useState(tasks.desc);

  const navigate = useNavigate();

  useEffect(() => {
    if (editedDate && editedTime) {
      setEditedDateAndTime(`${editedDate} ${editedTime}`);
    }
    fetchTask();
  }, []);

  const fetchTask = async () => {
    try {
      const response = await axios.get("http://localhost:4000/myTasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching task:", error);
    }
  };

  const handleBack = () => {
    navigate("/tasks");
  };

  const handleEdit = (index) => {
    setCanEdit(!canEdit);
    setEditedIndex(index);
    setEditedText(tasks[index].text);

    if (tasks[index].date) {
      const [date, time] = tasks[index].dateAndTime.split(" ");
      setEditedDate(date);
      setEditedTime(time);
    }

    setEditedDescription(tasks[index].desc);
  };

  const handleSubmit = async (e, id, index) => {
    e.preventDefault();

    const taskToUpdate = tasks[index];
    if (editedText && editedDate && editedTime && editedDescription) {
      try {
        const updatedTask = {
          ...taskToUpdate,
          text: editedText,
          date: editedDate,
          time: editedTime,
          desc: editedDescription,
          dateAndTime: `${editedDate} ${editedTime}`,
        };

        await axios.put(`http://localhost:4000/myTasks/${id}`, updatedTask);

        const updatedTasks = [...tasks];
        updatedTasks[index] = updatedTask;
        setTasks(updatedTasks);

        setEditedIndex(-1);
        setEditedText("");
        setEditedDate("");
        setEditedTime("");
        setEditedDescription("");
      } catch (error) {
        console.error("Error updating task:", error);
      }
    }
  };

  return (
    <main>
      <div>
        {tasks.length ? (
          <div>
            <ol type="none">
              {tasks.map((task, index) => (
                <li key={index}>
                  <div>
                    <div className={styles.container}>
                      <button
                        className={styles.myBackButton}
                        onClick={handleBack}
                      >
                        Back
                      </button>
                      <h1>{task.text}</h1>
                      <p>{task.desc}</p>
                      <p>{task.dateAndTime}</p>
                      <button
                        className={styles.myEditButton}
                        onClick={() => handleEdit(index)}
                      >
                        Edit
                      </button>
                      <br></br>
                      <br></br>
                      {editedIndex === index && canEdit && (
                        <form onSubmit={(e) => handleSubmit(e, task.id, index)}>
                          <label htmlFor="Task">
                            <b>Task</b>
                            <br></br>
                            <input
                              type="text"
                              name="task"
                              placeholder="write your task here..."
                              value={editedText}
                              onChange={(e) => setEditedText(e.target.value)}
                            ></input>
                          </label>
                          <br></br>
                          <label htmlFor="Date">
                            <b>Day</b>
                            <br></br>
                            <input
                              type="date"
                              name="myDate"
                              placeholder="Please select your date.."
                              value={editedDate}
                              onChange={(e) => setEditedDate(e.target.value)}
                            ></input>
                          </label>
                          <br></br>
                          <label htmlFor="Time">
                            <b>Time</b>
                            <br></br>
                            <input
                              type="time"
                              name="myDate"
                              placeholder="Please select your time.."
                              value={editedTime}
                              onChange={(e) => setEditedTime(e.target.value)}
                            ></input>
                          </label>
                          <br></br>
                          <label htmlFor="description">
                            <b>Description</b>
                            <br></br>
                            <input
                              type="text"
                              name="task"
                              placeholder="write your description here..."
                              value={editedDescription}
                              onChange={(e) =>
                                setEditedDescription(e.target.value)
                              }
                            ></input>
                          </label>
                          <br></br>
                          <button
                            type="submit"
                            className={styles.myUpdateButton}
                          >
                            Update
                          </button>
                          <br></br>
                          <br></br>
                        </form>
                      )}
                    </div>
                  </div>
                  <br />
                </li>
              ))}
            </ol>
          </div>
        ) : (
          <p>No tasks available.</p>
        )}
      </div>
    </main>
  );
}

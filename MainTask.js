import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import styles from "./MainTask.module.css";
import Form from "./Form";

export default function MainTask({ tasks }) {
  const { id } = useParams();
  const [task, setTask] = useState([]);
  const [canEdit, setCanEdit] = useState(false);
  const [editedText, setEditedText] = useState("");
  const [editedDate, setEditedDate] = useState("");
  const [editedTime, setEditedTime] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchTask(id);
  }, [id]);

  const fetchTask = async (taskId) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/myTasks/${taskId}`
      );
      setTask(response.data);
    } catch (error) {
      console.error("Error fetching task:", error);
    }
  };

  if (!task) {
    return <div>Task not found</div>;
  }

  const handleBack = () => {
    navigate("/tasks");
  };

  const handleOnChangeTask = (e) => {
    setEditedText(e.target.value);
  };

  const handleOnChangeDate = (e) => {
    setEditedDate(e.target.value);
  };

  const handleOnChangeDescription = (e) => {
    setEditedDescription(e.target.value);
  };

  const handleOnChangeTime = (e) => {
    setEditedTime(e.target.value);
  };

  // const handleEdit = () => {
  //   setCanEdit(!canEdit);
  //   setEditedText(task.text);
  //   setEditedDate(task.date);
  //   setEditedTime(task.time);
  //   setEditedDescription(task.desc);
  // };

  const handleEdit = () => {
    setCanEdit(!canEdit);
    if (!editedText) {
      setEditedText(task.text);
    }
    if (!editedDate) {
      setEditedDate(task.date);
    }
    if (!editedTime) {
      setEditedTime(task.time);
    }
    if (!editedDescription) {
      setEditedDescription(task.desc);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editedText && editedDate && editedTime && editedDescription) {
      try {
        const updatedTasks = {
          text: editedText,
          date: editedDate,
          time: editedTime,
          desc: editedDescription,
          checked: task.checked,
        };

        await axios.put(`http://localhost:4000/myTasks/${id}`, updatedTasks);
        setEditedText("");
        setEditedDate("");
        setEditedTime("");
        setEditedDescription("");
        setCanEdit(false);
        fetchTask(id);
      } catch (error) {
        console.error("Error updating task:", error);
      }
    }
  };

  return (
    <main>
      <div className={styles.outerContainer}>
        <div className={styles.container}>
          <button className={styles.myBackButton} onClick={handleBack}>
            Back
          </button>
          <h1 style={{ paddingLeft: "30px" }}>{task.text}</h1>
          <p style={{ paddingLeft: "30px" }}>{task.desc}</p>
          <p style={{ paddingLeft: "30px" }}>
            {task.date} {task.time}
          </p>
          <button className={styles.myEditButton} onClick={handleEdit}>
            Edit
          </button>
          <br></br>
          <br></br>
          {canEdit && (
            <form onSubmit={(e) => handleSubmit(e)}>
              <Form
                task={editedText}
                handleOnChangeTask={handleOnChangeTask}
                myDate={editedDate}
                handleOnChangeDate={handleOnChangeDate}
                myTime={editedTime}
                handleOnChangeTime={handleOnChangeTime}
                description={editedDescription}
                handleOnChangeDescription={handleOnChangeDescription}
              ></Form>
              <br></br>
              <button type="submit" className={styles.myUpdateButton}>
                Update
              </button>
              <br></br>
              <br></br>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}

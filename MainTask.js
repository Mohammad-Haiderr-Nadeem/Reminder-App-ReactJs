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
  const [editedDateAndTime, setEditedDateAndTime] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (editedDate && editedTime) {
      setEditedDateAndTime(`${editedDate} ${editedTime}`);
    }
    fetchTask(id);
  }, [id, editedDate, editedTime]);

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

  const handleEdit = () => {
    setCanEdit(!canEdit);
    setEditedText(task.text);

    if (task.date) {
      const [date, time] = task.dateAndTime.split(" ");
      setEditedDate(date);
      setEditedTime(time);
    }
    setEditedDescription(task.desc);
  };

  const handleSubmit = async (e) => {
    if (editedText && editedDate) {
      try {
        await axios.put(`http://localhost:4000/myTasks/${id}`, {
          text: editedText,
          date: editedDate,
          time: editedTime,
          dateAndTime: `${editedDate} ${editedTime}`,
          desc: editedDescription,
          checked: task.checked,
        });
      } catch (error) {
        console.error("Error updating task:", error);
      }
    }
    e.preventDefault();
    setCanEdit(false);
  };

  return (
    <main>
      <div className={styles.outerContainer}>
        <div className={styles.container}>
          <button className={styles.myBackButton} onClick={handleBack}>
            Back
          </button>
          <h1>{task.text}</h1>
          <p>{task.desc}</p>
          <p>{task.dateAndTime}</p>
          <button className={styles.myEditButton} onClick={handleEdit}>
            Edit
          </button>
          <br></br>
          <br></br>
          {canEdit && (
            <form onSubmit={handleSubmit}>
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

import React from "react";
import styles from "./ListOfTasks.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ListOfTasks(props) {
  const navigate = useNavigate();

  const handleToggleShowAllTasks = () => {
    navigate("/tasks/all");
  };

  const handleDoubleClick = async (id, sameText, sameDate) => {
    try {
      await axios.put(`http://localhost:4000/myTasks/${id}`, {
        checked: false,
      });
    } catch (error) {
      console.error("Error updating checked state:", error);
    }
  };

  const handleOnClickHeading = (e, id) => {
    navigate(`/tasks/${id}`);
  };

  const handleOnClickParagraph = (e, id) => {
    navigate(`/tasks/${id}`);
  };

  return (
    <main>
      <div>
        {props.tasks.length ? (
          <div>
            <ol style={{listStyleType:'none'}}>
              {props.tasks.slice(0, 2).map((task, index) => (
                <li key={index}>
                  <div
                    className={`${styles.container} ${
                      task.checked ? styles["reminder-set"] : ""
                    }`}
                    onDoubleClick={(e) =>
                      handleDoubleClick(task.id, task.text, task.date)
                    }
                  >
                    <div className={styles["reminder-corner"]} />
                    <button
                      style={{
                        color: "red",
                        backgroundColor: "beige",
                        border: "none",
                        marginLeft: "100%",
                      }}
                      onClick={() => props.deleteTask(task.id)}
                    >
                      X
                    </button>

                    <h1
                      style={{
                        fontWeight: "bold",
                        color: "black",
                      }}
                      onClick={(e) => handleOnClickHeading(e, task.id)}
                    >
                      {task.text}
                    </h1>

                    <p
                      style={{
                        fontWeight: "bold",
                        color: "black",
                      }}
                      onClick={(e) => handleOnClickParagraph(e, task.id)}
                    >
                      {task.dateAndTime}
                    </p>
                  </div>
                  <br />
                </li>
              ))}
              <button
                className={styles.myToggleButton}
                onClick={handleToggleShowAllTasks}
              >
                View More
              </button>
            </ol>
          </div>
        ) : (
          <p>No tasks available.</p>
        )}
      </div>
    </main>
  );
}

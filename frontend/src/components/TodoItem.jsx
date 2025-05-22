import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons";

const TodoItem = ({ todo, onStatusChange, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(todo.task);

  const handleEdit = () => {
    if (isEditing && editedTask.trim() !== "") {
      onUpdate(todo.id, editedTask);
    }
    setIsEditing(!isEditing);
  };

  const isCompleted = todo.status === "completed";

  return (
    <li className={`todo-item ${isCompleted ? "completed" : ""}`}>
      <div className="left-section">
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={() =>
            onStatusChange(todo.id, isCompleted ? "pending" : "completed")
          }
        />
        {isEditing ? (
          <input
            type="text"
            value={editedTask}
            onChange={(e) => setEditedTask(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleEdit();
            }}
            className="edit-input"
          />
        ) : (
          <span className={`task-text ${isCompleted ? "strikethrough" : ""}`}>
            {todo.task}
          </span>
        )}
      </div>
      <div className="action-buttons">
        <button onClick={handleEdit} title="Edit">
          <FontAwesomeIcon icon={faPenToSquare} />
        </button>
        <button onClick={() => onDelete(todo.id)} title="Delete">
          <FontAwesomeIcon icon={faTrashCan} />
        </button>
      </div>
    </li>
  );
};

export default TodoItem;

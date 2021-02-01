import React from "react";
import "../index.css";

const List = ({ items, removeItem, editItem }) => {
  return (
    <>
      {items.map((item) => {
        const { id, title } = item;

        return (
          <div key={id} id={id} className="todo">
            <li className="todo-item">{title}</li>
            <button className="edit-btn" onClick={() => editItem(id)}>
              <i className="fas fa-edit"></i>
            </button>
            <button
              className="trash-btn"
              onClick={() => {
                const todo = document.getElementById(`${id}`);
                todo.classList.add("fall");
                todo.addEventListener("transitionend", () => {
                  removeItem(id);
                });
              }}
            >
              <i className="fas fa-trash"></i>
            </button>
          </div>
        );
      })}
    </>
  );
};

export default List;

import { useState, useEffect, useRef } from "react";
import Alert from "./components/Alert";
import List from "./components/List";

const getData = () => {
  let list = localStorage.getItem("list");

  if (list) {
    return JSON.parse(list);
  }

  return [];
};

function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState(getData());
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  
  const todoRefContainer = useRef(null);


  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name) {
      showAlert(true, "Please enter a value", "danger");
    } else if (name && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editId) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName("");
      setIsEditing(false);
      setEditId(null);
      showAlert(true, "Item edited!", "success");
    } else {
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      setName("");
      showAlert(true, "Item added", "success");
    }
  };

  const showAlert = (show = false, msg = "", type = "") => {
    setAlert({ show, msg, type });
  };

  const removeItem = (id) => {
    const newList = list.filter((item) => item.id !== id);
    setList(newList);
    showAlert(true, "Item removed", "success");
  };

  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditId(specificItem.id);
    setName(specificItem.title);
  };

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  return (
    <section>
      <header>
        <h1>ToDo List</h1>
      </header>
      <form onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
        <input
          type="text"
          className="todo-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit" className="todo-btn">
          <i className="fas fa-plus-square"></i>
        </button>
      </form>

      {list.length > 0 && (
        <div className="todo-container">
          <ul className="todo-list" ref={todoRefContainer}>
            <List items={list} removeItem={removeItem} editItem={editItem} />
            <button
              className="clearAll-btn"
              onClick={() => {
              todoRefContainer.current.classList.add("fall");
               todoRefContainer.current.addEventListener("transitionend", () => {
                  setList([]);
                  showAlert(true, "Cleared all!", "success");
                });
              }}
            >
              Clear All
            </button>
          </ul>
        </div>
      )}
    </section>
  );
}

export default App;

import { useState } from "react";

export default function App() {
  const [item, setItem] = useState("");
  const [items, setItems] = useState([]);

  function addItem() {
    setItems((items) => [
      ...items,
      { id: Date.now(), checked: false, text: item },
    ]);
    setItem("");
  }

  function handleDelete(id) {
    setItems(items.filter((items) => items.id !== id));
  }

  function handleChecked(id, isChecked) {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, checked: isChecked } : item
      )
    );
  }

  return (
    <div>
      <InputField
        item={item}
        onItem={setItem}
        handleAddItem={addItem}
        items={items}
      />
      <ListItems
        items={items}
        handleDelete={handleDelete}
        onHandleChecked={handleChecked}
      />
    </div>
  );
}

function InputField({ item, onItem, handleAddItem, items }) {
  return (
    <div className="container">
      <h1>Quick List</h1>
      <div>
        <input
          type="text"
          value={item}
          placeholder="Add your list items"
          onChange={(e) => onItem(e.target.value)}
        ></input>
        <button onClick={handleAddItem}>Add</button>
      </div>
      {items.length === 0 ? <p className="color">Your list is empty!</p> : ""}
    </div>
  );
}

function ListItems({ items, handleDelete, onHandleChecked }) {
  return (
    <div className="listItems">
      {items.map((item) => (
        <Item
          item={item}
          key={item.id}
          handleDelete={handleDelete}
          onHandleChecked={onHandleChecked}
        />
      ))}
    </div>
  );
}

function Item({ item, handleDelete, onHandleChecked }) {
  return (
    <li className="items">
      <input
        type="checkbox"
        onChange={(e) => onHandleChecked(item.id, e.target.checked)}
      ></input>
      <span className={item.checked ? "active" : ""}>{item.text}</span>
      <button onClick={() => handleDelete(item.id)}>Delete</button>
    </li>
  );
}

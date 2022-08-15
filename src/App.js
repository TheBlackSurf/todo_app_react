import './App.css';
import {useEffect, useState} from "react";
import {Button, Input, InputLabel} from "@mui/material";
import {FormControl} from "@mui/material";
import Todo from "./components/Todo";
import db from "./firebase";
import firebase from 'firebase';


function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');


  useEffect(()  => {
    // connection to DB
    db.collection('todos').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setTodos(snapshot.docs.map(doc => ({id: doc.id, todo:doc.data().todo})))
    })
  }, []);


  const addTodo = (event) => {
    // run when click button
    event.preventDefault(); // stop refresh page

    db.collection('todos').add({
      todo:input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })


    setTodos([...todos, input])
    setInput(''); // clear input after submit click

  }

  return (<div className="App">
      <h3>Task List ReactJS ✏ !</h3>
      <form action="">
        <FormControl>
          <InputLabel>✅ Write a Task...</InputLabel>
          <Input value={input} onChange={event => setInput(event.target.value)}/>
        </FormControl>
        <Button disabled={!input} type="submit" onClick={addTodo} variant="contained" color="primary">
          Add Task 🚀
        </Button>
      </form>

      <ul>
        {todos.map(todo => (
          <Todo todo={todo}/>
        ))}
      </ul>

    </div>
  );
}

export default App;

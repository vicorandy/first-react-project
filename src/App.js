import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import About from "./components/About";
import Footer from "./components/Footer";

function App() {
  const [showAddTask, setShowAddtask] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function getTasks() {
      const tasks = await fetchTasks();
      setTasks(tasks);
    }
    getTasks();
  }, []);

  //fetch tasks
  async function fetchTasks() {
    const res = await fetch("http://localhost:5000/tasks");
    const data = await res.json();
    return data;
  }
  async function fetchTask(id) {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);

    const data = await res.json();
    return data;
  }
  // toggle task form
  const toggleForm = () => {
    setShowAddtask(!showAddTask);
  };
  //add task
  async function addTask(task) {
    const res = await fetch(`http://localhost:5000/tasks`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(task),
    });

    const newTask = await res.json();

    setTasks([...tasks, newTask]);
  }

  // delete task
  async function deleteTask(id) {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "DELETE",
    });

    setTasks(tasks.filter((task) => task.id !== id));
  }

  // toggle reminder
  async function toggleReminder(id) {
    const taskToToggle = await fetchTask(id);
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder };
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updTask),
    });
    const data = await res.json();
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          task.reminder = data.reminder;
          return task;
        } else return task;
      })
    );
  }
  return (
    <Router>
      <div className="container">
        <Header onToggle={toggleForm} showAdd={showAddTask} />
        <Routes>
          <Route
            path="/"
            exact
            element={
              <>
                {showAddTask ? <AddTask onAdd={addTask} /> : ""}
                {tasks.length > 0 ? (
                  <Tasks
                    tasks={tasks}
                    onDelete={deleteTask}
                    onToggle={toggleReminder}
                  ></Tasks>
                ) : (
                  <p>You don have any tasks</p>
                )}
              </>
            }
          />
          <Route path="/about" element={<About></About>} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

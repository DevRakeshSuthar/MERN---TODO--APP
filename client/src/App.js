import React from "react";
import AddTodo from "./components/addtodo.js";
import TodoList from "./components/todolist.js";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import "./App.css";

class App extends React.Component {
  state = {
    Todos: [],
    getAllTodos: [],
    updatetodo: "",
    isEdit: false,
  };

  componentDidMount() {
    axios
      .get("http://localhost:8000/todos")
      .then(
        (response) => {
          console.log(response.data);
          this.setState({ getAllTodos: response.data });
        },
        () => {
          console.log("state : ", this.state);
        }
      )
      .catch((error) => {
        console.log(error);
      });
  }

  handleSubmit = (todo) => {
    console.log("TODO", todo);
    axios.post("http://localhost:8000/todos/add", todo).then((res) => {
      this.setState({
        Todos: [...this.state.Todos, res.data],
      });
      window.location = "/";
    });
  };

  deleteTodo = (id) => {
    console.log("TODO_ID", id);
    axios.delete("http://localhost:8000/todos/" + id).then((res) => {
      this.setState({
        Todos: this.state.Todos.filter((el) => el._id !== id),
      });
    });
    window.location = "/";
  };

  editTodoFromList = (id) => {
    console.log(id);
    axios.get(`http://localhost:8000/todos/${id}`).then((res) => {
      this.setState({
        updatetodo: res.data,
        isEdit: true,
      });
    });
  };

  render() {
    return (
      <div className="App">
        <AddTodo
          isEdit={this.state.isEdit}
          updatetodo={this.state.updatetodo}
          onSubmit={(todo) => this.handleSubmit(todo)}
        />
        <TodoList
          deleteTodo={(id) => this.deleteTodo(id)}
          getAllTodos={this.state.getAllTodos}
          editTodo={(id) => this.editTodoFromList(id)}
        />
      </div>
    );
  }
}

export default App;

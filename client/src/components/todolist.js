import React, { Component } from "react";

export default class TodoList extends Component {
  render() {
    return (
      <div>
        <h2 className="asd mt-5">TODO LIST</h2>
        <div className="postCard">
          <div className="container1">
            <ul className="container1">
              {this.props.getAllTodos.map((todo) => {
                return (
                  <li key={todo._id} className="neuCard">
                    <h2>{todo.todo_title}</h2>
                    <p>{todo.todo_description}</p>
                    <p>{todo.todo_date.split("T")[0]}</p>
                    <div className="qwe">
                      <div className="saa">
                        <div className="mlm btneo mt-3">
                          <i
                            onClick={() => {
                              this.props.editTodo(todo._id);
                            }}
                            class="fas fa-edit text-success"
                          ></i>
                        </div>
                      </div>
                      <div className="mm btneo mt-3 nav-item">
                        <i
                          className="del"
                          onClick={() => {
                            this.props.deleteTodo(todo._id);
                          }}
                          class="far fa-trash-alt text-danger"
                        />
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default class AddTodo extends Component {
  state = {
    todo_title: "",
    todo_description: "",
    todo_date: new Date(),
    id: "",
  };

  componentDidMount = () => {
    console.log("input CDM", this.props);
  };

  componentDidUpdate = (prevProps) => {
    if (prevProps.updatetodo !== this.props.updatetodo) {
      this.setState({
        todo_title: this.props.updatetodo.todo_title,
        todo_description: this.props.updatetodo.todo_description,
        id: this.props.updatetodo._id,
      });
    }
  };

  handleSubmit(e) {
    e.preventDefault();
    this.props.onSubmit({
      todo_title: this.state.todo_title,
      todo_description: this.state.todo_description,
      todo_date: this.state.todo_date,
      id: this.state.id,
    });
    this.setState({
      todo_title: "",
      todo_description: "",
    });
  }

  render() {
    return (
      <div className="container">
        <h2 className="asd">MERN TODO APP</h2>
        <form className="formneo mt-3" onSubmit={this.handleSubmit}>
          <input
            className="input"
            onChange={(e) => this.setState({ todo_title: e.target.value })}
            value={this.state.todo_title}
            type="text"
            placeholder="TODO - TITLE"
          ></input>
          <input
            className="input"
            onChange={(e) =>
              this.setState({ todo_description: e.target.value })
            }
            value={this.state.todo_description}
            type="text"
            placeholder="DESCRIPTION"
          ></input>
          <DatePicker
            className="input"
            selected={this.state.todo_date}
            value={this.state.todo_date}
          />
          <br />
          {!this.props.isEdit && (
            <button
              className="addbtn  mt-4"
              onClick={(e) => {
                this.handleSubmit(e);
              }}
            >
              ADD TODO
            </button>
          )}
          {this.props.isEdit && (
            <button
              className="addbtn  mt-4"
              onClick={(e) => {
                this.handleSubmit(e);
              }}
            >
              EDIT TODO
            </button>
          )}
        </form>
      </div>
    );
  }
}

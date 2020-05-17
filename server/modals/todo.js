const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todoSchema = new Schema(
  {
    todo_title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 1,
    },
    todo_description: {
      type: String,
      required: false,
    },
    todo_date: {
      type: Date,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;

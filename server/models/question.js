const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const optionSchema = new Schema(
    {
      text: {
        type: String,
        required: true,
      },
      introvert: {
        type: Number,
        required: true,
      },
      extrovert: {
        type: Number,
        required: true,
      },
    },
    {}
  );


const questionchema = new Schema(
  {
    test: {
      type: Number,
      required: true,
    },
    order: {
        type: Number,
        required: true,
    },
    query: {
      type: String,
      required: true,
    },
    options: [optionSchema],
  },
  {
    timestamps: true,
  }
);

var Question = mongoose.model("Question", questionchema);
module.exports = { Question, questionchema };

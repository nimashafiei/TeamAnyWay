const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const answerSchema = new Schema(
    {
      ip: {
        type: String,
        required: true,
      },
      answersheet:{
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
    {
      timestamps: true,
    }
  );


var Answer= mongoose.model("Answer", answerSchema);
module.exports = { Answer, answerSchema };
  
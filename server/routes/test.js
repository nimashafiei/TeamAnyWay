var express = require("express");
var router = express.Router();
var Answer = require("../models/answer").Answer;
var Question = require("../models/question").Question;
const { check, validationResult } = require("express-validator");

router.get("/questions/:id", async (req, res, next) => {
  Question.find({ test: parseInt(req.params.id) })
    .sort("order")
    .then(function (data) {
      res.send({ questions: data });
    })
    .catch(next);
});

router.post("/", async (req, res, next) => {
  await check("answers").isArray().withMessage("error").run(req);

  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(422).json({ errors: result.array() });
  }

  var ip =
    req.headers["x-forwarded-for"] || req.connection.remoteAddress || "nothing";

  let introvert=0,extrovert =0;

  req.body.answers.forEach((qn)=>{
    console.log(qn.options[parseInt(qn.answer)-1].introvert);
    introvert += qn.options[parseInt(qn.answer)-1].introvert;
    extrovert += qn.options[parseInt(qn.answer)-1].extrovert;
  })

  introvert = introvert / req.body.answers.length;
  extrovert = extrovert / req.body.answers.length;

  const answer = new Answer({
    ip: ip,
    answersheet: JSON.stringify(req.body.answers),
    introvert: introvert,
    extrovert: extrovert,
  });

  await answer.save();

  return res.json({
    introvert: answer.introvert,
    extrovert: answer.extrovert,
  });
});

module.exports = router;

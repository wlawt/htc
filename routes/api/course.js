const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load model
const Course = require("../../models/Course");

/*  @route      POST api/course
    @desc       Add a new course
    @access     Private
*/
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Course.findOne({ course: req.body.course }).then(course => {
      if (!course) {
        return res.status(400);
      }

      const newCourse = new Course({
        course: req.body.course
      });

      newCourse.save().then(course => res.json(course));
    });
  }
);

module.exports = router;

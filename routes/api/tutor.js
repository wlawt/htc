const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const Tutor = require("../../models/Tutor");

// Validation
const validateTutorInputs = require("../../validator/tutor");

var ObjectID = require("mongodb").ObjectID;

/*  @route      POST api/tutor/register
    @desc       Register tutor
    @access     Private
*/
router.post(
  "/register",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateTutorInputs(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    Tutor.findOne({ tutor: req.body.name }).then(tutor => {
      const newTutor = new Tutor({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        grade: req.body.grade,
        year: req.body.year,
        available: req.body.available
      });

      newTutor.save().then(tutor => {
        res.json(tutor);
      });
    });
  }
);

/*  @route      POST api/tutor/subject
    @desc       Add subjects to tutor
    @access     Private
*/
router.post(
  "/subject/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Tutor.findOne({ _id: new ObjectID(req.body.id) }).then(tutor => {
      const newSubject = {
        topic: req.body.subject,
        grade: req.body.grade
      };

      // Add to array
      tutor.subjects.push(newSubject);
      tutor.save().then(tutor => res.json(tutor));
    });
  }
);

/*  @route      GET api/tutor
    @desc       Retrieve all tutors
    @access     Public
*/
router.get("/", (req, res) => {
  Tutor.find()
    .sort({ lastName: 1 })
    .then(tutors => res.json(tutors))
    .catch(err => res.status(404));
});

/*  @route      GET api/tutor/:id
    @desc       Retrieve tutor by id
    @access     Private
*/
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Tutor.findOne(req.body.id)
      .then(tutor => res.json(tutor))
      .catch(err => res.status(404));
  }
);

/*  @route      POST api/tutor/absence/:id
    @desc       Add absence
    @access     Private
*/
router.post(
  "/absence/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // Returns true all the time if tutor exists
    Tutor.updateOne(
      { _id: new ObjectID(req.params.id) },
      {
        $inc: {
          numAbsence: 1
        }
      }
    ).then(tutor => res.json(tutor));
  }
);

/*  @route      POST api/tutor/hour/:id
    @desc       Add hours
    @access     Private
*/
router.post(
  "/hour/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Tutor.updateOne(
      { _id: new ObjectID(req.params.id) },
      {
        $inc: {
          numHours: req.body.hour
        }
      }
    ).then(tutor => res.json(tutor));
  }
);

/*  @route      POST api/tutor/delTutors
    @desc       Remove all tutors
    @access     Private
*/
router.delete(
  "/delTutors",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Tutor.deleteMany({
      year: `${new Date().getFullYear()}/${new Date().getFullYear() + 1}`
    })
      .then(() => console.log("done"))
      .catch(e => console.log(e));
  }
);

/*  @route      POST api/tutor
    @desc       Remove tutor
    @access     Private
*/
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Tutor.findOneAndRemove({ _id: new ObjectID(req.params.id) }).then(() => {
      res.json({ success: true });
    });
  }
);

module.exports = router;

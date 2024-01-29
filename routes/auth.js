const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs');

// VALIDATION
const Joi = require('@hapi/joi');

const schema = Joi.object({
  name: Joi.string().min(6).required(),
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required(),
});

// api/user/register
router.post('/register', async (req, res) => {
  // LET'S VALIDATE THE DATA BEFORE WE ADD A USER
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send('Email already exists');

  // HASH the password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword,
  });
  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

// api/user/login
router.post('/login', async (req, res) => {
  try {
    // LET'S VALIDATE THE DATA BEFORE WE LOGIN A USER
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Invalid email or password');

    // Check if password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send('Invalid email or password');

    // Create and assign a JWT token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;

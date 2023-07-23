const express = require('express');
const User = require('./user');
const { uuid } = require('uuidv4');
const { body, validationResult } = require('express-validator');

const router = express.Router();

router.get('/hello', (req, res) => {
  res.send('Hello');
});

//get all users
router.get('/', async (req, res) => {
  try {
    const Users = await User.find();

    res.json(Users);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

//get user by id
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const foundUser = await User.findOne({ id });
  res.send(foundUser);
});

//create new user
router.post(
  '/',
  [
    body('name').isLength({ min: 5 }),
    body('password', 'incorrect password').isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      User.create({
        id: uuid(),
        name: req.body.name,
        password: req.body.password,
      });
      res.json({ success: true });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

//update user
router.patch('/', async (req, res) => {
  const name = req.body.name;
  const password = req.body.password;
  const id = req.body.id;

  //const oldUser = await User.findOne({ id });
  //console.log('old user ', oldUser);

  let newUser = {};
  name && (newUser['name'] = name);
  password && (newUser['password'] = password);
  console.log('user info to update: ', newUser);

  try {
    const result = await User.findOneAndUpdate(
      { id },
      {
        name: newUser['name'],
        password: newUser['password'],
      },
      {
        new: true,
      }
    );
    res.send(result);
  } catch (error) {
    console.log(error);
    res.json({ success: false });
  }
});

//delete user
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await User.findOneAndDelete({ id });
    res.json({ message: 'Deleted User' });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
});

module.exports = router;

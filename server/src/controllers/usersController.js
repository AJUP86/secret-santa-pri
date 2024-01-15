const db = require('../config/firebaseAdmin');
const { createUser } = require('../models/user');
async function getUsers(req, res) {
  try {
    const usersCollection = db.collection('users');
    const snapshot = await usersCollection.get();
    const users = [];
    snapshot.forEach((doc) => {
      users.push({ id: doc.id, ...doc.data() });
    });
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).send('Error fetching users');
  }
}
const createNewUser = async (req, res) => {
  console.log('Request body:', req.body);
  const { uid, name, email } = req.body;

  try {
    const userId = await createUser(uid, name, email);
    res.status(201).json({ message: 'User created successfully', userId });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).send('Error creating user');
  }
};

module.exports = { getUsers, createNewUser };

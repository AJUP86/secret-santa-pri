const db = require('../config/firebaseAdmin');

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

module.exports = { getUsers };

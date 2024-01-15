const db = require('../config/firebaseAdmin');
const admin = require('firebase-admin');

const createUser = async (uid, name, email) => {
  const userData = {
    name,
    email,
    bio: '',
    wishlist: [],
    eventsParticipated: [],
    isActive: true,
    hasCompletedProfile: false,
    invitationStatus: 'pending',
    privacySettings: {
      showEmail: false,
      showWishlist: true,
    },
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  };
  const userRef = await db.collection('users').doc(uid);
  await userRef.set(userData, { merge: true });
  return userRef.id;
};
module.exports = {
  createUser,
};

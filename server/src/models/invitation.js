const db = require('../config/firebaseAdmin');
const admin = require('firebase-admin');
import { collection, addDoc } from 'firebase/firestore';

const createInvitation = async (eventId, senderId, recipientEmail, status) => {
  const invitationData = {
    eventId,
    senderId,
    recipientEmail,
    status,
    timestamp: admin.firestore.FieldValue.serverTimestamp(),
  };
  const invitationsCollection = collection(db, 'invitations');
  const newInvitationRef = await addDoc(invitationsCollection, invitationData);
  return newInvitationRef.id;
};
module.exports = {
  createInvitation,
};

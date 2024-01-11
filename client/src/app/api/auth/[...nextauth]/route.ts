import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';
import { NextAuthOptions } from 'next-auth';
import { FirestoreAdapter } from '@auth/firebase-adapter';
import { cert } from 'firebase-admin/app';
import serviceAccount from '../../../../../../server/service-account.json';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from '../../../../../firebase';

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;

const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
  ],
  adapter: FirestoreAdapter({
    credential: cert({
      projectId: serviceAccount.project_id,
      clientEmail: serviceAccount.client_email,
      privateKey: serviceAccount.private_key!.replace(/\\n/g, '\n'),
    }),
  }),
  // events: {
  //   createUser: async (message) => {
  //     // message.user contains the user data
  //     const userData = {
  //       ...message.user, // Existing user fields
  //       bio: '',
  //       wishlist: [],
  //       eventsParticipated: [],
  //       isActive: true,
  //       hasCompletedProfile: false,
  //       invitationStatus: 'pending',
  //       privacySettings: {
  //         showEmail: false,
  //         showWishlist: true,
  //       },
  //       createdAt: serverTimestamp(),
  //       updatedAt: serverTimestamp(),
  //     };
  //     const userRef = doc(db, 'users', message.user.id);
  //     try {
  //       const userSnap = await getDoc(userRef);

  //       if (!userSnap.exists()) {
  //         await setDoc(userRef, userData);
  //       } else {
  //         await setDoc(userRef, userData, { merge: true });
  //       }
  //     } catch (error) {
  //       console.error('Error updating user in Firestore', error);
  //       throw new Error('Error updating user data');
  //     }
  //   },
  // },
  // callbacks: {
  //   async signIn({ user, account, profile }) {
  //     if (!profile?.email) {
  //       throw new Error('No profile');
  //     }
  //     const userData = {
  //       name: profile.name || user.name,
  //       email: profile.email,
  //       bio: '',
  //       wishlist: [],
  //       eventsParticipated: [],
  //       isActive: true,
  //       hasCompletedProfile: false,
  //       invitationStatus: 'pending',
  //       privacySettings: {
  //         showEmail: false,
  //         showWishlist: true,
  //       },
  //       createdAt: serverTimestamp(),
  //       updatedAt: serverTimestamp(),
  //     };

  //     const userRef = doc(db, 'users', profile.email);

  //     try {
  //       const userSnap = await getDoc(userRef);

  //       if (!userSnap.exists()) {
  //         await setDoc(userRef, userData);
  //       } else {
  //         await setDoc(userRef, userData, { merge: true });
  //       }
  //     } catch (error) {
  //       console.error('Error updating user in Firestore', error);
  //       throw new Error('Error updating user data');
  //     }

  //     return true;
  //   },
  // },
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

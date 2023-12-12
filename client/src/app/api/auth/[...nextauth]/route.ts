import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';
import { NextAuthOptions } from 'next-auth';
import { db } from '../../../../../firebase'; // Adjust the path as needed
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';

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
  callbacks: {
    async signIn({ user, account, profile }) {
      if (!profile?.email) {
        throw new Error('No profile');
      }
      const userData = {
        name: profile.name || user.name, // Fallback to `user.name` if `profile.name` isn't available
        email: profile.email,
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
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      const userRef = doc(db, 'users', profile.email);

      try {
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
          await setDoc(userRef, userData);
        } else {
          await setDoc(userRef, userData, { merge: true });
        }
      } catch (error) {
        console.error('Error updating user in Firestore', error);
        throw new Error('Error updating user data');
      }

      return true;
    },
  },
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

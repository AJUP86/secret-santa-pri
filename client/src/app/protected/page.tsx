import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function ProtectedRoute() {
  const session = await getServerSession();
  if (!session || !session.user) {
    redirect('api/auth/signin');
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">
          Welcome to <span className="text-blue-600">Secret Santa App</span>
        </h1>

        <p className="mt-3 text-2xl">Create your event and start the fun!</p>

        <div className="mt-6">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Create Event
          </button>
        </div>
      </main>
    </div>
  );
}

'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import React from 'react';
import Home from '../../page';
import useAuth from '../../../hooks/useAuth';

export default function EventSetup() {
  // State to hold the form data
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const { user } = useAuth();
  const router = useRouter();

  // Function to handle form submission
  const handleCreateEvent = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          creatorId: user.displayName,
          name: eventName,
          description: eventDescription,
          // Add any other event fields here
        }),
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      console.log(data.eventId);
      router.push(`/dashboard/events/${data.eventId}`); // Redirect to the event page, using the returned event ID
    } catch (error) {
      console.error('Failed to create event:', error);
      // Handle errors, such as displaying an error message to the user
    }
  };
  if (!user) {
    return <Home />;
  }
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-4">Setup Your Secret Santa Event</h2>
      <form onSubmit={handleCreateEvent}>
        <div className="mb-4">
          <label htmlFor="eventName" className="block text-lg font-medium mb-2">
            Event Name
          </label>
          <input
            type="text"
            id="eventName"
            name="eventName"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            className="shadow border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="eventDescription"
            className="block text-lg font-medium mb-2"
          >
            Event Description
          </label>
          <textarea
            id="eventDescription"
            name="eventDescription"
            value={eventDescription}
            onChange={(e) => setEventDescription(e.target.value)}
            className="shadow border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
            rows={4}
          ></textarea>
        </div>
        <button type="submit" className="button-primary">
          Save Event
        </button>
      </form>
    </div>
  );
}

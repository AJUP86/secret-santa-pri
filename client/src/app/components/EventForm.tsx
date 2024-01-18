'use client';

// EventForm.tsx
import React from 'react';
import { useFormContext } from 'react-hook-form';

const EventForm = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <h2 className="text-base font-semibold leading-7 ">
        Personal Information
      </h2>
      <p className="mt-1 text-sm leading-6 ">Provide your personal details.</p>
      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <label
            htmlFor="firstName"
            className="block text-sm font-medium leading-6"
          >
            Event Name
          </label>
          <div className="mt-2">
            {' '}
            <input
              {...register('name')}
              placeholder="Event Name"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'"
            />
            {errors.name?.message &&
              typeof errors.name.message === 'string' && (
                <p className="mt-2 text-sm text-red-400">
                  {errors.name.message}
                </p>
              )}
          </div>
        </div>
        <div className="sm:col-span-3">
          <label
            htmlFor="description"
            className="block text-sm font-medium leading-6"
          >
            Description
          </label>
          <div className="mt-2">
            <textarea
              {...register('description')}
              placeholder="Event Description"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
            />
            {errors.description?.message &&
              typeof errors.description.message === 'string' && (
                <p className="text-red-500">{errors.description.message}</p>
              )}
          </div>
        </div>
      </div>
    </>
  );
};

export default EventForm;

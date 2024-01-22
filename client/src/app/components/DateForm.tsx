'use client';

import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DateForm = () => {
  const {
    control,
    register,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext();

  // Time options
  const hourOptions = Array.from({ length: 24 }, (_, i) =>
    i.toString().padStart(2, '0')
  );
  const minuteOptions = Array.from({ length: 60 }, (_, i) =>
    i.toString().padStart(2, '0')
  );

  const selectedHour = watch('hour');
  const selectedMinute = watch('minute');

  return (
    <>
      <h2 className="text-base font-semibold leading-7 ">
        Event Date and Time
      </h2>
      <p className="mt-1 text-sm leading-6 ">
        Set the date and time for your event.
      </p>
      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <label htmlFor="date" className="block text-sm font-medium leading-6">
            Date
          </label>
          <Controller
            control={control}
            name="date"
            render={({ field }) => (
              <DatePicker
                placeholderText="Select date"
                onChange={(date) => field.onChange(date)}
                selected={field.value}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
              />
            )}
          />
          {errors.date && typeof errors.date.message === 'string' && (
            <p className="mt-2 text-sm text-red-400">{errors.date.message}</p>
          )}
        </div>
        <div className="sm:col-span-3 grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="hour"
              className="block text-sm font-medium leading-6"
            >
              Hour
            </label>
            <select
              {...register('hour')}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
            >
              {hourOptions.map((hour) => (
                <option key={hour} value={hour}>
                  {hour}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="minute"
              className="block text-sm font-medium leading-6"
            >
              Minute
            </label>
            <select
              {...register('minute')}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
            >
              {minuteOptions.map((minute) => (
                <option key={minute} value={minute}>
                  {minute}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </>
  );
};

export default DateForm;

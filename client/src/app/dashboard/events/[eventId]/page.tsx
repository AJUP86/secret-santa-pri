import React from 'react';

export default function page({ params }) {
  async function getData() {}
  return (
    <>
      <div>{params.eventId}</div>
    </>
  );
}

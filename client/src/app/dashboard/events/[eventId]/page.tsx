import React from 'react';
import CommentSection from '../../../components/CommentSection';

export default function page({ params }) {
  return (
    <>
      <div>{params.eventId}</div>
      <CommentSection eventId={params.eventId} />
    </>
  );
}

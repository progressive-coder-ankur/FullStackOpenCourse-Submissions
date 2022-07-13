import React from 'react';

const Notification = ({ error, close }) => {
  if (error === null) {
    return null;
  }

  return (
    <div
      className={`notification ${
        error.type === 'success' ? error.type : 'failed'
      }`}
    >
      <p>{error.msg}</p>
      <button onClick={close}>X</button>
    </div>
  );
};

export default Notification;

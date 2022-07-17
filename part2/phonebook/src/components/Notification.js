import React from 'react';

const Notification = ({ notification, close }) => {
  return (
    <div className={`notification ${notification.type}`}>
      <p>{notification.msg}</p>
      <button onClick={close}>X</button>
    </div>
  );
};

export default Notification;

import React from 'react';

const Notification = ({ notification, close }) => {
  const createMarkup = html => {
    return { __html: html };
  };
  return (
    <div className={`notification ${notification.type}`}>
      <p
        className='notification-message'
        dangerouslySetInnerHTML={createMarkup(notification.msg)}
      />
      <button onClick={close}>X</button>
    </div>
  );
};

export default Notification;

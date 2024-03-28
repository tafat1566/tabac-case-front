import React, { useState, useEffect } from 'react';

const Notification = ({ show, message, type }) => {
  const [showNotification, setShowNotification] = useState(show);

  useEffect(() => {
    setShowNotification(show);
  }, [show]);

  return (
    <>
      {showNotification && (
        <div style={{ position: 'fixed', top: '20px', right: '20px', backgroundColor: type === 'success' ? '#4caf50' : '#ff5722', color: '#ffffff', padding: '10px', borderRadius: '5px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
          {message}
        </div>
      )}
    </>
  );
};

export default Notification;

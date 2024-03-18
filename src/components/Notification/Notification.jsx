import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons'; // Importer l'icône Bell

function Notification() {
  // Fonction pour afficher une notification de succès
  const notifySuccess = () => {
    toast.success('Paiement effectué avec succès !', {
      position: toast.POSITION.TOP_RIGHT
    });
  };

  return (
    <>
      {}
      <div className="notification-icon" onClick={notifySuccess}>
        <FontAwesomeIcon icon={faBell} /> {}
      </div>
      {}
      <ToastContainer />
    </>
  );
}

export default Notification;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdatePaiementModal = () => {
  const [paiementId, setPaiementId] = useState(null);
  const [montant, setMontant] = useState('');
  const [produits, setProduits] = useState('');
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false); 

  useEffect(() => {
    const fetchLastPaiement = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/paiements');
        const lastPaiement = response.data[response.data.length - 1];
        setPaiementId(lastPaiement.id);
        setMontant(lastPaiement.montant);
        setProduits(lastPaiement.produits.join(','));
      } catch (error) {
        setError('Une erreur s\'est produite lors de la récupération du dernier paiement.');
      }
    };

    fetchLastPaiement();
  }, []);

  const handleChangeMontant = (event) => {
    setMontant(event.target.value);
  };

  const handleChangeProduits = (event) => {
    setProduits(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.put(`http://127.0.0.1:8000/paiements/${paiementId}`, {
        montant: parseFloat(montant),
        produits: produits.split(',').map(Number),
      });
      console.log(response.data);
      
      
      setShowModal(false);
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  return (
    <div>
      <button type="button" onClick={() => setShowModal(true)}>Modifier Paiement</button>

      {}
      {showModal && (
        <div className="modal fade show" id="updatePaiementModal" tabIndex="-1" role="dialog" aria-labelledby="updatePaiementModalLabel" aria-hidden="true" style={{ display: 'block' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="updatePaiementModalLabel">Modifier Paiement</h5>
                <button type="button" className="close" aria-label="Close" onClick={() => setShowModal(false)}> {}
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label htmlFor="montant">Montant:</label>
                    <input type="number" className="form-control" id="montant" value={montant} onChange={handleChangeMontant} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="produits">Produits (séparés par des virgules):</label>
                    <input type="text" className="form-control" id="produits" value={produits} onChange={handleChangeProduits} />
                  </div>
                </form>
                {error && <div className="alert alert-danger" role="alert">{error}</div>}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Fermer</button> {}
                <button type="button" className="btn btn-primary" onClick={handleSubmit}>Enregistrer</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdatePaiementModal;

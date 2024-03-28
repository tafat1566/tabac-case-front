import React, { useState } from 'react';
import axios from 'axios';
import styles from '../../styles/RegisterForm.module.css'; // Importer le module CSS

function RegisterForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/register', {
        firstName,
        lastName,
        email,
        password,
      });
      // Vérifiez la réponse de l'API et affichez un message de succès ou d'erreur
      if (response.data.success) {
        console.log('Inscription réussie');
        // Redirection vers la page de connexion ou autre action
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error);
      setError("Erreur lors de l'inscription");
    }
  };

  return (
    <form onSubmit={handleRegister} className={styles.registerForm}>
      <img src="/logg.png" alt="Logo" className={styles.logo} />
      <h2>Créer un compte</h2>
      <label htmlFor="firstName" className={styles.label}>firstName</label>
      <input
        type="text"
        id="firstName"
        placeholder="Entrez votre nom"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        required
        className={styles.input}
      />
      <label htmlFor="lastName" className={styles.label}>Prénom</label>
      <input
        type="text"
        id="lastName"
        placeholder="Entrez votre prénom"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        required
        className={styles.input}
      />
      <label htmlFor="email" className={styles.label}>Email</label>
      <input
        type="email"
        id="email"
        placeholder="Entrez votre email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className={styles.input}
      />
      <label htmlFor="password" className={styles.label}>Mot de passe</label>
      <input
        type="password"
        id="password"
        placeholder="Entrez votre mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className={styles.input}
      />
      <label htmlFor="confirmPassword" className={styles.label}>Confirmer le mot de passe</label>
      <input
        type="password"
        id="confirmPassword"
        placeholder="Confirmez votre mot de passe"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
        className={styles.input}
      />
      {error && <div className={styles.error}>{error}</div>}
      <button type="submit" className={styles.submitButton}>S'inscrire</button>
    </form>
  );
}

export default RegisterForm;

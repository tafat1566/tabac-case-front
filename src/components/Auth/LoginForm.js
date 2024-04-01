import React, { useState } from 'react';
import axios from 'axios';
import styles from '../../styles/LoginForm.module.css'; 

function LoginForm({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login', {
        email: email,
        password: password
      });
      
      if (response.data.message === 'Authentification réussie') {
        
        onLoginSuccess(true);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      } else {
        setError('Erreur d\'authentification');
      }
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      setError('Erreur lors de la connexion');
    }
  };

  return (
    <form onSubmit={handleLogin} className={styles.loginForm}>
      <img src="/logg.png" alt="Logo" className={styles.logo} />
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
      {error && <div className={styles.error}>{error}</div>}
      <button type="submit" className={styles.submitButton}>Se connecter</button>
    </form>
  );
}

export default LoginForm;

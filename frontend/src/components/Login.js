import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/login', { email, password });
      console.log('Login bem-sucedido', response.data);
    } catch (error) {
      console.error('Erro no login', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control form-control-sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Senha</label>
          <input
            type="password"
            className="form-control form-control-sm"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary btn-sm mt-3">Login</button>
      </form>
    </div>
  );
}

export default Login;

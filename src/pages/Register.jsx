// Register.jsx
import { useState } from 'react';
import { supabase } from '../supabaseClient';
import { toast } from 'react-toastify';
import './AuthForm.css';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'; // Make sure to add a logo image

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreed, setAgreed] = useState(false);

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (!agreed) {
      toast.error('You must agree to the terms');
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) toast.error(error.message);
    else toast.success('Check your email for confirmation');
  };

  return (
    <div className="auth-form">
      <img src={logo} alt="Logo" className="auth-logo" />
      <h2>Create an Account</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />
      <label className="checkbox-label">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
        />
        I agree to the Terms & Conditions
      </label>
      <button onClick={handleRegister}>Sign Up</button>
      <p className="auth-link">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export default Register;

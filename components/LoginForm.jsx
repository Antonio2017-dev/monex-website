import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

function LoginForm({ onSwitchToRegister, onLoginSuccess }) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loginError, setLoginError] = useState('');

  const onSubmit = (data) => {
    const storedUser = JSON.parse(localStorage.getItem('registeredUser'));

    if (storedUser) {
      // Normalize phone numbers for comparison (no dashes needed)
      const inputLogin = data.login.replace(/-/g, '');
      const storedPhone = storedUser.phone ? storedUser.phone.replace(/-/g, '') : '';
      const isMatch =
        inputLogin === storedUser.username ||
        inputLogin === storedUser.email ||
        inputLogin === storedPhone;
      if (isMatch && data.password === storedUser.password) {
        setLoginError('');
        onLoginSuccess(storedUser);
      } else {
        setLoginError('Invalid login credentials');
      }
    } else {
      setLoginError('Invalid login credentials');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Login</h2>

      <div>
        <label style={{ display: 'block', fontWeight: 600, marginBottom: 6, fontSize: 16 }}>Username, email, or phone number</label>
        <input type="text" {...register('login', { required: 'This field is required' })} />
        <p style={{ marginTop: '8px', marginBottom: '8px' }}>{errors.login?.message}</p>
      </div>

      <div>
        <label style={{ display: 'block', fontWeight: 600, marginBottom: 6, fontSize: 16 }}>Password</label>
        <input type="password" {...register('password', { required: 'Password is required' })} />
        <p style={{ marginTop: '8px', marginBottom: '8px' }}>{errors.password?.message}</p>
      </div>

      {loginError && <p style={{ color: 'red', marginTop: '8px', marginBottom: '32px' }}>{loginError}</p>}

      <button type="submit">Log in</button>

      <div style={{ marginTop: '24px', textAlign: 'center' }}>
        <button
          type="button"
          onClick={onSwitchToRegister}
          style={{ backgroundColor: '#fff', color: '#2F80ED', border: '1px solid #2F80ED' }}
        >
          Register
        </button>
      </div>

      
    </form>
  );
}

export default LoginForm;

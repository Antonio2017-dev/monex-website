import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// This is phone formatter
const formatPhoneNumber = (value) => {
  if (!value) return value;
  const phoneNumber = value.replace(/[^\d]/g, '');
  const phoneNumberLength = phoneNumber.length;

  if (phoneNumberLength < 4) return phoneNumber;
  if (phoneNumberLength < 7) {
    return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
  }
  return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
};

// This is validation schema
const registrationSchema = yup.object().shape({
  firstName: yup
    .string()
    .required('First name is required')
    .matches(/^[A-Za-z]+$/, 'First name must only contain letters (no spaces, numbers, or symbols)'),
  middleName: yup
    .string()
    .notRequired()
    .nullable()
    .matches(/^[A-Za-z]*$/, 'Middle name must only contain letters (no spaces, numbers, or symbols)'),
  lastName: yup
    .string()
    .required('Last name is required')
    .matches(/^[A-Za-z ]+$/, 'Last name must only contain letters and spaces (no numbers or symbols)'),
  username: yup
    .string()
    .required('Username is required')
    .min(4, 'Username must be at least 4 characters'),
  email: yup
    .string()
    .required('Email is required')
    .email('Enter a valid email address'),
  phone: yup
    .string()
    .required('Phone number is required')
    .matches(/^\d{3}-\d{3}-\d{4}$/, 'Phone number must be formatted as 123-456-7890'),
  dob: yup
    .date()
    .typeError('Date of birth is required')
    .required('Date of birth is required')
    .test('age', 'You must be at least 18 years old', function (value) {
      if (!value) return false;
      const today = new Date();
      const birthDate = new Date(value);
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age >= 18;
    }),
  gender: yup.string().required('Gender is required'),
  selfDescribe: yup.string().when('gender', {
  is: 'Prefer to self-describe',
  then: (schema) => schema
    .required('Please describe your gender')
    .matches(/^[A-Za-z ]+$/, 'Only letters and spaces are allowed'),
  otherwise: (schema) => schema.notRequired(),
}),

  password: yup
    .string()
    .required('Password is required')
    .matches(/[A-Z]/, 'Must contain one uppercase letter')
    .matches(/[0-9]/, 'Must contain one number')
    .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Must contain one symbol')
    .min(8, 'Must be at least 8 characters'),
  confirmPassword: yup
    .string()
    .required('Please confirm your password')
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
  terms: yup.boolean().oneOf([true], 'You must accept terms & privacy policy'),
});

function RegistrationForm({ onSwitchToLogin }) {
  const {
  register,
  handleSubmit,
  watch,
  setValue,
  trigger,
  formState: { errors, isValid },
} = useForm({
  resolver: yupResolver(registrationSchema),
  mode: 'onChange',
});


  const [emailConfirmationSent, setEmailConfirmationSent] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState('');
  const selectedGender = watch('gender');

  const onSubmit = (data) => {
    console.log('Registration data:', data);

    const userData = {
      firstName: capitalizeFirstLetter(data.firstName),
      middleName: capitalizeFirstLetter(data.middleName),
      lastName: capitalizeFirstLetter(data.lastName),
      username: data.username,
      email: data.email,
      phone: data.phone,
      password: data.password,
    };

    localStorage.setItem('registeredUser', JSON.stringify(userData));

    setEmailConfirmationSent(true);

    setTimeout(() => {
      setEmailConfirmationSent(false);
      onSwitchToLogin();
    }, 2000);
  };

  const handlePhoneChange = (e) => {
    const formattedPhone = formatPhoneNumber(e.target.value);
    setValue('phone', formattedPhone);
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    if (value.length < 8) {
      setPasswordStrength('Weak');
    } else if (/[A-Z]/.test(value) && /[0-9]/.test(value) && /[!@#$%^&*(),.?":{}|<>]/.test(value)) {
      setPasswordStrength('Strong');
    } else {
      setPasswordStrength('Medium');
    }
  };

  const capitalizeFirstLetter = (str) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const handleNameChange = (e, field) => {
    let value = e.target.value;
    if (field === 'firstName') {
      // Remove spaces, numbers, and symbols
      value = value.replace(/[^A-Za-z]/g, '');
    } else if (field === 'middleName' || field === 'lastName') {
      // Allow letters and spaces only
      value = value.replace(/[^A-Za-z ]/g, '');
    }
    const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
    setValue(field, capitalizedValue);
  };

  const formRef = useRef(null);
  return (
    <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>

      <h2>Register</h2>

      <div>
        <label>First Name<span style={{ color: '#E74C3C' }}> *</span></label>
        <input type="text" {...register('firstName')} onChange={(e) => handleNameChange(e, 'firstName')} placeholder="James" />
        <p style={{ color: '#C53434' }}>{errors.firstName?.message}</p>
      </div>

      <div>
        <label>Middle Name <span style={{ fontWeight: 'normal', fontSize: '12px' }}>(Optional)</span></label>
        <input type="text" {...register('middleName')} onChange={(e) => handleNameChange(e, 'middleName')} placeholder="Cameron" />
        <p style={{ color: '#C53434' }}>{errors.middleName?.message}</p>
      </div>

      <div>
        <label>Last Name<span style={{ color: '#E74C3C' }}> *</span></label>
        <input type="text" {...register('lastName')} onChange={(e) => handleNameChange(e, 'lastName')} placeholder="De La Cruz" />
        <p style={{ color: '#C53434' }}>{errors.lastName?.message}</p>
      </div>

      <div>
        <label>Username<span style={{ color: '#E74C3C' }}> *</span></label>
        <input
          type="text"
          {...register('username')}
          onChange={e => {
            let value = e.target.value.replace(/\s/g, ''); // Remove spaces
            setValue('username', value);
          }}
          placeholder="j.cruz97"
        />
        <p style={{ color: '#C53434' }}>{errors.username?.message}</p>
      </div>

      <div>
        <label>Email<span style={{ color: '#E74C3C' }}> *</span></label>
        <input
          type="email"
          {...register('email')}
          onChange={e => setValue('email', e.target.value.toLowerCase())}
          placeholder="myname@example.com"
        />
        <p style={{ color: '#C53434' }}>{errors.email?.message}</p>
      </div>


      <div>
        <label>Phone Number (+1)<span style={{ color: '#E74C3C' }}> *</span></label>
        <input type="text" {...register('phone')} onChange={handlePhoneChange} placeholder="842-476-9610" />
        <p style={{ color: '#C53434' }}>{errors.phone?.message}</p>
      </div>


      <div>
        <label>Date of Birth<span style={{ color: '#E74C3C' }}> *</span></label>
        <input type="date" {...register('dob')} />
        <p style={{ color: '#C53434' }}>{errors.dob?.message}</p>
      </div>

      <div style={{ marginBottom: '16px' }}>
        <label>Gender<span style={{ color: '#E74C3C' }}> *</span></label>
        <div style={{ display: 'flex', gap: '24px', marginBottom: '8px' }}>
          <label style={{ fontWeight: 400 }}><input type="radio" value="Male" {...register('gender')} /> Male</label>
          <label style={{ fontWeight: 400 }}><input type="radio" value="Female" {...register('gender')} /> Female</label>
          <label style={{ fontWeight: 400 }}><input type="radio" value="Non-binary" {...register('gender')} /> Non-binary</label>
        </div>
        <div style={{ display: 'flex', gap: '24px', marginBottom: '8px' }}>
          <label style={{ fontWeight: 400 }}><input type="radio" value="Prefer to self-describe" {...register('gender')} /> Prefer to self-describe</label>
          <label style={{ fontWeight: 400 }}><input type="radio" value="Prefer not to disclosure" {...register('gender')} /> Prefer not to disclosure</label>
        </div>
        <p style={{ color: '#C53434' }}>{errors.gender?.message}</p>
      </div>

      {selectedGender === 'Prefer to self-describe' && (
        <div>
          <label>
            Self-describe:<span style={{ color: '#E74C3C' }}> *</span>
          </label>
          <input
            type="text"
            {...register('selfDescribe', { required: 'Self-describe is required' })}
            onChange={e => {
              let value = e.target.value.replace(/[^A-Za-z ]/g, '');
              value = value.charAt(0).toUpperCase() + value.slice(1);
              setValue('selfDescribe', value);
            }}
          />
          <p style={{ color: '#C53434' }}>{errors.selfDescribe?.message}</p>
        </div>
      )}

      <div style={{ marginBottom: '16px' }}>
        <label>Password<span style={{ color: '#E74C3C' }}> *</span></label>
        <input type="password" {...register('password')} onChange={handlePasswordChange} />
        <p style={{ color: '#C53434', marginBottom: '4px' }}>{errors.password?.message}</p>
        <p className="password-helper" style={{ marginTop: '4px', marginBottom: '0' }}>Password must contain at least 8 characters, 1 uppercase letter, 1 number, and 1 symbol.</p>
      </div>

      <div style={{ marginBottom: '16px' }}>
        <label>Confirm Password<span style={{ color: '#E74C3C' }}> *</span></label>
        <input type="password" {...register('confirmPassword')} />
        <p style={{ color: '#C53434' }}>{errors.confirmPassword?.message}</p>
      </div>

      {emailConfirmationSent && (
        <p style={{ color: 'green' }}>
          Email confirmation has been sent to your email.
        </p>
      )}

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', marginBottom: '24px', marginTop: '24px' }}>
  <input
    type="checkbox"
    {...register('terms')}
    style={{ marginBottom: 0, marginRight: '8px' }}
    onClick={async () => {
      const result = await trigger(); // This validates all fields.
      if (!result && formRef.current) {
        const firstErrorField = Object.keys(errors)[0];
        const errorElement = formRef.current.querySelector(`[name="${firstErrorField}"]`);
        if (errorElement) {
          errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
          errorElement.focus();
        }
      }
    }}
  />
  <span style={{ fontWeight: 500 }}>
    I accept the{' '}
    <a
      href="/terms"  // original link for terms (Does not take you to a website terms. Need to work on that).
      onClick={(e) => {
        e.preventDefault();
        window.open('/terms', '_blank');
      }}
      style={{ color: '#2F80ED', textDecoration: 'underline', cursor: 'pointer' }}
    >
      Terms & Privacy Policy
    </a>
  </span>
</div>

      <button type="submit" disabled={!isValid} style={{ marginTop: '16px' }}>
        Register
      </button>

      <div style={{ marginTop: '24px', textAlign: 'center' }}>
        <button
          type="button"
          onClick={onSwitchToLogin}
          style={{ marginTop: '0', backgroundColor: '#fff', color: '#2F80ED', border: '1px solid #2F80ED' }}
        >
          Log in
        </button>
      </div>
    </form>
  );
}

export default RegistrationForm;

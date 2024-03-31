import * as yup from 'yup';

export const registerSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  password: yup.string().required('Password is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match')
});

export const loginSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  password: yup.string().required('Password is required')
});
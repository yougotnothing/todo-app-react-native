import * as yup from 'yup';

export const registerSchema = yup.object().shape({
  name: yup.string().min(3, 'Name is too short')
                    .max(20, 'Name is too long')
                    .required('Name is required'),
  password: yup.string().min(8, 'Password is to short')
                        .max(20, 'Password is to long')
                        .required('Password is required'),
  email: yup.string().email('Invalid email')
                     .required('Email is required'),
  confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match')
});

export const loginSchema = yup.object().shape({
  password: yup.string().required('Password is required'),
  name: yup.string().min(3, 'Name is to short')
                    .max(20, 'Name is too long')
                    .required('Name is required')
});

export const taskHeaderSchema = yup.string().min(1, 'Task header is required')
                                            .max(24, 'Task header is too long');

export const changePassowrdSchema = yup.object().shape({
  oldPassword: yup.string().required('Old password is required'),
  newPassword: yup.string().min(8, 'Password is to short')
                           .max(20, 'Password is to long')
                           .required('Password is required'),
  confirmNewPassword: yup.string().oneOf([yup.ref('newPassword')], 'Passwords must match')
})
/* eslint-disable no-else-return */
/* eslint-disable operator-linebreak */
import * as EmailValidator from 'email-validator';
import usePalette from './usePalette.hook';

// validations:
const validateEmailColor = (email = '') => {
  const Palette = usePalette();
  if (email.toString() === '') {
    return Palette.Primary;
  } else if (EmailValidator.validate(email) && email.toString() !== '') {
    return Palette.Primary;
  } else return Palette.Error;
};

const validateEmailIcon = (email = '') => {
  if (email.toString() === '') {
    return 'email-outline';
  } else if (EmailValidator.validate(email) && email.toString() !== '') {
    return 'email-outline';
  } else return 'email-alert-outline';
};

const validatePasswordColor = (password = '') => {
  const Palette = usePalette();
  if (password.toString() === '') {
    return Palette.Primary;
  } else if (password.toString() !== '' && password.toString().length >= 6) {
    return Palette.Primary;
  } else return Palette.Error;
};

const validatePasswordIcon = (password = '') => {
  if (password.toString() === '') {
    return 'lock-outline';
  } else if (password.toString() !== '' && password.toString().length >= 6) {
    return 'lock-outline';
  } else return 'lock-alert-outline';
};

const validateNameColor = (name = '') => {
  const Palette = usePalette();
  if (name.toString() === '') {
    return Palette.Primary;
  } else if (name.toString() !== '') {
    return Palette.Primary;
  } else return Palette.Error;
};

const validateNameIcon = (name = '') => {
  if (name.toString() === '') {
    return 'account-outline';
  } else if (name.toString() !== '') {
    return 'account-outline';
  } else return 'account-alert-outline';
};

const validateConPasswordColor = (password1 = '', password2 = '') => {
  const Palette = usePalette();
  if (password2.toString() === '') {
    return Palette.Primary;
  } else if (password2 === password1 && password2.toString().length >= 0) {
    return Palette.Primary;
  } else return Palette.Error;
};

const validateConPasswordIcon = (password1 = '', password2 = '') => {
  if (password2.toString() === '') {
    return 'lock-check-outline';
  } else if (password2 === password1 && password2.toString().length >= 0) {
    return 'lock-check-outline';
  } else return 'lock-alert-outline';
};

const validateUpdatePasswordColor = (password = '') => {
  const Palette = usePalette();
  if (password.toString() === '') {
    return Palette.Primary;
  } else if (password.toString() !== '' && password.toString().length >= 6) {
    return Palette.Primary;
  } else return Palette.Error;
};

const validateUpdatePasswordIcon = (password = '') => {
  if (password.toString() === '') {
    return 'lock-outline';
  } else if (password.toString() !== '' && password.toString().length >= 6) {
    return 'lock-outline';
  } else return 'lock-alert-outline';
};

const validateSignInFormSubmit = (email = '', password = '') => {
  if (
    EmailValidator.validate(email) &&
    email.toString() !== '' &&
    password.toString() !== '' &&
    password.toString().length > 5
  ) {
    return false;
  } else return true;
};

const validateCreateAccFormSubmit = (
  name = '',
  email = '',
  password = '',
  conPassword = '',
  TOUchecked = Boolean
) => {
  if (
    name.toString() !== '' &&
    email.toString() !== '' &&
    password.toString() !== '' &&
    password.toString().length >= 6 &&
    conPassword.toString() !== '' &&
    TOUchecked
  ) {
    return false;
  } else return true;
};

const validateForgotPasswordFormSubmit = (email = '') => {
  if (EmailValidator.validate(email) && email.toString() !== '') {
    return false;
  } else return true;
};

const validateUpdatePasswordSubmit = (password = '', newpassword = '') => {
  if (
    password.toString() !== '' &&
    password.toString().length > 5 &&
    newpassword.toString() !== '' &&
    newpassword.toString().length > 5 &&
    password.toString() !== newpassword.toString()
  ) {
    return false;
  } else return true;
};

const validateAddressFormSubmit = (ereg = '', ecit = '', edis = '') => {
  if (
    ereg.toString() !== '' &&
    ecit.toString() !== '' &&
    edis.toString() !== ''
  ) {
    return false;
  } else return true;
};

export {
  validateEmailColor,
  validateEmailIcon,
  validatePasswordColor,
  validatePasswordIcon,
  validateSignInFormSubmit,
  validateCreateAccFormSubmit,
  validateNameColor,
  validateNameIcon,
  validateConPasswordColor,
  validateConPasswordIcon,
  validateForgotPasswordFormSubmit,
  validateUpdatePasswordColor,
  validateUpdatePasswordIcon,
  validateUpdatePasswordSubmit,
  validateAddressFormSubmit,
};
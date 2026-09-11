// Shared email validation used by every login / register form.
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const isValidEmail = (email) =>
  typeof email === 'string' && EMAIL_REGEX.test(email.trim());

export const EMAIL_ERROR_MESSAGE = 'Email is not valid';

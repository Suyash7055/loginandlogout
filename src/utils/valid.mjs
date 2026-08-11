//email validator
const emailValidator = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(string(email).toLowerCase());
}
//password validator
const passwordValidator = (password) => {
  const minLength = 6;
  const maxLength = 20;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  return (
    password.length >= minLength &&
    password.length <= maxLength &&
    hasUpperCase &&
    hasLowerCase &&
    hasNumber &&
    hasSpecialChar
  );
}
// username validation
const usernameValidator = (username) => {
  const minLength = 3;
  const maxLength = 15;
  const usernameRegex = /^[a-zA-Z0-9_]+$/.test(username);
  return (
    username.length >= minLength &&
    username.length <= maxLength &&
    !hasInvalidChars
  ); // Only allows letters, numbers, and underscores
};
// phone number validation
const phoneValidator = (phone) => {
  const re = /^\d{10}$/; // Assuming a 10-digit 
  return re.test(phone);
};
export { emailValidator, passwordValidator, usernameValidator, phoneValidator };
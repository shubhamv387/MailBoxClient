export default function usePasswordCheck() {
  const passwordCheck = (password) => {
    // . means any previous char, * means zero or more occurrence of this char. And then followed by a char that belongs to [a-z].
    // /(.*[a-z].{2,}){3}/ => this regex asking for two continuous lowercase char and their occurrence should be at least 3 in the String.

    if (!/(.*[a-z])/.test(password))
      return {
        isValid: false,
        message: 'At least one lowercase character is required!',
      };

    if (!/(.*[A-Z])/.test(password))
      return {
        isValid: false,
        message: 'At least one uppercase character is required!',
      };

    if (!/(.*[0-9])/.test(password))
      return {
        isValid: false,
        message: 'At least one numeric character is required!',
      };

    if (!/(.*[^A-Za-z0-9])/.test(password))
      return {
        isValid: false,
        message: 'At least one special character is required!',
      };

    if (!/.{6,}/.test(password))
      return {
        isValid: false,
        message: 'Password must be at least 6 characters long!',
      };

    return { isValid: true, message: 'password is valid' };
  };

  return [passwordCheck];
}

export const setAuthInfo = (authInfo: any) => {
  localStorage.setItem('authInfo', JSON.stringify(authInfo));
};

export const getAuthInfo = () => {
  const storedAuthInfo = localStorage.getItem('authInfo');
  return storedAuthInfo ? JSON.parse(storedAuthInfo) : null;
};
export const getToken = () => localStorage.getItem('token');

export const isLoggedIn = () => !!getToken();

export const logout = () => {
  localStorage.removeItem('token');
  alert('Logged out successfully');
};

// Decode JWT payload and return the subject (email)
export const getUserEmail = () => {
  const token = getToken();
  if (!token) return null;
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
    return payload.sub || null;
  } catch {
    return null;
  }
};